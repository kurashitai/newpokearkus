import json
import os
from typing import List, Dict, Any
from collections import defaultdict
from pokedex_data import POKEDEX_NUMBERS

# Dimensões do mapa
MAPA_WIDTH = 1680
MAPA_HEIGHT = 3815

def get_terrain_type(z: float) -> str:
    """Retorna o tipo de terreno baseado na coordenada Z."""
    if z < 7:
        return "Montanha"
    elif z > 7:
        return "Subsolo"
    else:
        return "Planície"

def is_within_map(x: float, y: float) -> bool:
    """Verifica se as coordenadas estão dentro dos limites do mapa."""
    return 0 <= x <= MAPA_WIDTH and 0 <= y <= MAPA_HEIGHT

def transform_pokemon_data(input_file: str) -> str:
    """
    Transforma dados de Pokémon do formato TXT para o formato TypeScript.
    
    Formato esperado do TXT:
    Pokemon,X,Y,Z
    """
    pokemon_data = defaultdict(lambda: {"locations": [], "count": 0})
    pokemon_sem_dex = set()
    pokemon_fora_mapa = set()
    
    # Lê o arquivo de entrada
    with open(input_file, 'r', encoding='utf-8') as f:
        for line in f:
            # Ignora linhas vazias
            if not line.strip():
                continue
                
            # Tenta dividir por vírgula primeiro, depois por espaço
            parts = [part.strip() for part in line.strip().split(',')]
            if len(parts) != 4:  # Agora esperamos 4 partes
                parts = [part.strip() for part in line.strip().split()]
            
            # Verifica se temos 4 partes (Pokemon, X, Y, Z)
            if len(parts) != 4:
                print(f"Aviso: Linha ignorada (formato inválido): {line.strip()}")
                continue
                
            pokemon, x, y, z = parts
            
            try:
                x = float(x)
                y = float(y)
                z = float(z)
            except ValueError:
                print(f"Aviso: Linha ignorada (coordenadas inválidas): {line.strip()}")
                continue
            
            # Verifica se está dentro dos limites do mapa
            if not is_within_map(x, y):
                pokemon_fora_mapa.add(f"{pokemon} ({x}, {y}, {z})")
                continue
            
            # Registra Pokémon sem número na Pokédex
            if pokemon not in POKEDEX_NUMBERS:
                pokemon_sem_dex.add(pokemon)
            
            terrain = get_terrain_type(z)
            pokemon_data[pokemon]["locations"].append({
                "x": x,
                "y": y,
                "z": z,
                "terrain": terrain
            })
            pokemon_data[pokemon]["count"] += 1
    
    # Imprime os Pokémon que não têm número na Pokédex
    if pokemon_sem_dex:
        print("\nPokémon sem número na Pokédex (serão incluídos com dexNumber: -1):")
        for pokemon in sorted(pokemon_sem_dex):
            print(f"- {pokemon}")
    
    # Imprime os Pokémon que estão fora do mapa
    if pokemon_fora_mapa:
        print("\nPokémon ignorados por estarem fora do mapa:")
        for pokemon in sorted(pokemon_fora_mapa):
            print(f"- {pokemon}")
    
    # Gera o código TypeScript
    typescript_code = []
    
    for pokemon, data in pokemon_data.items():
        locations = data["locations"]
        count = data["count"]
        
        if count > 0:  # Só inclui Pokémon que têm localizações válidas
            avg_loc = calculate_average_location(locations)
            pokemon_obj = {
                "id": pokemon.lower(),
                "dexNumber": POKEDEX_NUMBERS.get(pokemon, -1),  # Usa -1 se não encontrar
                "name": pokemon,
                "samples": count,
                "locations": locations,
                "averageLocation": avg_loc
            }
            
            typescript_code.append(format_pokemon_object(pokemon_obj))
    
    return ",\n\n".join(typescript_code)

def calculate_average_location(locations: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Calcula a localização média de um Pokémon."""
    if not locations:
        return {"x": 0, "y": 0, "z": 0, "terrain": "Planície"}
    
    sum_x = sum(loc["x"] for loc in locations)
    sum_y = sum(loc["y"] for loc in locations)
    sum_z = sum(loc["z"] for loc in locations)
    count = len(locations)
    
    avg_z = sum_z / count
    terrain = get_terrain_type(avg_z)
    
    return {
        "x": round(sum_x / count),
        "y": round(sum_y / count),
        "z": round(avg_z),
        "terrain": terrain
    }

def format_pokemon_object(pokemon_obj: Dict[str, Any]) -> str:
    """Formata um objeto Pokémon como código TypeScript."""
    locations_str = "[\n      " + ",\n      ".join(
        f'{{ x: {loc["x"]}, y: {loc["y"]}, z: {loc["z"]}, terrain: "{loc["terrain"]}" }}'
        for loc in pokemon_obj["locations"]
    ) + "\n    ]"
    
    avg_loc = pokemon_obj["averageLocation"]
    
    return f'''{{
    id: "{pokemon_obj["id"]}",
    dexNumber: {pokemon_obj["dexNumber"]},
    name: "{pokemon_obj["name"]}",
    samples: {pokemon_obj["samples"]},
    locations: {locations_str},
    averageLocation: {{ x: {avg_loc["x"]}, y: {avg_loc["y"]}, z: {avg_loc["z"]}, terrain: "{avg_loc["terrain"]}" }}
}}'''

def main():
    # Procura primeiro por .txt, depois por .csv
    input_files = ["pokemon_data.txt", "pokemon_data.csv"]
    input_file = None
    
    for file in input_files:
        if os.path.exists(file):
            input_file = file
            break
    
    if not input_file:
        print("Erro: Arquivo pokemon_data.txt ou pokemon_data.csv não encontrado!")
        return
    
    try:
        typescript_code = transform_pokemon_data(input_file)
        
        with open("pokemon_data.ts", 'w', encoding='utf-8') as f:
            f.write("// Código gerado automaticamente\n")
            f.write("// Pokémon sem número na Pokédex têm dexNumber = -1\n")
            f.write("// Dimensões do mapa: 1680x3815\n")
            f.write("// Terreno baseado na coordenada Z:\n")
            f.write("// - Z < 7: Montanha\n")
            f.write("// - Z > 7: Subsolo\n")
            f.write("// - Z = 7: Planície\n\n")
            f.write("import { PokemonLocation } from './types';\n\n")
            f.write("export const pokemonLocations: PokemonLocation[] = [\n")
            f.write(typescript_code)
            f.write("\n];")
        
        print(f"\nArquivo pokemon_data.ts gerado com sucesso!")
        
    except Exception as e:
        print(f"Erro ao processar arquivo: {e}")

if __name__ == "__main__":
    main()
