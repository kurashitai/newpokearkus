export type TerrainType = 'Montanha' | 'Subsolo' | 'Planície' | string;

export interface Location {
  x: number;
  y: number;
  z: number;
  terrain?: TerrainType;
}

export interface PokemonLocation {
  name: string;
  dexNumber: number;
  samples: number;
  locations: Location[];
  averageLocation: Location;
  id?: string;
}

export interface WikiCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  subcategories: WikiSubcategory[];
  href: string;
}

export interface WikiSubcategory {
  name: string;
  description: string;
  keywords: string;
  href: string;
  icon?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  relevanceScore: number;
}

export interface MapSettings {
  viewMode: 'pinpoint' | 'heatmap';
  selectedPokemon: string | null;
  zoomLevel: number;
  panPosition: { x: number; y: number };
  showTerrain: boolean;
  filterByTerrain: TerrainType | null;
}

export interface ThemeSettings {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  accentColor: string;
}