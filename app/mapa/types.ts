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
