import type { PokemonLocation, Location } from '@/types';

// Map dimensions
export const MAP_WIDTH = 1680;
export const MAP_HEIGHT = 3815;

// Função auxiliar para calcular a média das localizações
function calculateAverageLocation(locations: Location[]): Location {
  const sum = locations.reduce(
    (acc, loc) => ({
      x: acc.x + loc.x,
      y: acc.y + loc.y,
      z: acc.z + loc.z,
    }),
    { x: 0, y: 0, z: 0 }
  );

  return {
    x: Math.round(sum.x / locations.length),
    y: Math.round(sum.y / locations.length),
    z: Math.round(sum.z / locations.length),
  };
}

// Sample Pokemon data - will be replaced with full data
export const pokemonLocations: PokemonLocation[] = [
  {
    id: "pikachu",
    dexNumber: 25,
    name: "Pikachu",
    samples: 50,
    locations: [
      { x: 840.0, y: 1000.0, z: 7.0 },
      { x: 845.0, y: 1005.0, z: 7.0 },
      { x: 850.0, y: 1010.0, z: 7.0 },
      { x: 855.0, y: 1015.0, z: 7.0 },
      { x: 860.0, y: 1020.0, z: 7.0 },
      { x: 865.0, y: 1025.0, z: 7.0 },
      { x: 870.0, y: 1030.0, z: 7.0 },
      { x: 875.0, y: 1035.0, z: 7.0 },
      { x: 880.0, y: 1040.0, z: 7.0 },
      { x: 885.0, y: 1045.0, z: 7.0 },
    ],
    averageLocation: { x: 862, y: 1022, z: 7 }
  },
  {
    id: "charizard",
    dexNumber: 6,
    name: "Charizard",
    samples: 30,
    locations: [
      { x: 1200.0, y: 800.0, z: 7.0 },
      { x: 1205.0, y: 805.0, z: 7.0 },
      { x: 1210.0, y: 810.0, z: 7.0 },
      { x: 1215.0, y: 815.0, z: 7.0 },
      { x: 1220.0, y: 820.0, z: 7.0 },
      { x: 1225.0, y: 825.0, z: 7.0 },
      { x: 1230.0, y: 830.0, z: 7.0 },
      { x: 1235.0, y: 835.0, z: 7.0 },
    ],
    averageLocation: { x: 1217, y: 817, z: 7 }
  },
  {
    id: "blastoise",
    dexNumber: 9,
    name: "Blastoise",
    samples: 25,
    locations: [
      { x: 600.0, y: 1500.0, z: 7.0 },
      { x: 605.0, y: 1505.0, z: 7.0 },
      { x: 610.0, y: 1510.0, z: 7.0 },
      { x: 615.0, y: 1515.0, z: 7.0 },
      { x: 620.0, y: 1520.0, z: 7.0 },
      { x: 625.0, y: 1525.0, z: 7.0 },
    ],
    averageLocation: { x: 612, y: 1512, z: 7 }
  },
  {
    id: "venusaur",
    dexNumber: 3,
    name: "Venusaur",
    samples: 35,
    locations: [
      { x: 1000.0, y: 2000.0, z: 7.0 },
      { x: 1005.0, y: 2005.0, z: 7.0 },
      { x: 1010.0, y: 2010.0, z: 7.0 },
      { x: 1015.0, y: 2015.0, z: 7.0 },
      { x: 1020.0, y: 2020.0, z: 7.0 },
      { x: 1025.0, y: 2025.0, z: 7.0 },
      { x: 1030.0, y: 2030.0, z: 7.0 },
    ],
    averageLocation: { x: 1015, y: 2015, z: 7 }
  }
];

// Calculate average locations
pokemonLocations.forEach(pokemon => {
  pokemon.averageLocation = calculateAverageLocation(pokemon.locations);
});

// Export filtered and sorted Pokemon data
export const validPokemonLocations = pokemonLocations
  .filter(pokemon => pokemon.locations.length > 0)
  .sort((a, b) => a.dexNumber - b.dexNumber);