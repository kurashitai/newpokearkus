'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { pokemonLocations } from './data';
import { PokemonLocation } from './types';
import PinpointComponent from './components/PinpointComponent';
import HeatmapComponent from './components/HeatmapComponent';
import { toast, Toaster } from 'react-hot-toast';

// Dimensões originais do mapa
const MAP_WIDTH = 1680;
const MAP_HEIGHT = 3815;

// Utility function para debounce
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Utility function para throttle (para movimentos mais suaves)
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Estilos globais para animações
const globalStyles = `
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-5px);
    }
  }
`;

// Função para obter o tipo de terreno
function getTerrainType(z: number): string {
  if (z > 7) return 'Subsolo';
  if (z < 7) return 'Montanha';
  return 'Planície';
}

// Filtra coordenadas inválidas
function isValidLocation(x: number, y: number): boolean {
  return x >= 0 && x <= MAP_WIDTH && y >= 0 && y <= MAP_HEIGHT;
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

// Filtra os Pokémon e suas localizações e ordena por número da Pokédex
const validPokemonLocations = pokemonLocations
  .map(pokemon => ({
    ...pokemon,
    name: getFormattedPokemonName(pokemon.name),
    dexNumber: getCorrectDexNumber(pokemon.name, pokemon.dexNumber),
    locations: pokemon.locations.filter(loc => isValidLocation(loc.x, loc.y))
  }))
  .filter(pokemon => pokemon.locations.length > 0)
  .sort((a, b) => a.dexNumber - b.dexNumber);

export default function MapaInterativo() {
  const [viewMode, setViewMode] = useState<'pinpoint' | 'heatmap'>('pinpoint');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, panX: 0, panY: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  // Debounced search para melhor performance
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
      setIsTyping(false);
    }, 300),
    []
  );

  // Estado local para o input de busca
  const [searchInput, setSearchInput] = useState('');

  // Atualiza o termo de busca com debounce
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    setIsTyping(true);
    debouncedSearch(value);
  }, [debouncedSearch]);

  // Estado para armazenar a localização média do Pokémon selecionado
  const [averageLocation, setAverageLocation] = useState<{ x: number, y: number, z: number } | null>(null);

  // Pokémon selecionado
  const selectedPokemonData = selectedPokemon
    ? validPokemonLocations.find(p => p.name === selectedPokemon)
    : null;

  // Referência para o Pokémon selecionado anteriormente
  const selectedPokemonRef = useRef<string | null>(null);

  // Atualiza a escala quando o componente montar ou o tamanho da janela mudar
  useEffect(() => {
    function updateScale() {
      if (containerRef.current && mapRef.current) {
        // Escala para caber a largura total da imagem na div
        setScale(containerRef.current.clientWidth / MAP_WIDTH);
      }
    }

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Previne rolagem da página quando o mouse está sobre o mapa
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      if (containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    return () => window.removeEventListener('wheel', preventScroll);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Previne comportamento padrão
    setIsDragging(true);
    setIsInteracting(true); // Marca interação durante drag
    
    // Obtém a posição inicial do mouse ou toque
    let clientX, clientY;
    if ('touches' in e) {
      // É um evento de toque
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // É um evento de mouse
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    
    setDragStart({
      x: clientX,
      y: clientY,
      panX: panPosition.x,
      panY: panPosition.y
    });
  };

  // Throttled mouse move para performance
  const throttledMouseMove = useCallback(
    throttle((e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;
      
      // Obtém a posição atual do mouse ou toque
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
      }
      
      // Calcula o deslocamento usando valores de estado atuais
      const dx = (clientX - dragStart.x) / (scale * zoomLevel);
      const dy = (clientY - dragStart.y) / (scale * zoomLevel);
      
      // Calcula nova posição
      const newX = dragStart.panX + dx;
      const newY = dragStart.panY + dy;
      
      // Atualiza estado diretamente
      setPanPosition({ x: newX, y: newY });
    }, 16), // ~60fps
    [isDragging, dragStart, scale, zoomLevel]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    throttledMouseMove(e);
  }, [throttledMouseMove]);

  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Para a interação após um pequeno delay para permitir acabamento suave
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 1000); // Timeout maior e consistente
  };

  // Adiciona eventos de toque para dispositivos móveis
  useEffect(() => {
    const mapElement = mapRef.current;
    if (!mapElement) return;
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      
      // Converter para o formato esperado pelo handleMouseMove
      const syntheticEvent = {
        touches: e.touches,
        preventDefault: () => e.preventDefault()
      } as unknown as React.TouchEvent;
      
      handleMouseMove(syntheticEvent);
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      // Para a interação após um pequeno delay
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      interactionTimeoutRef.current = setTimeout(() => {
        setIsInteracting(false);
      }, 1000); // Timeout consistente com outros eventos
    };
    
    mapElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    mapElement.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      mapElement.removeEventListener('touchmove', handleTouchMove);
      mapElement.removeEventListener('touchend', handleTouchEnd);
      // Cleanup timeout
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [isDragging, dragStart, handleMouseMove]);

  // Previne comportamento padrão em dispositivos touch
  useEffect(() => {
    const mapElement = mapRef.current;
    if (!mapElement) return;
    
    mapElement.style.touchAction = 'none';
  }, []);

  // Ref para controlar a animação
  const animationFrameRef = useRef<number | null>(null);

  // Função para centralizar no Pokémon com animação suave
  const centerOnPokemon = (x: number, y: number) => {
    if (!containerRef.current) return;
    
    // Cancela qualquer animação anterior
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Valores iniciais
    const startX = panPosition.x;
    const startY = panPosition.y;
    const startZoom = zoomLevel;
    const targetZoom = 1.6;
    
    // Abordagem simplificada para centralizar
    // Calcula a posição para que o ponto (x,y) fique no centro da tela
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    // O ponto central da tela em coordenadas do mapa
    const screenCenterX = containerWidth / 2;
    const screenCenterY = containerHeight / 2;
    
    // A posição do pan para que o ponto (x,y) fique no centro
    const targetX = screenCenterX / (scale * targetZoom) - x;
    const targetY = screenCenterY / (scale * targetZoom) - y;
    
    // Duração da animação em ms
    const duration = 500;
    const startTime = Date.now();
    
    // Função que executa a animação
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-cubic)
      const t = 1 - Math.pow(1 - progress, 3);
      
      // Interpola os valores
      const newX = startX + (targetX - startX) * t;
      const newY = startY + (targetY - startY) * t;
      const newZoom = startZoom + (targetZoom - startZoom) * t;
      
      // Atualiza os estados
      setPanPosition({ x: newX, y: newY });
      setZoomLevel(newZoom);
      
      // Continua a animação se não estiver completa
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };
    
    // Inicia a animação
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Centraliza o mapa quando o Pokémon selecionado muda
  useEffect(() => {
    if (!selectedPokemon || !selectedPokemonData || !containerRef.current || isTyping) return;
    
    // Calcula a média das localizações
    const avgLoc = selectedPokemonData.locations.reduce(
      (acc, loc) => ({
        x: acc.x + loc.x / selectedPokemonData.locations.length,
        y: acc.y + loc.y / selectedPokemonData.locations.length,
        z: acc.z + loc.z / selectedPokemonData.locations.length
      }),
      { x: 0, y: 0, z: 0 }
    );
    
    // Atualiza o estado apenas se for diferente
    if (!averageLocation || 
        averageLocation.x !== avgLoc.x || 
        averageLocation.y !== avgLoc.y || 
        averageLocation.z !== avgLoc.z) {
      setAverageLocation(avgLoc);
    }
    
    // Aplica a centralização apenas se o Pokémon selecionado mudou
    if (selectedPokemonRef.current !== selectedPokemon) {
      selectedPokemonRef.current = selectedPokemon;
      centerOnPokemon(avgLoc.x, avgLoc.y);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPokemon, selectedPokemonData, scale, isTyping]);

  // Marca quando o mapa carregar
  useEffect(() => {
    if (mapRef.current?.querySelector('img')?.complete) {
      setIsLoading(false);
    } else {
      const img = mapRef.current?.querySelector('img');
      if (img) {
        const onLoad = () => setIsLoading(false);
        img.addEventListener('load', onLoad);
        return () => img.removeEventListener('load', onLoad);
      }
    }
  }, []);

  // Estado para controlar quando aplicar limites
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Aplica limites de pan muito suaves para evitar bouncing
  const debouncedPanLimits = useCallback(
    debounce(() => {
      if (!containerRef.current || isInteracting) return;
      
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const mapWidth = MAP_WIDTH * scale * zoomLevel;
      const mapHeight = MAP_HEIGHT * scale * zoomLevel;
      
      // Limites muito mais permissivos - quase sem restrições
      // Permite que o mapa saia completamente da tela em qualquer direção
      const generousPadding = Math.max(mapWidth * 0.8, mapHeight * 0.8); // Padding muito generoso
      const minX = -mapWidth - generousPadding;
      const maxX = containerWidth + generousPadding;
      const minY = -mapHeight - generousPadding;
      const maxY = containerHeight + generousPadding;
      
      // Só aplica correção se estiver MUITO longe dos limites (emergência)
      const emergencyThreshold = 50; // Threshold muito alto
      let needsCorrection = false;
      let newX = panPosition.x;
      let newY = panPosition.y;
      
      // Só corrige se estiver extremamente fora dos limites
      if (panPosition.x < minX - emergencyThreshold) {
        newX = minX;
        needsCorrection = true;
      } else if (panPosition.x > maxX + emergencyThreshold) {
        newX = maxX;
        needsCorrection = true;
      }
      
      if (panPosition.y < minY - emergencyThreshold) {
        newY = minY;
        needsCorrection = true;
      } else if (panPosition.y > maxY + emergencyThreshold) {
        newY = maxY;
        needsCorrection = true;
      }
      
      // Só aplica correção em casos extremos
      if (needsCorrection) {
        setPanPosition({ x: newX, y: newY });
      }
    }, 500), // Debounce ainda maior para ser menos agressivo
    [panPosition, scale, zoomLevel, isInteracting]
  );
  
  // Só aplica limites quando não está interagindo
  useEffect(() => {
    if (!isInteracting) {
      debouncedPanLimits();
    }
  }, [debouncedPanLimits, isInteracting]);

  // Função para obter a localização mais representativa de um Pokémon
  const getBestLocation = (pokemon: PokemonLocation) => {
    if (pokemon.locations.length === 0) return null;
    if (pokemon.locations.length === 1) return pokemon.locations[0];
    
    // Encontra clusters de localizações próximas
    const clusters: { center: {x: number, y: number, z: number}, points: number }[] = [];
    const threshold = 50; // Distância para considerar parte do mesmo cluster
    
    // Para cada localização, verifica se está próxima de um cluster existente
    pokemon.locations.forEach(loc => {
      let foundCluster = false;
      
      for (const cluster of clusters) {
        const distance = Math.sqrt(
          Math.pow(loc.x - cluster.center.x, 2) + 
          Math.pow(loc.y - cluster.center.y, 2)
        );
        
        if (distance < threshold) {
          // Atualiza o centro do cluster (média ponderada)
          cluster.center.x = (cluster.center.x * cluster.points + loc.x) / (cluster.points + 1);
          cluster.center.y = (cluster.center.y * cluster.points + loc.y) / (cluster.points + 1);
          cluster.center.z = (cluster.center.z * cluster.points + loc.z) / (cluster.points + 1);
          cluster.points++;
          foundCluster = true;
          break;
        }
      }
      
      if (!foundCluster) {
        // Cria um novo cluster
        clusters.push({
          center: { ...loc },
          points: 1
        });
      }
    });
    
    // Encontra o cluster com mais pontos
    const largestCluster = clusters.reduce((max, cluster) => 
      cluster.points > max.points ? cluster : max, 
      clusters[0]
    );
    
    // Encontra a localização mais próxima do centro do maior cluster
    let closestLocation = pokemon.locations[0];
    let minDistance = Number.MAX_VALUE;
    
    pokemon.locations.forEach(loc => {
      const distance = Math.sqrt(
        Math.pow(loc.x - largestCluster.center.x, 2) + 
        Math.pow(loc.y - largestCluster.center.y, 2) + 
        Math.pow(loc.z - largestCluster.center.z, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestLocation = loc;
      }
    });
    
    return closestLocation;
  };

  // Função para copiar localização média de um Pokémon
  const copyPokemonLocation = (pokemon: PokemonLocation) => {
    if (pokemon.locations.length === 0) return;
    
    // Usa a função getBestLocation para encontrar a melhor localização
    const bestLoc = getBestLocation(pokemon);
    if (!bestLoc) return;
    
    const text = `(${Math.round(bestLoc.x)}, ${Math.round(bestLoc.y)}, ${Math.round(bestLoc.z)})`;
    navigator.clipboard.writeText(text);
    toast.success(`Copiado: ${text}`);
  };

  const copyAverageLocation = () => {
    if (averageLocation) {
      const text = `(${Math.round(averageLocation.x)}, ${Math.round(averageLocation.y)}, ${Math.round(averageLocation.z)})`;
      navigator.clipboard.writeText(text);
    }
  };

  // Funções de controle de zoom otimizadas
  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev * 1.2, 4));
  }, []);
  
  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.3));
  }, []);
  
  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  // Filtra os Pokémon com base na pesquisa
  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return validPokemonLocations;
    
    return validPokemonLocations.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Virtual scrolling para lista de Pokémon
  const [listScrollTop, setListScrollTop] = useState(0);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const listRef = useRef<HTMLDivElement>(null);
  
  // Calcula quais itens são visíveis para virtual scrolling
  const updateVisibleRange = useCallback(
    throttle((pokemonCount: number) => {
      if (!listRef.current) return;
      
      const containerHeight = listRef.current.clientHeight;
      const itemHeight = 64; // Altura aproximada de cada item
      const buffer = 5; // Buffer de itens extras
      
      const start = Math.max(0, Math.floor(listScrollTop / itemHeight) - buffer);
      const end = Math.min(
        pokemonCount,
        start + Math.ceil(containerHeight / itemHeight) + buffer * 2
      );
      
      setVisibleRange({ start, end });
    }, 16),
    [listScrollTop]
  );
  
  // Atualiza quando filteredPokemon mudar
  useEffect(() => {
    updateVisibleRange(filteredPokemon.length);
  }, [filteredPokemon.length, updateVisibleRange]);
  
  // Itens visíveis para renderizar
  const visiblePokemon = useMemo(() => {
    return filteredPokemon.slice(visibleRange.start, visibleRange.end);
  }, [filteredPokemon, visibleRange]);
  
  // Altura total para o scroll virtual
  const totalHeight = filteredPokemon.length * 64;
  const offsetY = visibleRange.start * 64;

  // Memoized transform style para evitar recalculos desnecessários com hardware acceleration
  const mapTransform = useMemo(() => {
    const finalScale = scale * zoomLevel;
    return {
      width: MAP_WIDTH,
      height: MAP_HEIGHT,
      transform: `scale(${finalScale}) translate(${panPosition.x}px, ${panPosition.y}px)`,
      transformOrigin: '0 0',
      transition: isDragging ? 'none' : 'transform 0.1s ease-out',
      touchAction: 'none' as const,
      willChange: isDragging ? 'transform' : 'auto', // Otimização para GPU
      backfaceVisibility: 'hidden' as const, // Força hardware acceleration
    };
  }, [scale, zoomLevel, panPosition.x, panPosition.y, isDragging]);

  // Opções para o dropdown de Pokémon
  const pokemonOptions = filteredPokemon.map(p => ({
    value: p.name,
    label: (
      <div className="flex items-center gap-2">
        <Image 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.dexNumber}.png`}
          className="w-6 h-6"
          alt={p.name}
          width={24}
          height={24}
          unoptimized
        />
        <span>#{String(p.dexNumber).padStart(3, '0')} - {getFormattedPokemonName(p.name)}</span>
      </div>
    )
  }));

  return (
    <div className="min-h-screen text-gray-200 mt-10">
      <Toaster />
      <style jsx global>{globalStyles}</style>
      <div className="max-w-[90rem] mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {/* Conteúdo Principal - Mapa */}
          <div className="w-full md:max-w-[884px]">
            <div className="bg-[#3900d1] rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[350px] sm:h-[700px] md:h-[760px]">
                <div 
                  className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing" 
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={(e) => {
                    e.preventDefault();
                    
                    if (!containerRef.current) return;
                    
                    // Marca que está interagindo para evitar conflito com pan limits
                    setIsInteracting(true);
                    if (interactionTimeoutRef.current) {
                      clearTimeout(interactionTimeoutRef.current);
                    }
                    interactionTimeoutRef.current = setTimeout(() => {
                      setIsInteracting(false);
                    }, 1000); // Timeout ainda maior para evitar bouncing
                    
                    // Fator de zoom mais suave
                    const zoomFactor = 0.1;
                    const delta = e.deltaY > 0 ? -zoomFactor : zoomFactor;
                    
                    // Calcula novo nível de zoom com limites
                    const currentZoom = zoomLevel;
                    const newZoomLevel = Math.max(0.3, Math.min(4, currentZoom * (1 + delta)));
                    
                    if (newZoomLevel === currentZoom) return; // Evita cálculos desnecessários
                    
                    // Posição do cursor relativa ao container
                    const rect = containerRef.current.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    
                    // Current transform values
                    const currentScale = scale;
                    const currentPanX = panPosition.x;
                    const currentPanY = panPosition.y;
                    
                    // Calculate the point in map coordinates that's under the cursor
                    // This accounts for the current transform: scale(currentScale * currentZoom) translate(currentPanX, currentPanY)
                    const mapPointX = (mouseX / (currentScale * currentZoom)) - currentPanX;
                    const mapPointY = (mouseY / (currentScale * currentZoom)) - currentPanY;
                    
                    // Calculate new pan position to keep the same map point under the cursor
                    const newPanX = (mouseX / (currentScale * newZoomLevel)) - mapPointX;
                    const newPanY = (mouseY / (currentScale * newZoomLevel)) - mapPointY;
                    
                    // Atualiza ambos estados ao mesmo tempo
                    setZoomLevel(newZoomLevel);
                    setPanPosition({ x: newPanX, y: newPanY });
                  }}
                  style={{ touchAction: 'none' }} // Previne comportamento padrão em dispositivos touch
                >
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
                        <p>Carregando mapa...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Controles de Zoom - Posicionamento absoluto dentro do container */}
                  <div className="absolute top-4 right-4 z-10 bg-[#25262b]/90 rounded-lg shadow-lg">
                    <button 
                      onClick={zoomIn}
                      className="p-2 hover:bg-[#2c2d32] text-white block w-full border-b border-[#373a40]"
                      title="Aumentar Zoom"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                    <button 
                      onClick={zoomOut}
                      className="p-2 hover:bg-[#2c2d32] text-white block w-full border-b border-[#373a40]"
                      title="Diminuir Zoom"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <button 
                      onClick={resetZoom}
                      className="p-2 hover:bg-[#2c2d32] text-white block w-full"
                      title="Resetar Zoom"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4M4 16l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Interruptor para alternar entre Pin e Heatmap */}
                  <div className="absolute top-4 left-4 z-10">
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={viewMode === 'heatmap'}
                        onChange={() => setViewMode(mode => mode === 'pinpoint' ? 'heatmap' : 'pinpoint')}
                      />
                      <div className="relative w-11 h-6 bg-[#25262b] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-white">
                        {viewMode === 'pinpoint' ? 'Pin' : 'Heatmap'}
                      </span>
                    </label>
                  </div>

                  {/* Mapa com Pins */}
                  <div 
                    ref={mapRef}
                    className="relative"
                    style={mapTransform}
                    onTouchStart={handleMouseDown}
                  >
                    <Image
                      src="/map/Kanto_7.png"
                      alt="Mapa de Kanto"
                      width={MAP_WIDTH}
                      height={MAP_HEIGHT}
                      className="block"
                      unoptimized
                    />
                    
                    {/* Pins diretamente na imagem */}
                    {viewMode === 'pinpoint' && selectedPokemon && selectedPokemonData && (
                      <PinpointComponent
                        data={[selectedPokemonData]}
                        scale={scale}
                        zoomLevel={zoomLevel}
                        panPosition={panPosition}
                        containerSize={{
                          width: containerRef.current?.clientWidth || 800,
                          height: containerRef.current?.clientHeight || 600
                        }}
                        onPinClick={(loc) => {
                          const text = `(${Math.round(loc.x)}, ${Math.round(loc.y)}, ${Math.round(loc.z)})`;
                          navigator.clipboard.writeText(text);
                          toast.success(`Copiado: ${text}`);
                        }}
                      />
                    )}
                    
                    {viewMode === 'heatmap' && selectedPokemon && selectedPokemonData && (
                      <>
                        {/* Apenas heatmap menor com viewport culling */}
                        {selectedPokemonData.locations
                          .filter(location => {
                            // Viewport culling para heatmap - CORRIGIDO para funcionar com transform: scale() translate()
                            const totalScale = scale * zoomLevel;
                            const buffer = 500; // Buffer muito maior para garantir que pins não desapareçam
                            
                            // Converte coordenadas da tela para coordenadas do mapa
                            const bounds = {
                              left: (0 / totalScale) - panPosition.x - buffer,
                              top: (0 / totalScale) - panPosition.y - buffer,
                              right: ((containerRef.current?.clientWidth || 800) / totalScale) - panPosition.x + buffer,
                              bottom: ((containerRef.current?.clientHeight || 600) / totalScale) - panPosition.y + buffer,
                            };
                            return location.x >= bounds.left && location.x <= bounds.right &&
                                   location.y >= bounds.top && location.y <= bounds.bottom;
                          })
                          .map((location, index) => {
                            // Determina o tamanho da mancha baseado no tamanho da tela
                            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                            const size = isMobile ? 4 : 12;
                            const offset = isMobile ? 2 : 6;
                            
                            // Usa os valores do memoized transform para melhor performance
                            const inverseScale = 1 / (scale * zoomLevel);
                            
                            return (
                              <div
                                key={`heatmap-${index}`}
                                className="absolute bg-red-500/70 rounded-full blur-md"
                                style={{
                                  left: location.x,
                                  top: location.y,
                                  width: `${size}px`,
                                  height: `${size}px`,
                                  marginLeft: `-${offset}px`,
                                  marginTop: `-${offset}px`,
                                  transform: `scale(${inverseScale})`,
                                  transformOrigin: 'center',
                                  willChange: 'transform',
                                }}
                              />
                            );
                          })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Barra Lateral - Lista e Controles */}
          <div className="w-full md:w-[320px] flex flex-col h-[500px] sm:h-[700px] md:h-[760px]">
            {/* Barra de pesquisa */}
            <div className="bg-[#25262b] rounded-lg p-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar Pokémon..."
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-[#1e1f23] text-gray-200 px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Lista de Pokémon */}
            <div className="bg-[#25262b] rounded-lg p-4 flex-1 overflow-hidden">
              <h2 className="text-lg font-medium mb-3">Pokémon</h2>
              <div 
                ref={listRef}
                className="h-full overflow-auto pr-2"
                onScroll={(e) => {
                  const scrollTop = e.currentTarget.scrollTop;
                  setListScrollTop(scrollTop);
                  updateVisibleRange(filteredPokemon.length);
                }}
              >
                <div style={{ height: totalHeight, position: 'relative' }}>
                  <div 
                    style={{ 
                      transform: `translateY(${offsetY}px)`,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0
                    }}
                  >
                    {visiblePokemon.map((pokemon, index) => {
                      const actualIndex = visibleRange.start + index;
                      return (
                        <div 
                          key={pokemon.name}
                          className={`w-full text-left p-2 mb-2 rounded-md ${selectedPokemon === pokemon.name ? 'bg-blue-500/20' : 'bg-[#1e1f23]'}`}
                          style={{ height: '60px' }} // Altura fixa para virtual scrolling
                        >
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedPokemon(pokemon.name)}
                              className="flex-1 flex items-center gap-2 text-left"
                            >
                              <Image 
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexNumber}.png`}
                                className="w-8 h-8"
                                alt={pokemon.name}
                                width={32}
                                height={32}
                                unoptimized
                                loading="lazy"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-sm text-gray-400">#{String(pokemon.dexNumber).padStart(3, '0')}</span>
                                  <span className="font-medium truncate">{getFormattedPokemonName(pokemon.name)}</span>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {pokemon.locations.length} {pokemon.locations.length === 1 ? 'localização' : 'localizações'}
                                </p>
                              </div>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyPokemonLocation(pokemon);
                              }}
                              className="p-2 hover:bg-[#2c2d32] rounded-lg transition-colors"
                              title="Copiar localização"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
