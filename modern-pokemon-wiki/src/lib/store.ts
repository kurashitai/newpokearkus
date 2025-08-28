import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { PokemonLocation, MapSettings, ThemeSettings, SearchResult } from '@/types';

interface UIState {
  // Navigation state
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  
  // Modal state
  searchModalOpen: boolean;
  settingsModalOpen: boolean;
  
  // Loading states
  isLoading: boolean;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  setSettingsModalOpen: (open: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
}

interface SearchState {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  recentSearches: string[];
  
  // Actions
  setQuery: (query: string) => void;
  setResults: (results: SearchResult[]) => void;
  setIsSearching: (searching: boolean) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

interface MapState extends MapSettings {
  // Additional map state
  isDragging: boolean;
  isZooming: boolean;
  averageLocation: { x: number; y: number; z: number } | null;
  
  // Actions
  setViewMode: (mode: 'pinpoint' | 'heatmap') => void;
  setSelectedPokemon: (pokemon: string | null) => void;
  setZoomLevel: (level: number) => void;
  setPanPosition: (position: { x: number; y: number }) => void;
  setShowTerrain: (show: boolean) => void;
  setFilterByTerrain: (terrain: any) => void;
  setIsDragging: (dragging: boolean) => void;
  setIsZooming: (zooming: boolean) => void;
  setAverageLocation: (location: { x: number; y: number; z: number } | null) => void;
  resetMapSettings: () => void;
}

interface DataState {
  pokemonLocations: PokemonLocation[];
  filteredPokemon: PokemonLocation[];
  
  // Actions
  setPokemonLocations: (locations: PokemonLocation[]) => void;
  setFilteredPokemon: (pokemon: PokemonLocation[]) => void;
  filterPokemonBySearch: (query: string) => void;
}

interface PreferencesState extends ThemeSettings {
  // Additional preferences
  language: 'pt' | 'en';
  animationsEnabled: boolean;
  soundEnabled: boolean;
  
  // Actions
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  setPrimaryColor: (color: string) => void;
  setAccentColor: (color: string) => void;
  setLanguage: (language: 'pt' | 'en') => void;
  setAnimationsEnabled: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
}

// Create individual stores
export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      sidebarOpen: false,
      mobileMenuOpen: false,
      searchModalOpen: false,
      settingsModalOpen: false,
      isLoading: false,
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      setSearchModalOpen: (open) => set({ searchModalOpen: open }),
      setSettingsModalOpen: (open) => set({ settingsModalOpen: open }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
    }),
    { name: 'ui-store' }
  )
);

export const useSearchStore = create<SearchState>()(
  devtools(
    persist(
      (set, get) => ({
        query: '',
        results: [],
        isSearching: false,
        recentSearches: [],
        
        setQuery: (query) => set({ query }),
        setResults: (results) => set({ results }),
        setIsSearching: (searching) => set({ isSearching: searching }),
        addRecentSearch: (query) => {
          const { recentSearches } = get();
          const filtered = recentSearches.filter(search => search !== query);
          const updated = [query, ...filtered].slice(0, 10); // Keep only last 10 searches
          set({ recentSearches: updated });
        },
        clearRecentSearches: () => set({ recentSearches: [] }),
      }),
      {
        name: 'search-store',
        partialize: (state) => ({ recentSearches: state.recentSearches }),
      }
    ),
    { name: 'search-store' }
  )
);

export const useMapStore = create<MapState>()(
  devtools(
    persist(
      (set) => ({
        viewMode: 'pinpoint',
        selectedPokemon: null,
        zoomLevel: 1,
        panPosition: { x: 0, y: 0 },
        showTerrain: true,
        filterByTerrain: null,
        isDragging: false,
        isZooming: false,
        averageLocation: null,
        
        setViewMode: (mode) => set({ viewMode: mode }),
        setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
        setZoomLevel: (level) => set({ zoomLevel: level }),
        setPanPosition: (position) => set({ panPosition: position }),
        setShowTerrain: (show) => set({ showTerrain: show }),
        setFilterByTerrain: (terrain) => set({ filterByTerrain: terrain }),
        setIsDragging: (dragging) => set({ isDragging: dragging }),
        setIsZooming: (zooming) => set({ isZooming: zooming }),
        setAverageLocation: (location) => set({ averageLocation: location }),
        resetMapSettings: () => set({
          viewMode: 'pinpoint',
          selectedPokemon: null,
          zoomLevel: 1,
          panPosition: { x: 0, y: 0 },
          showTerrain: true,
          filterByTerrain: null,
          averageLocation: null,
        }),
      }),
      {
        name: 'map-store',
        partialize: (state) => ({
          viewMode: state.viewMode,
          showTerrain: state.showTerrain,
          filterByTerrain: state.filterByTerrain,
        }),
      }
    ),
    { name: 'map-store' }
  )
);

export const useDataStore = create<DataState>()(
  devtools(
    (set, get) => ({
      pokemonLocations: [],
      filteredPokemon: [],
      
      setPokemonLocations: (locations) => set({ 
        pokemonLocations: locations, 
        filteredPokemon: locations 
      }),
      setFilteredPokemon: (pokemon) => set({ filteredPokemon: pokemon }),
      filterPokemonBySearch: (query) => {
        const { pokemonLocations } = get();
        if (!query.trim()) {
          set({ filteredPokemon: pokemonLocations });
          return;
        }
        
        const filtered = pokemonLocations.filter(pokemon =>
          pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
          pokemon.dexNumber.toString().includes(query)
        );
        
        set({ filteredPokemon: filtered });
      },
    }),
    { name: 'data-store' }
  )
);

export const usePreferencesStore = create<PreferencesState>()(
  devtools(
    persist(
      (set) => ({
        mode: 'system',
        primaryColor: '#3b82f6',
        accentColor: '#8b5cf6',
        language: 'pt',
        animationsEnabled: true,
        soundEnabled: false,
        
        setMode: (mode) => set({ mode }),
        setPrimaryColor: (color) => set({ primaryColor: color }),
        setAccentColor: (color) => set({ accentColor: color }),
        setLanguage: (language) => set({ language }),
        setAnimationsEnabled: (enabled) => set({ animationsEnabled: enabled }),
        setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      }),
      {
        name: 'preferences-store',
      }
    ),
    { name: 'preferences-store' }
  )
);

// Compound store hook for convenience
export const useStore = () => ({
  ui: useUIStore(),
  search: useSearchStore(),
  map: useMapStore(),
  data: useDataStore(),
  preferences: usePreferencesStore(),
});