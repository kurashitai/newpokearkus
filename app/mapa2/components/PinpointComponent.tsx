'use client';

import { useMemo, useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { PokemonLocation } from '../types';

function getTerrainType(z: number): string {
  if (z > 7) return 'Subsolo';
  if (z < 7) return 'Montanha';
  return 'Planície';
}

// Corrige nomes dos Pokémon
function getFormattedPokemonName(name: string): string {
  switch (name) {
    case 'Farfetchd':
      return "Farfetch'd";
    case 'Nidoran Male':
      return 'Nidoran♂';
    case 'Nidoran Female':
      return 'Nidoran♀';
    default:
      return name;
  }
}

// Corrige números da Pokédex
function getCorrectDexNumber(name: string, currentNumber: number): number {
  switch (name) {
    case 'Nidoran Male':
      return 32;
    case 'Nidoran Female':
      return 29;
    case 'Farfetchd':
      return 83;
    default:
      return currentNumber;
  }
}

interface PinpointComponentProps {
  data: PokemonLocation[];
  onPinClick?: (location: {x: number, y: number, z: number}) => void;
  scale?: number;
  zoomLevel?: number;
  panPosition?: {x: number, y: number};
  containerSize?: {width: number, height: number};
}

function PinpointComponent({ 
  data, 
  onPinClick, 
  scale = 1, 
  zoomLevel = 1, 
  panPosition = {x: 0, y: 0}, 
  containerSize = {width: 800, height: 600} 
}: PinpointComponentProps) {
  // Estado para armazenar o tamanho da tela - memoizado
  const [isMobile, setIsMobile] = useState(false);
  
  // Detecta o tamanho da tela com debounce
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    
    // Debounce para evitar muitas atualizações
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);
  // Reduz pins muito próximos e aplica viewport culling
  const filteredLocations = useMemo(() => {
    if (data.length === 0) return [];
    const pokemon = data[0];
    const threshold = 8; // Distância mínima entre pins
    
    // Calcula viewport bounds para culling - CORRIGIDO para funcionar com transform: scale() translate()
    // A transform é: scale(finalScale) translate(panX, panY)
    // Para calcular o viewport em coordenadas do mapa, precisamos:
    // 1. Dividir as coordenadas da tela pelo scale total
    // 2. Subtrair o pan offset (que já está em coordenadas corretas)
    const totalScale = scale * zoomLevel;
    const buffer = 500; // Buffer muito maior para garantir que pins não desapareçam
    
    // Converte coordenadas da tela para coordenadas do mapa
    const viewportBounds = {
      left: (0 / totalScale) - panPosition.x - buffer,
      top: (0 / totalScale) - panPosition.y - buffer,
      right: (containerSize.width / totalScale) - panPosition.x + buffer,
      bottom: (containerSize.height / totalScale) - panPosition.y + buffer,
    };
    
    return pokemon.locations.filter((loc1, index1) => {
      // Viewport culling - só renderiza pins visíveis (muito mais permissivo)
      if (
        loc1.x < viewportBounds.left || 
        loc1.x > viewportBounds.right ||
        loc1.y < viewportBounds.top || 
        loc1.y > viewportBounds.bottom
      ) {
        return false;
      }
      
      // Mantém o primeiro pin sempre
      if (index1 === 0) return true;
      
      // Verifica se há algum pin anterior muito próximo
      const hasNearbyPin = pokemon.locations.some((loc2, index2) => {
        if (index2 >= index1) return false;
        return Math.abs(loc1.x - loc2.x) < threshold && 
               Math.abs(loc1.y - loc2.y) < threshold &&
               Math.abs(loc1.z - loc2.z) < threshold;
      });

      return !hasNearbyPin;
    });
  }, [data, scale, zoomLevel, panPosition, containerSize]);

  // Memoiza os dados do pokémon para evitar recalculos
  const pokemon = useMemo(() => data[0], [data]);
  const dexNumber = useMemo(() => 
    pokemon ? getCorrectDexNumber(pokemon.name, pokemon.dexNumber) : 0, 
    [pokemon]
  );

  // Função para copiar localização memoizada
  const copyLocation = useCallback((loc: { x: number; y: number; z: number }) => {
    const text = `(${Math.round(loc.x)}, ${Math.round(loc.y)}, ${Math.round(loc.z)})`;
    navigator.clipboard.writeText(text);
  }, []);

  // Handler de clique memoizado
  const handlePinClick = useCallback((loc: { x: number; y: number; z: number }) => {
    if (onPinClick) {
      onPinClick(loc);
    } else {
      copyLocation(loc);
    }
  }, [onPinClick, copyLocation]);

  // Calcula transform style uma vez
  const transformStyle = useMemo(() => ({
    transform: `scale(${isMobile ? 2.5 : 1.8}) translate(-25%, -50%)`,
    transformOrigin: 'bottom center'
  }), [isMobile]);

  if (data.length === 0 || !pokemon) return null;

  return (
    <>
      {filteredLocations.map((loc, index) => (
        <div
          key={`${pokemon.name}-${index}`}
          className="absolute"
          style={{
            left: `${loc.x}px`,
            top: `${loc.y}px`,
            animation: 'bounce 0.3s infinite alternate',
            zIndex: 20
          }}
        >
          <div
            className="group"
            onClick={() => handlePinClick(loc)}
            style={transformStyle}
          >
            <div className="relative flex flex-col items-center">
              {/* Círculo superior */}
              <div className="w-6 h-6 bg-white rounded-full border-2 border-red-500 shadow-lg group-hover:scale-110 transition-transform overflow-hidden flex items-center justify-center">
                <Image 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNumber}.png`}
                  className="w-4 h-4 object-contain"
                  alt={pokemon.name}
                  width={16}
                  height={16}
                  unoptimized
                />
              </div>
              {/* Triângulo inferior */}
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-red-500 -mt-[1px]" />
            </div>
          
            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity pointer-events-none" 
              style={{ transform: `scale(${isMobile ? 0.4 : 1})` }}>
              {getFormattedPokemonName(pokemon.name)}<br/>
              ({Math.round(loc.x)}, {Math.round(loc.y)}, {Math.round(loc.z)})<br/>
              {getTerrainType(loc.z)}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// Memoize o componente para evitar re-renders desnecessários
export default memo(PinpointComponent);
