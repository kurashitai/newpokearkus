import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClanTask {
  taskNumber: number;
  objetivo: string;
  comoConseguir?: string;
}

const seavellTasks: ClanTask[] = [
  {
    taskNumber: 1,
    objetivo: "Coletar:\n- Water Pendant: 100\n- Solid Water Gem: 25",
    comoConseguir: "- Water Pendant: Dropa de Pokemons do tipo Água\n- Solid Water Gem: Dar use em 100 Water Gem"
  },
  {
    taskNumber: 2,
    objetivo: "Coletar:\n- Water Stone: 20\n- Seavel Essence: 15",
    comoConseguir: "- Water Stone: Dropa de Pokemons do tipo Água\n- Seavel Essence: Derrotando Shinys dos elementos do clã"
  },
  {
    taskNumber: 3,
    objetivo: "Coletar:\n- Squirtle Hull: 30\n- Ruby: 30\n- Ice Orb: 30",
    comoConseguir: "- Squirtle Hull: Dropa da linha evolutiva do Blastoise\n- Ruby: Dropa de Tentacool, Tentacruel\n- Ice Orb: Dropa de Pokemons do tipo Gelo"
  },
  {
    taskNumber: 4,
    objetivo: "Entregar o pokemon: Starmie"
  },
  {
    taskNumber: 5,
    objetivo: "Coletar:\n- Seavel Essence: 30\n- Seavel Fragment: 5\n- Water Stone: 25",
    comoConseguir: "- Seavel Essence: Derrotando Shinys dos elementos do clã\n- Seavel Fragment: Derrotando Shinys dos elementos do clã\n- Water Stone: Dropa de Pokemons do tipo Água"
  },
  {
    taskNumber: 6,
    objetivo: "Capturar o Pokémon: Feraligatr"
  },
  {
    taskNumber: 7,
    objetivo: "Derrotar Pokemons: 500 Piloswine"
  },
  {
    taskNumber: 8,
    objetivo: "Coletar:\n- Water Stone: 250",
    comoConseguir: "- Water Stone: Dropa de Pokemons do tipo Água"
  },
  {
    taskNumber: 9,
    objetivo: "Derrotar Pokemons: 500 Swampert"
  },
  {
    taskNumber: 10,
    objetivo: "Coletar:\n- Shiny Seavel Stone: 2",
    comoConseguir: "- Shiny Seavel Stone: Utilizando 3 Fragmentos + 30 Essências + 10 Stones + 250k pra craftar na Professora em Pallet"
  },
  {
    taskNumber: 11,
    objetivo: "Capturar o Pokémon: Walrein"
  },
  {
    taskNumber: 12,
    objetivo: "Entregar o pokemon: Walrein"
  },
  {
    taskNumber: 13,
    objetivo: "Derrotar Pokemons: 500 Whiscash"
  },
  {
    taskNumber: 14,
    objetivo: "Derrotar Pokemons: 500 Milotic"
  },
  {
    taskNumber: 15,
    objetivo: "Coletar:\n- Prism Scalle: 1",
    comoConseguir: "- Prism Scalle: Dropa de Milotic"
  },
  {
    taskNumber: 16,
    objetivo: "Coletar:\n- Solid Water Gem: 1000",
    comoConseguir: "- Solid Water Gem: Dar use em 100 Water Gem"
  },
  {
    taskNumber: 17,
    objetivo: "Capturar o Pokémon: Wailord"
  },
  {
    taskNumber: 18,
    objetivo: "Entregar o pokemon: Wailord"
  },
  {
    taskNumber: 19,
    objetivo: "Derrotar Pokemons: 8000 Outland Ludicolo"
  },
  {
    taskNumber: 20,
    objetivo: "Coletar:\n- Seavell Gem: 2000",
    comoConseguir: "- Seavell Gem: Dropa de Pokemons do Elemento do Clã na Outland"
  },
  {
    taskNumber: 21,
    objetivo: "Derrotar Pokemons: 2000 Empoleon"
  },
  {
    taskNumber: 22,
    objetivo: "Capturar o Pokémon: Empoleon"
  },
  {
    taskNumber: 23,
    objetivo: "Coletar:\n- Cristal de Sacrificio (Aqua): 500",
    comoConseguir: "- Cristal de Sacrificio (Aqua): Dropa na Relíquia do Araquanid"
  }
];

export function SeavellClanTable() {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4 text-center">Rank 1</h2>
      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]"><b>Task</b></TableHead>
            <TableHead className="w-[45%]"><b>Objetivo</b></TableHead>
            <TableHead className="w-[45%]"><b>Como conseguir</b></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seavellTasks.slice(0, 4).map((task, index) => (
            <TableRow key={index}>
              <TableCell>Task {task.taskNumber}</TableCell>
              <TableCell className="whitespace-pre-line">{task.objetivo}</TableCell>
              <TableCell className="whitespace-pre-line">{task.comoConseguir || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="text-lg font-semibold mb-4 text-center">Rank 2</h2>
      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]"><b>Task</b></TableHead>
            <TableHead className="w-[45%]"><b>Objetivo</b></TableHead>
            <TableHead className="w-[45%]"><b>Como conseguir</b></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seavellTasks.slice(4, 9).map((task, index) => (
            <TableRow key={index}>
              <TableCell>Task {task.taskNumber}</TableCell>
              <TableCell className="whitespace-pre-line">{task.objetivo}</TableCell>
              <TableCell className="whitespace-pre-line">{task.comoConseguir || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="text-lg font-semibold mb-4 text-center">Rank 3</h2>
      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]"><b>Task</b></TableHead>
            <TableHead className="w-[45%]"><b>Objetivo</b></TableHead>
            <TableHead className="w-[45%]"><b>Como conseguir</b></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seavellTasks.slice(9, 15).map((task, index) => (
            <TableRow key={index}>
              <TableCell>Task {task.taskNumber}</TableCell>
              <TableCell className="whitespace-pre-line">{task.objetivo}</TableCell>
              <TableCell className="whitespace-pre-line">{task.comoConseguir || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="text-lg font-semibold mb-4 text-center">Rank 4</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]"><b>Task</b></TableHead>
            <TableHead className="w-[45%]"><b>Objetivo</b></TableHead>
            <TableHead className="w-[45%]"><b>Como conseguir</b></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seavellTasks.slice(15).map((task, index) => (
            <TableRow key={index}>
              <TableCell>Task {task.taskNumber}</TableCell>
              <TableCell className="whitespace-pre-line">{task.objetivo}</TableCell>
              <TableCell className="whitespace-pre-line">{task.comoConseguir || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="text-lg font-semibold mb-4 text-center mt-8">Rank 5 - Completo</h2>
    </div>
  );
}
