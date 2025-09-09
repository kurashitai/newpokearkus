'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ZoomIn, ZoomOut, RotateCcw, MapPin, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { pokemonLocations } from './pokemon_data';
import { PokemonLocation } from './types';
import { pokemonTypes } from './pokemon_types';
import { typeIcons } from './type_icons';
import PinpointComponent from './components/PinpointComponent';
import HeatmapComponent from './components/HeatmapComponent';

// Corrige nomes dos Pokémon para exibição
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

// Dimensões originais do mapa
const MAP_WIDTH = 1680;
const MAP_HEIGHT = 3815;

type ViewMode = 'pinpoint' | 'heatmap';

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

// Add this function to remove a specific filter
// These functions are moved inside the component to have access to state setters

export default function MapaInterativo() {
  const [viewMode, setViewMode] = useState<ViewMode>('pinpoint');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, panX: 0, panY: 0 });
  const [regionFilters, setRegionFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const selectedPokemonRef = useRef<string | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Add this function to remove a specific filter
  const removeRegionFilter = (region: string) => {
    setRegionFilters(prev => prev.filter(r => r !== region));
  };

  const removeTypeFilter = (type: string) => {
    setTypeFilters(prev => prev.filter(t => t !== type));
  };

  // Filter Pokemon based on search query and sort by Pokedex number
  const filteredPokemon = useMemo(() => {
    let filtered = pokemonLocations;
    
    // Apply search filter
    if (searchQuery) {
      filtered = pokemonLocations.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply region filters (based on dex number ranges)
    // If no region filters are selected, show all regions
    // If region filters are selected, show Pokemon from any of the selected regions
    if (regionFilters.length > 0) {
      filtered = filtered.filter(pokemon => {
        return regionFilters.some(region => {
          switch (region) {
            case 'kanto':
              return pokemon.dexNumber >= 1 && pokemon.dexNumber <= 151;
            case 'johto':
              return pokemon.dexNumber >= 152 && pokemon.dexNumber <= 251;
            case 'hoenn':
              return pokemon.dexNumber >= 252 && pokemon.dexNumber <= 386;
            default:
              return false;
          }
        });
      });
    }
    
    // Apply type filters (based on actual Pokemon types)
    // If no type filters are selected, show all types
    // If type filters are selected, show Pokemon with any of the selected types
    if (typeFilters.length > 0) {
      filtered = filtered.filter(pokemon => {
        const pokemonTypeData = pokemonTypes.find(type => type.dexNumber === pokemon.dexNumber);
        if (pokemonTypeData) {
          return typeFilters.some(filterType => pokemonTypeData.types.includes(filterType));
        }
        return false;
      });
    }
    
    // Sort by Pokedex number (ascending order)
    return filtered.sort((a, b) => {
      // Handle pokemon without dex numbers (put them at the end)
      if (a.dexNumber === -1 && b.dexNumber === -1) return 0;
      if (a.dexNumber === -1) return 1;
      if (b.dexNumber === -1) return -1;
      return a.dexNumber - b.dexNumber;
    });
  }, [searchQuery, regionFilters, typeFilters]);

  // Get selected Pokemon data
  const selectedPokemonData = useMemo(() => {
    if (!selectedPokemon) return null;
    return filteredPokemon.find(pokemon => pokemon.id === selectedPokemon);
  }, [selectedPokemon, filteredPokemon]);

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

  // Zoom controls with centering
  const handleZoomIn = useCallback(() => {
    if (!containerRef.current) {
      setZoomLevel(prev => Math.min(prev * 1.2, 4));
      return;
    }
    
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Calculate center point in map coordinates
    const centerX = (containerWidth / 2) / (scale * zoomLevel) - panPosition.x;
    const centerY = (containerHeight / 2) / (scale * zoomLevel) - panPosition.y;
    
    // Apply zoom
    const newZoomLevel = Math.min(zoomLevel * 1.2, 4);
    setZoomLevel(newZoomLevel);
    
    // Adjust pan to keep center point in view
    const newPanX = (containerWidth / 2) / (scale * newZoomLevel) - centerX;
    const newPanY = (containerHeight / 2) / (scale * newZoomLevel) - centerY;
    
    setPanPosition({ x: newPanX, y: newPanY });
  }, [zoomLevel, panPosition, scale]);

  const handleZoomOut = useCallback(() => {
    if (!containerRef.current) {
      setZoomLevel(prev => Math.max(prev / 1.2, 0.3));
      return;
    }
    
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Calculate center point in map coordinates
    const centerX = (containerWidth / 2) / (scale * zoomLevel) - panPosition.x;
    const centerY = (containerHeight / 2) / (scale * zoomLevel) - panPosition.y;
    
    // Apply zoom
    const newZoomLevel = Math.max(zoomLevel / 1.2, 0.3);
    setZoomLevel(newZoomLevel);
    
    // Adjust pan to keep center point in view
    const newPanX = (containerWidth / 2) / (scale * newZoomLevel) - centerX;
    const newPanY = (containerHeight / 2) / (scale * newZoomLevel) - centerY;
    
    setPanPosition({ x: newPanX, y: newPanY });
  }, [zoomLevel, panPosition, scale]);

  const handleReset = useCallback(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setSelectedPokemon(null);
  }, []);

  // Função para centralizar no Pokémon selecionado com animação suave
  const centerOnPokemon = useCallback((pokemon: PokemonLocation) => {
    if (!containerRef.current || !pokemon.averageLocation) return;
    
    // Cancela qualquer animação anterior
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Valores iniciais
    const startX = panPosition.x;
    const startY = panPosition.y;
    const startZoom = zoomLevel;
    
    // Calcula a média das localizações
    const avgLoc = pokemon.averageLocation;
    
    // Dimensões do container
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    // Calcula a posição para centralizar o ponto médio
    const targetX = (containerWidth / 2) / (scale * startZoom) - avgLoc.x;
    const targetY = (containerHeight / 2) / (scale * startZoom) - avgLoc.y;
    
    // Define um zoom level apropriado para visualização
    const targetZoom = 1.6;
    
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
  }, [panPosition, zoomLevel, scale]);

  // Centraliza o mapa quando o Pokémon selecionado muda
  useEffect(() => {
    if (selectedPokemonData && selectedPokemonRef.current !== selectedPokemon) {
      selectedPokemonRef.current = selectedPokemon;
      centerOnPokemon(selectedPokemonData);
    }
  }, [selectedPokemonData, selectedPokemon, centerOnPokemon]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Previne comportamento padrão
    setIsDragging(true);
    
    // Obtém a posição inicial do mouse
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    setDragStart({
      x: clientX,
      y: clientY,
      panX: panPosition.x,
      panY: panPosition.y
    });
  }, [panPosition]);

  // Throttled mouse move para performance
  const throttledMouseMove = useCallback(
    throttle((e: React.MouseEvent) => {
      if (!isDragging) return;
      
      // Obtém a posição atual do mouse
      const clientX = e.clientX;
      const clientY = e.clientY;
      
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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    throttledMouseMove(e);
  }, [throttledMouseMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ 
        x: touch.clientX, 
        y: touch.clientY, 
        panX: panPosition.x, 
        panY: panPosition.y 
      });
    }
  }, [panPosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const touch = e.touches[0];
    
    // Calculate movement similar to mouse
    const dx = (touch.clientX - dragStart.x) / (scale * zoomLevel);
    const dy = (touch.clientY - dragStart.y) / (scale * zoomLevel);
    
    const newX = dragStart.panX + dx;
    const newY = dragStart.panY + dy;
    
    setPanPosition({ x: newX, y: newY });
  }, [isDragging, dragStart, scale, zoomLevel]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse wheel zoom handler with cursor-centered zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    if (!containerRef.current) return;
    
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
  }, [zoomLevel, scale, panPosition]);

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

  // Aplica limites de pan para evitar que o mapa saia completamente da tela
  const applyPanLimits = useCallback(() => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const mapWidth = MAP_WIDTH * scale * zoomLevel;
    const mapHeight = MAP_HEIGHT * scale * zoomLevel;
    
    // Calcula limites respeitando os limites da imagem
    const minX = Math.min(0, containerWidth - mapWidth);
    const maxX = Math.max(0, containerWidth - mapWidth);
    const minY = Math.min(0, containerHeight - mapHeight);
    const maxY = Math.max(0, containerHeight - mapHeight);
    
    // Adiciona um pequeno padding para melhor experiência do usuário
    const padding = 50;
    const adjustedMinX = minX - padding;
    const adjustedMaxX = maxX + padding;
    const adjustedMinY = minY - padding;
    const adjustedMaxY = maxY + padding;
    
    // Aplica correções se necessário
    let newX = panPosition.x;
    let newY = panPosition.y;
    let needsUpdate = false;
    
    if (panPosition.x < adjustedMinX) {
      newX = adjustedMinX;
      needsUpdate = true;
    } else if (panPosition.x > adjustedMaxX) {
      newX = adjustedMaxX;
      needsUpdate = true;
    }
    
    if (panPosition.y < adjustedMinY) {
      newY = adjustedMinY;
      needsUpdate = true;
    } else if (panPosition.y > adjustedMaxY) {
      newY = adjustedMaxY;
      needsUpdate = true;
    }
    
    if (needsUpdate) {
      setPanPosition({ x: newX, y: newY });
    }
  }, [panPosition, scale, zoomLevel]);

  // Aplica limites quando o pan ou zoom muda
  useEffect(() => {
    // Small delay to avoid conflicts during user interaction
    const timeoutId = setTimeout(() => {
      applyPanLimits();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [applyPanLimits]);

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

  // Estado para controlar a altura do mapa
  const [mapHeight, setMapHeight] = useState('60vh');

  // Ajusta a altura do mapa com base no tamanho da tela
  useEffect(() => {
    function updateMapHeight() {
      const screenHeight = window.innerHeight;
      
      // Para telas muito pequenas
      if (screenHeight < 600) {
        setMapHeight('400px');
      } 
      // Para telas médias
      else if (screenHeight < 800) {
        setMapHeight('50vh');
      }
      // Para telas grandes
      else {
        setMapHeight('60vh');
      }
    }

    updateMapHeight();
    window.addEventListener('resize', updateMapHeight);
    return () => window.removeEventListener('resize', updateMapHeight);
  }, []);

  // Function to clear all filters
  const clearFilters = () => {
    setRegionFilters([]);
    setTypeFilters([]);
    setSearchQuery('');
  };

  // Scroll to top when filters change
  useEffect(() => {
    if (scrollAreaRef.current) {
      // Scroll to top of the Pokemon list
      scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [regionFilters, typeFilters, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-purple-500/5">
      {/* Header */}
      <div className="relative z-10 pt-24 pb-6">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Mapa Interativo</h1>
            <p className="text-xl text-muted-foreground">
              Explore Pokemon locations across the game world
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 min-h-[calc(100vh-300px)]">
          {/* Map Area - Full width on mobile, 3/4 on desktop */}
          <div className="lg:col-span-3 order-1">
            <Card className="overflow-hidden" style={{ height: mapHeight }}>
              <CardContent className="p-0 h-full">
                <div
                  ref={containerRef}
                  className="relative h-full overflow-hidden cursor-grab active:cursor-grabbing bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onWheel={handleWheel}
                >
                  {/* Map Container */}
                  <div
                    ref={mapRef}
                    className="relative"
                    style={mapTransform}
                  >
                    {/* Background Map */}
                    <Image
                      src="/map/Kanto_7.png"
                      alt="Pokemon World Map"
                      width={MAP_WIDTH}
                      height={MAP_HEIGHT}
                      className="block"
                      priority
                      unoptimized
                    />
                    
                    {/* Overlay Components */}
                    {viewMode === 'pinpoint' && selectedPokemonData && (
                      <PinpointComponent
                        data={[selectedPokemonData]}
                        scale={scale}
                        zoomLevel={zoomLevel}
                        panPosition={panPosition}
                        containerSize={{
                          width: containerRef.current?.clientWidth || 800,
                          height: containerRef.current?.clientHeight || 600
                        }}
                        onPinClick={(location) => {
                          console.log('Pin clicked:', location);
                        }}
                      />
                    )}
                    
                    {viewMode === 'heatmap' && selectedPokemonData && (
                      <HeatmapComponent
                        data={[selectedPokemonData]}
                      />
                    )}
                  </div>

                  {/* Google Maps-Style Controls - Inside Map */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1 z-30">
                    {/* View Mode Toggle */}
                    <div className="bg-card/90 backdrop-blur-sm rounded-lg border shadow-lg p-1">
                      <div className="flex flex-col gap-0.5">
                        <Button
                          variant={viewMode === 'pinpoint' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('pinpoint')}
                          className="h-7 px-2 text-xs justify-start"
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          Pinpoints
                        </Button>
                        <Button
                          variant={viewMode === 'heatmap' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('heatmap')}
                          className="h-7 px-2 text-xs justify-start"
                        >
                          Heatmap
                        </Button>
                      </div>
                    </div>
                    
                    {/* Zoom Controls */}
                    <div className="flex flex-col align gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleZoomIn}
                        className="h-10 w-10 p-0 bg-card/90 backdrop-blur-sm rounded-lg border shadow-lg"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleZoomOut}
                        className="h-10 w-10 p-0 bg-card/90 backdrop-blur-sm rounded-lg border shadow-lg"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleReset}
                        className="h-10 w-10 p-0 bg-card/90 backdrop-blur-sm rounded-lg border shadow-lg"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Map Info */}
                  <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border shadow-lg z-30">
                    <div className="text-sm">
                      <div>Zoom: {(zoomLevel * 100).toFixed(0)}%</div>
                      <div>Mode: {viewMode}</div>
                      {selectedPokemon && (
                        <div className="text-primary font-medium">
                          Showing: {filteredPokemon.find(p => p.id === selectedPokemon)?.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pokemon List Sidebar - Right on desktop, Below on mobile */}
          <div className="lg:col-span-1 order-2">
            <Card className="overflow-hidden" style={{ height: mapHeight }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <List className="h-5 w-5" />
                  Pokemon List
                  <Badge variant="secondary" className="ml-auto">
                    {filteredPokemon.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex flex-col h-full">
                {/* Filters and Search Bar */}
                <div className="px-4 pb-3 space-y-3">
                  {/* Filter Dropdowns */}
                  <div className="flex gap-2 items-center">
                    {/* Region Filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex-1 justify-between">
                          {regionFilters.length === 0 ? 'All Regions' : `${regionFilters.length} selected`}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[215px] h-[275px] overflow-y-auto grid grid-cols-1 gap-2 p-2" side="bottom" align="start">
                        <DropdownMenuCheckboxItem 
                          checked={regionFilters.length === 0}
                          onCheckedChange={(checked) => {
                            if (checked) setRegionFilters([]);
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          All Regions
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={regionFilters.includes('kanto')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setRegionFilters(prev => [...prev, 'kanto']);
                            } else {
                              setRegionFilters(prev => prev.filter(r => r !== 'kanto'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          Kanto (1-151)
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={regionFilters.includes('johto')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setRegionFilters(prev => [...prev, 'johto']);
                            } else {
                              setRegionFilters(prev => prev.filter(r => r !== 'johto'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          Johto (152-251)
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={regionFilters.includes('hoenn')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setRegionFilters(prev => [...prev, 'hoenn']);
                            } else {
                              setRegionFilters(prev => prev.filter(r => r !== 'hoenn'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          Hoenn (252-386)
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {/* Type Filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex-1 justify-between">
                          {typeFilters.length === 0 ? 'All Types' : `${typeFilters.length} selected`}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[450px] h-[320px] overflow-y-auto grid grid-cols-3 gap-2 p-2" side="bottom" align="end">
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.length === 0}
                          onCheckedChange={(checked) => {
                            if (checked) setTypeFilters([]);
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          All Types
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Normal')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Normal']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Normal'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Normal.png" 
                                alt="Normal" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Normal
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Fire')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Fire']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Fire'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Fire.png" 
                                alt="Fire" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Fire
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Water')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Water']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Water'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Water.png" 
                                alt="Water" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Water
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Electric')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Electric']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Electric'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Electric.png" 
                                alt="Electric" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Electric
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Grass')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Grass']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Grass'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Grass.png" 
                                alt="Grass" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Grass
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Ice')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Ice']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Ice'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Ice.png" 
                                alt="Ice" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Ice
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Fighting')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Fighting']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Fighting'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Fighting.png" 
                                alt="Fighting" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Fighting
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Poison')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Poison']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Poison'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Poison.png" 
                                alt="Poison" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Poison
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Ground')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Ground']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Ground'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Ground.png" 
                                alt="Ground" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Ground
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Flying')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Flying']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Flying'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Flying.png" 
                                alt="Flying" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Flying
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Psychic')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Psychic']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Psychic'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Psychic.png" 
                                alt="Psychic" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Psychic
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Bug')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Bug']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Bug'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Bug.png" 
                                alt="Bug" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Bug
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Rock')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Rock']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Rock'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Rock.png" 
                                alt="Rock" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Rock
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Ghost')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Ghost']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Ghost'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Ghost.png" 
                                alt="Ghost" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Ghost
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Dragon')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Dragon']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Dragon'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Dragon.png" 
                                alt="Dragon" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Dragon
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Dark')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Dark']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Dark'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Dark.png" 
                                alt="Dark" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Dark
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Steel')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Steel']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Steel'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Steel.png" 
                                alt="Steel" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Steel
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          checked={typeFilters.includes('Fairy')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTypeFilters(prev => [...prev, 'Fairy']);
                            } else {
                              setTypeFilters(prev => prev.filter(t => t !== 'Fairy'));
                            }
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img 
                                src="/elemento/Fairy.png" 
                                alt="Fairy" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Fairy
                          </div>
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {/* Clear Filters Button */}
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={clearFilters}
                      className="h-10 w-10"
                    >
                      <span className="sr-only">Clear filters</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                  
                  {/* Filter Tags Display */}
                  {(regionFilters.length > 0 || typeFilters.length > 0) && (
                    <div className="flex flex-wrap gap-2">
                      {regionFilters.map(region => (
                        <Badge 
                          key={region} 
                          variant="default" 
                          className="bg-black text-white pr-1"
                        >
                          <span className="mr-1">{region.charAt(0).toUpperCase() + region.slice(1)}</span>
                          <button 
                            onClick={() => removeRegionFilter(region)}
                            className="rounded-full bg-white/20 hover:bg-white/30 w-4 h-4 flex items-center justify-center"
                          >
                            <span className="text-xs">×</span>
                          </button>
                        </Badge>
                      ))}
                      {typeFilters.map(type => (
                        <Badge 
                          key={type} 
                          variant="default" 
                          className="bg-black text-white pr-1 flex items-center"
                        >
                          <div className="w-3 h-3 rounded-full overflow-hidden mr-1">
                            <img 
                              src={`/elemento/${type}.png`} 
                              alt={type} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                          <span className="mr-1">{type}</span>
                          <button 
                            onClick={() => removeTypeFilter(type)}
                            className="rounded-full bg-white/20 hover:bg-white/30 w-4 h-4 flex items-center justify-center"
                          >
                            <span className="text-xs">×</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search Pokemon..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                {/* Pokemon List */}
                <ScrollArea className="flex-grow h-full w-full" ref={scrollAreaRef}>
                  <div className="px-4 space-y-2 pb-4">
                    {filteredPokemon.map((pokemon) => {
                      // Get Pokemon type data
                      const pokemonTypeData = pokemonTypes.find(type => type.dexNumber === pokemon.dexNumber);
                      const primaryType = pokemonTypeData?.types[0] || '';
                      const secondaryType = pokemonTypeData?.types[1] || '';
                      const primaryTypeIcon = primaryType ? `/elemento/${primaryType}.png` : '';
                      const secondaryTypeIcon = secondaryType ? `/elemento/${secondaryType}.png` : '';
                      
                      return (
                        <div
                          key={pokemon.id}
                          className={`p-3 rounded-lg border transition-all cursor-pointer hover:bg-accent ${
                            selectedPokemon === pokemon.id ? 'bg-primary/10 border-primary' : 'bg-card'
                          }`}
                          onClick={() => setSelectedPokemon(
                            selectedPokemon === pokemon.id ? null : pokemon.id || null
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full bg-background border-2 border-primary/20 overflow-hidden flex items-center justify-center">
                              <Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexNumber}.png`}
                                alt={pokemon.name}
                                width={32}
                                height={32}
                                unoptimized
                                className="object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="font-medium truncate">{getFormattedPokemonName(pokemon.name)}</div>
                                {primaryTypeIcon && (
                                  <div className="w-[17px] h-[17px] rounded-full overflow-hidden ml-2 flex-shrink-0">
                                    <img 
                                      src={primaryTypeIcon} 
                                      alt={primaryType} 
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                  #{pokemon.dexNumber} • {pokemon.samples} locations
                                </div>
                                {secondaryTypeIcon && (
                                  <div className="w-[17px] h-[17px] rounded-full overflow-hidden ml-2 flex-shrink-0">
                                    <img 
                                      src={secondaryTypeIcon} 
                                      alt={secondaryType} 
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {/* Add extra padding at the bottom to ensure the last item is fully visible */}
                    <div className="h-4"></div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
