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

const psycraftTasks: ClanTask[] = [
  {
    taskNumber: 1,
    objetivo: "Coletar:\n- Psychic Spoon: 100\n- Big Enchanted Gem: 25",
    comoConseguir: "- Psychic Spoon: Dropa do Alakazam\n- Big Enchanted Gem: Dar use em 100 Enchanted Gem"
  },
  {
    taskNumber: 2,
    objetivo: "Coletar:\n- Enigma Stone: 20\n- Psycraft Essence: 15",
    comoConseguir: "- Enigma Stone: Dropa de Pokemons do tipo Psíquico\n- Psycraft Essence: Derrotando Shinys dos elementos do clã"
  },
  {
    taskNumber: 3,
    objetivo: "Coletar:\n- Slow Tail: 30\n- Mimic Clothes: 30",
    comoConseguir: "- Slow Tail: Dropa dos Slowpoke e Slowbro\n- Mimic Clothes: Dropa do Mr Mime"
  },
  {
    taskNumber: 4,
    objetivo: "Entregar o pokemon: Alakazam"
  },
  {
    taskNumber: 5,
    objetivo: "Coletar:\n- Psycraft Essence: 30\n- Psycraft Fragment: 5\n- Enigma Stone: 25",
    comoConseguir: "- Psycraft Essence: Derrotando Shinys dos elementos do clã\n- Psycraft Fragment: Derrotando Shinys dos elementos do clã\n- Enigma Stone: Dropa de Pokemons do tipo Psíquico"
  },
  {
    taskNumber: 6,
    objetivo: "Capturar o Pokémon: Espeon"
  },
  {
    taskNumber: 7,
    objetivo: "Derrotar Pokemons: 500 Girafarig"
  },
  {
    taskNumber: 8,
    objetivo: "Coletar:\n- Enigma Stone: 250",
    comoConseguir: "- Enigma Stone: Dropa de Pokemons do tipo Psíquico"
  },
  {
    taskNumber: 9,
    objetivo: "Derrotar Pokemons: 500 Clefable"
  },
  {
    taskNumber: 10,
    objetivo: "Coletar:\n- Shiny Psycraft Stone: 2",
    comoConseguir: "- Shiny Psycraft Stone: Utilizando 3 Fragmentos + 30 Essências + 10 Stones + 250k pra craftar na Professora em Pallet"
  },
  {
    taskNumber: 11,
    objetivo: "Capturar o Pokémon: Mr. Mime"
  },
  {
    taskNumber: 12,
    objetivo: "Entregar o pokemon: Mr. Mime"
  },
  {
    taskNumber: 13,
    objetivo: "Derrotar Pokemons: 500 Wobbuffet"
  },
  {
    taskNumber: 14,
    objetivo: "Derrotar Pokemons: 500 Togekiss"
  },
  {
    taskNumber: 15,
    objetivo: "Coletar:\n- Magestic Plume: 1",
    comoConseguir: "- Magestic Plume: Dropa de Togekiss"
  },
  {
    taskNumber: 16,
    objetivo: "Coletar:\n- Big Enchanted Gem: 1000",
    comoConseguir: "- Big Enchanted Gem: Dar use em 100 Enchanted Gem"
  },
  {
    taskNumber: 17,
    objetivo: "Capturar o Pokémon: Grumpig"
  },
  {
    taskNumber: 18,
    objetivo: "Entregar o pokemon: Grumpig"
  },
  {
    taskNumber: 19,
    objetivo: "Derrotar Pokemons: 8000 Outland Grumpig"
  },
  {
    taskNumber: 20,
    objetivo: "Coletar:\n- Psycraft Gem: 2000",
    comoConseguir: "- Psycraft Gem: Dropa de Pokemons do Elemento do Clã na Outland"
  },
  {
    taskNumber: 21,
    objetivo: "Derrotar Pokemons: 2000 Gallade"
  },
  {
    taskNumber: 22,
    objetivo: "Capturar o Pokémon: Gallade"
  },
  {
    taskNumber: 23,
    objetivo: "Coletar:\n- Cristal de Sacrificio (Paixon): 500",
    comoConseguir: "- Cristal de Sacrificio (Paixon): Dropa na Relíquia do Florges"
  }
];

export function PsycraftClanTable() {
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
          {psycraftTasks.slice(0, 4).map((task, index) => (
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
          {psycraftTasks.slice(4, 9).map((task, index) => (
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
          {psycraftTasks.slice(9, 15).map((task, index) => (
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
          {psycraftTasks.slice(15).map((task, index) => (
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
