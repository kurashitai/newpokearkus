'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, MapPin, Layers, ZoomIn, ZoomOut, RotateCcw, Filter, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useMap } from '@/lib/store'
import { motionVariants } from '@/components/providers/motion-provider'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// Mock Pokemon data for demonstration
const mockPokemonData = [
  { id: 1, name: 'Bulbasaur', dexNumber: 1, type: 'grass', rarity: 'common', x: 150, y: 200 },
  { id: 2, name: 'Charmander', dexNumber: 4, type: 'fire', rarity: 'uncommon', x: 300, y: 150 },
  { id: 3, name: 'Squirtle', dexNumber: 7, type: 'water', rarity: 'common', x: 250, y: 300 },
  { id: 4, name: 'Pikachu', dexNumber: 25, type: 'electric', rarity: 'rare', x: 400, y: 250 },
]

export function PremiumMapInterface() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'pinpoint' | 'heatmap'>('pinpoint')
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll()
  const mapRotation = useTransform(scrollYProgress, [0, 1], [0, 2])

  // Filter Pokemon based on search
  const filteredPokemon = mockPokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.2, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.2, 0.5))
  }, [])

  const resetView = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  return (
    <div className="min-h-screen py-24">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Interactive Pokemon Map
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover Pokemon locations with our advanced mapping system featuring real-time tracking and intelligent filtering.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Map Controls Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Search */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-primary" />
                Search Pokemon
              </h3>
              <div className="relative">
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-primary" />
                View Mode
              </h3>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'pinpoint' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('pinpoint')}
                  className="flex-1"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Pinpoint
                </Button>
                <Button
                  variant={viewMode === 'heatmap' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('heatmap')}
                  className="flex-1"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Heatmap
                </Button>
              </div>
            </div>

            {/* Map Controls */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Map Controls</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomIn}
                    className="flex-1"
                  >
                    <ZoomIn className="w-4 h-4 mr-2" />
                    Zoom In
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomOut}
                    className="flex-1"
                  >
                    <ZoomOut className="w-4 h-4 mr-2" />
                    Zoom Out
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetView}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset View
                </Button>
              </div>
            </div>

            {/* Pokemon List */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4 flex items-center justify-between">
                Pokemon Found
                <Badge variant="secondary">{filteredPokemon.length}</Badge>
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredPokemon.map((pokemon) => (
                  <motion.button
                    key={pokemon.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPokemon(pokemon.name)}
                    className={cn(
                      "w-full p-3 rounded-lg text-left transition-all",
                      "hover:bg-primary/10 border",
                      selectedPokemon === pokemon.name
                        ? "bg-primary/20 border-primary"
                        : "bg-background/50 border-border"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexNumber}.png`}
                        alt={pokemon.name}
                        width={32}
                        height={32}
                        className="rounded"
                        unoptimized
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">#{pokemon.dexNumber.toString().padStart(3, '0')} {pokemon.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{pokemon.type} • {pokemon.rarity}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map Area */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-6 h-[600px] lg:h-[800px] relative overflow-hidden">
              {/* Map Container */}
              <div
                ref={mapRef}
                className="relative w-full h-full bg-gradient-to-br from-blue-900/20 via-green-900/20 to-purple-900/20 rounded-xl overflow-hidden"
                style={{
                  transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                  transition: 'transform 0.3s ease',
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
                </div>

                {/* Pokemon Markers */}
                {filteredPokemon.map((pokemon) => (
                  <motion.div
                    key={pokemon.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: pokemon.id * 0.1 }}
                    className="absolute"
                    style={{
                      left: `${(pokemon.x / 500) * 100}%`,
                      top: `${(pokemon.y / 400) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {viewMode === 'pinpoint' ? (
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedPokemon(pokemon.name)}
                        className={cn(
                          "relative p-2 rounded-full transition-all",
                          "backdrop-blur-sm border-2",
                          selectedPokemon === pokemon.name
                            ? "bg-primary/30 border-primary shadow-lg shadow-primary/50"
                            : "bg-white/20 border-white/30 hover:bg-white/30"
                        )}
                      >
                        <Image
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexNumber}.png`}
                          alt={pokemon.name}
                          width={24}
                          height={24}
                          unoptimized
                        />
                        {selectedPokemon === pokemon.name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                          >
                            {pokemon.name}
                          </motion.div>
                        )}
                      </motion.button>
                    ) : (
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full blur-sm opacity-70",
                          pokemon.type === 'fire' && "bg-red-500",
                          pokemon.type === 'water' && "bg-blue-500",
                          pokemon.type === 'grass' && "bg-green-500",
                          pokemon.type === 'electric' && "bg-yellow-500"
                        )}
                      />
                    )}
                  </motion.div>
                ))}

                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-30">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white" />
                </div>
              </div>

              {/* Map Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Zoom: {(zoom * 100).toFixed(0)}%</span>
                  <span>•</span>
                  <span>Mode: {viewMode}</span>
                </div>
                <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                  {filteredPokemon.length} Pokemon visible
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PremiumMapInterface;