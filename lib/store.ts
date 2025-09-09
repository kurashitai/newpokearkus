import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

// Types for our premium app state
export interface AppState {
  // UI State
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  isLoading: boolean
  
  // Search State
  searchQuery: string
  searchResults: any[]
  searchHistory: string[]
  
  // Map State
  selectedPokemon: string | null
  mapViewMode: 'pinpoint' | 'heatmap'
  mapZoom: number
  mapCenter: { lat: number; lng: number }
  
  // User Preferences
  animationsEnabled: boolean
  soundEnabled: boolean
  language: 'en' | 'pt' | 'es'
  
  // Navigation State
  currentRoute: string
  navigationHistory: string[]
  
  // Premium Features
  premiumMode: boolean
  stackScrollerEnabled: boolean
  glassEffectsEnabled: boolean
}

export interface AppActions {
  // UI Actions
  setTheme: (theme: AppState['theme']) => void
  toggleSidebar: () => void
  toggleMobileMenu: () => void
  setLoading: (loading: boolean) => void
  
  // Search Actions
  setSearchQuery: (query: string) => void
  setSearchResults: (results: any[]) => void
  addToSearchHistory: (query: string) => void
  clearSearchHistory: () => void
  
  // Map Actions
  setSelectedPokemon: (pokemon: string | null) => void
  setMapViewMode: (mode: AppState['mapViewMode']) => void
  setMapZoom: (zoom: number) => void
  setMapCenter: (center: { lat: number; lng: number }) => void
  
  // User Preferences Actions
  setAnimationsEnabled: (enabled: boolean) => void
  setSoundEnabled: (enabled: boolean) => void
  setLanguage: (language: AppState['language']) => void
  
  // Navigation Actions
  setCurrentRoute: (route: string) => void
  addToNavigationHistory: (route: string) => void
  
  // Premium Features Actions
  setPremiumMode: (enabled: boolean) => void
  setStackScrollerEnabled: (enabled: boolean) => void
  setGlassEffectsEnabled: (enabled: boolean) => void
  
  // Reset Actions
  resetSearchState: () => void
  resetMapState: () => void
  resetAppState: () => void
}

type AppStore = AppState & AppActions

// Initial state
const initialState: AppState = {
  // UI State
  theme: 'system',
  sidebarOpen: false,
  mobileMenuOpen: false,
  isLoading: false,
  
  // Search State
  searchQuery: '',
  searchResults: [],
  searchHistory: [],
  
  // Map State
  selectedPokemon: null,
  mapViewMode: 'pinpoint',
  mapZoom: 10,
  mapCenter: { lat: 0, lng: 0 },
  
  // User Preferences
  animationsEnabled: true,
  soundEnabled: true,
  language: 'en',
  
  // Navigation State
  currentRoute: '/',
  navigationHistory: ['/'],
  
  // Premium Features
  premiumMode: true,
  stackScrollerEnabled: true,
  glassEffectsEnabled: true,
}

// Create the store with subscribeWithSelector middleware for reactive state
export const useAppStore = create<AppStore>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    
    // UI Actions
    setTheme: (theme) => {
      set({ theme })
      // Persist theme to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('poke-arkus-theme', theme)
      }
    },
    
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    
    toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
    
    setLoading: (isLoading) => set({ isLoading }),
    
    // Search Actions
    setSearchQuery: (searchQuery) => set({ searchQuery }),
    
    setSearchResults: (searchResults) => set({ searchResults }),
    
    addToSearchHistory: (query) => {
      const { searchHistory } = get()
      if (query.trim() && !searchHistory.includes(query)) {
        const newHistory = [query, ...searchHistory.slice(0, 9)] // Keep last 10 searches
        set({ searchHistory: newHistory })
        
        // Persist to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('poke-arkus-search-history', JSON.stringify(newHistory))
        }
      }
    },
    
    clearSearchHistory: () => {
      set({ searchHistory: [] })
      if (typeof window !== 'undefined') {
        localStorage.removeItem('poke-arkus-search-history')
      }
    },
    
    // Map Actions
    setSelectedPokemon: (selectedPokemon) => set({ selectedPokemon }),
    
    setMapViewMode: (mapViewMode) => set({ mapViewMode }),
    
    setMapZoom: (mapZoom) => set({ mapZoom }),
    
    setMapCenter: (mapCenter) => set({ mapCenter }),
    
    // User Preferences Actions
    setAnimationsEnabled: (animationsEnabled) => {
      set({ animationsEnabled })
      if (typeof window !== 'undefined') {
        localStorage.setItem('poke-arkus-animations', String(animationsEnabled))
        // Apply CSS class for reduced motion
        document.documentElement.classList.toggle('reduce-motion', !animationsEnabled)
      }
    },
    
    setSoundEnabled: (soundEnabled) => {
      set({ soundEnabled })
      if (typeof window !== 'undefined') {
        localStorage.setItem('poke-arkus-sound', String(soundEnabled))
      }
    },
    
    setLanguage: (language) => {
      set({ language })
      if (typeof window !== 'undefined') {
        localStorage.setItem('poke-arkus-language', language)
      }
    },
    
    // Navigation Actions
    setCurrentRoute: (currentRoute) => set({ currentRoute }),
    
    addToNavigationHistory: (route) => {
      const { navigationHistory } = get()
      const newHistory = [route, ...navigationHistory.slice(0, 19)] // Keep last 20 routes
      set({ navigationHistory: newHistory })
    },
    
    // Premium Features Actions
    setPremiumMode: (premiumMode) => set({ premiumMode }),
    
    setStackScrollerEnabled: (stackScrollerEnabled) => set({ stackScrollerEnabled }),
    
    setGlassEffectsEnabled: (glassEffectsEnabled) => {
      set({ glassEffectsEnabled })
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('disable-glass', !glassEffectsEnabled)
      }
    },
    
    // Reset Actions
    resetSearchState: () => set({
      searchQuery: '',
      searchResults: [],
    }),
    
    resetMapState: () => set({
      selectedPokemon: null,
      mapViewMode: 'pinpoint',
      mapZoom: 10,
      mapCenter: { lat: 0, lng: 0 },
    }),
    
    resetAppState: () => set(initialState),
  }))
)

// Selector hooks for optimized re-renders - using stable selectors to prevent infinite loops
export const useTheme = () => useAppStore((state) => state.theme)

// Sidebar selectors - separate to avoid creating new objects
export const useSidebarOpen = () => useAppStore((state) => state.sidebarOpen)
export const useSidebarToggle = () => useAppStore((state) => state.toggleSidebar)

// Mobile menu selectors - separate to avoid creating new objects
export const useMobileMenuOpen = () => useAppStore((state) => state.mobileMenuOpen)
export const useMobileMenuToggle = () => useAppStore((state) => state.toggleMobileMenu)

// Search selectors - separate to avoid creating new objects
export const useSearchQuery = () => useAppStore((state) => state.searchQuery)
export const useSearchResults = () => useAppStore((state) => state.searchResults)
export const useSearchHistory = () => useAppStore((state) => state.searchHistory)
export const useSetSearchQuery = () => useAppStore((state) => state.setSearchQuery)
export const useSetSearchResults = () => useAppStore((state) => state.setSearchResults)
export const useAddToSearchHistory = () => useAppStore((state) => state.addToSearchHistory)
export const useClearSearchHistory = () => useAppStore((state) => state.clearSearchHistory)

// Map selectors - separate to avoid creating new objects
export const useSelectedPokemon = () => useAppStore((state) => state.selectedPokemon)
export const useMapViewMode = () => useAppStore((state) => state.mapViewMode)
export const useMapZoom = () => useAppStore((state) => state.mapZoom)
export const useMapCenter = () => useAppStore((state) => state.mapCenter)
export const useSetSelectedPokemon = () => useAppStore((state) => state.setSelectedPokemon)
export const useSetMapViewMode = () => useAppStore((state) => state.setMapViewMode)
export const useSetMapZoom = () => useAppStore((state) => state.setMapZoom)
export const useSetMapCenter = () => useAppStore((state) => state.setMapCenter)

// Preferences selectors - separate to avoid creating new objects
export const useAnimationsEnabled = () => useAppStore((state) => state.animationsEnabled)
export const useSoundEnabled = () => useAppStore((state) => state.soundEnabled)
export const useLanguage = () => useAppStore((state) => state.language)
export const useSetAnimationsEnabled = () => useAppStore((state) => state.setAnimationsEnabled)
export const useSetSoundEnabled = () => useAppStore((state) => state.setSoundEnabled)
export const useSetLanguage = () => useAppStore((state) => state.setLanguage)

// Legacy composite selectors - kept for backward compatibility but use stable references
// These should be replaced with individual selectors above
export const useSidebar = () => {
  const isOpen = useSidebarOpen()
  const toggle = useSidebarToggle()
  return { isOpen, toggle }
}

export const useMobileMenu = () => {
  const isOpen = useMobileMenuOpen()
  const toggle = useMobileMenuToggle()
  return { isOpen, toggle }
}

export const useSearch = () => {
  const query = useSearchQuery()
  const results = useSearchResults()
  const history = useSearchHistory()
  const setQuery = useSetSearchQuery()
  const setResults = useSetSearchResults()
  const addToHistory = useAddToSearchHistory()
  const clearHistory = useClearSearchHistory()
  return { query, results, history, setQuery, setResults, addToHistory, clearHistory }
}

export const useMap = () => {
  const selectedPokemon = useSelectedPokemon()
  const viewMode = useMapViewMode()
  const zoom = useMapZoom()
  const center = useMapCenter()
  const setSelectedPokemon = useSetSelectedPokemon()
  const setViewMode = useSetMapViewMode()
  const setZoom = useSetMapZoom()
  const setCenter = useSetMapCenter()
  return { selectedPokemon, viewMode, zoom, center, setSelectedPokemon, setViewMode, setZoom, setCenter }
}

export const usePreferences = () => {
  const animationsEnabled = useAnimationsEnabled()
  const soundEnabled = useSoundEnabled()
  const language = useLanguage()
  const setAnimationsEnabled = useSetAnimationsEnabled()
  const setSoundEnabled = useSetSoundEnabled()
  const setLanguage = useSetLanguage()
  return { animationsEnabled, soundEnabled, language, setAnimationsEnabled, setSoundEnabled, setLanguage }
}

// Initialize store from localStorage on client side
export const initializeStore = () => {
  if (typeof window === 'undefined') return
  
  try {
    const savedTheme = localStorage.getItem('poke-arkus-theme') as AppState['theme']
    const savedAnimations = localStorage.getItem('poke-arkus-animations')
    const savedSound = localStorage.getItem('poke-arkus-sound')
    const savedLanguage = localStorage.getItem('poke-arkus-language') as AppState['language']
    const savedSearchHistory = localStorage.getItem('poke-arkus-search-history')
    
    if (savedTheme) useAppStore.getState().setTheme(savedTheme)
    if (savedAnimations !== null) useAppStore.getState().setAnimationsEnabled(savedAnimations === 'true')
    if (savedSound !== null) useAppStore.getState().setSoundEnabled(savedSound === 'true')
    if (savedLanguage) useAppStore.getState().setLanguage(savedLanguage)
    if (savedSearchHistory) {
      const history = JSON.parse(savedSearchHistory)
      useAppStore.setState({ searchHistory: history })
    }
  } catch (error) {
    console.warn('Failed to load saved preferences:', error)
  }
}

// Subscribe to state changes for analytics or debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  useAppStore.subscribe(
    (state) => state,
    (state) => {
      console.log('App State Changed:', state)
    }
  )
}