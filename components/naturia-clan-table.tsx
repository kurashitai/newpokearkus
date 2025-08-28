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

const naturiaTasks: ClanTask[] = [
  {
    taskNumber: 1,
    objetivo: "Coletar:\n- Pot of Moss Bug: 100\n- Pile of Seeds: 25",
    comoConseguir: "- Pot of Moss Bug: Dropa de Pokemons do tipo Inseto\n- Pile of Seeds: Dar use em 100 Seed"
  },
  {
    taskNumber: 2,
    objetivo: "Coletar:\n- Leaf Stone: 20\n- Naturia Essence: 15",
    comoConseguir: "- Leaf Stone: Dropa de Pokemons do tipo Planta\n- Naturia Essence: Derrotando Shinys dos elementos do clã"
  },
  {
    taskNumber: 3,
    objetivo: "Coletar:\n- Bag of Pollem: 30\n- Bug Antena: 30\n- Mushroom: 30",
    comoConseguir: "- Bag of Pollem: Dropa de Pokemons do tipo Planta\n- Bug Antena: Dropa de Venonat e Venomoth\n- Mushroom: Dropa de Paras e Parasect"
  },
  {
    taskNumber: 4,
    objetivo: "Entregar o pokemon: Victreebel"
  },
  {
    taskNumber: 5,
    objetivo: "Coletar:\n- Naturia Essence: 30\n- Naturia Fragment: 5\n- Leaf Stone: 25",
    comoConseguir: "- Naturia Essence: Derrotando Shinys dos elementos do clã\n- Naturia Fragment: Derrotando Shinys dos elementos do clã\n- Leaf Stone: Dropa de Pokemons do tipo Planta"
  },
  {
    taskNumber: 6,
    objetivo: "Capturar o Pokémon: Meganio"
  },
  {
    taskNumber: 7,
    objetivo: "Derrotar Pokemons: 500 Ariados"
  },
  {
    taskNumber: 8,
    objetivo: "Coletar:\n- Leaf Stone: 250",
    comoConseguir: "- Leaf Stone: Dropa de Pokemons do tipo Planta"
  },
  {
    taskNumber: 9,
    objetivo: "Derrotar Pokemons: 500 Sceptile"
  },
  {
    taskNumber: 10,
    objetivo: "Coletar:\n- Shiny Naturia Stone: 2",
    comoConseguir: "- Shiny Naturia Stone: Utilizando 3 Fragmentos + 30 Essências + 10 Stones + 250k pra craftar na Professora em Pallet"
  },
  {
    taskNumber: 11,
    objetivo: "Capturar o Pokémon: Beautifly"
  },
  {
    taskNumber: 12,
    objetivo: "Entregar o pokemon: Beautifly"
  },
  {
    taskNumber: 13,
    objetivo: "Derrotar Pokemons: 500 Ludicolo"
  },
  {
    taskNumber: 14,
    objetivo: "Derrotar Pokemons: 500 Tangrowth"
  },
  {
    taskNumber: 15,
    objetivo: "Coletar:\n- Giant Vinnes: 1",
    comoConseguir: "- Giant Vinnes: Dropa de Tangrowth"
  },
  {
    taskNumber: 16,
    objetivo: "Coletar:\n- Pile of Seeds: 1000",
    comoConseguir: "- Pile of Seeds: Dar use em 100 Seed"
  },
  {
    taskNumber: 17,
    objetivo: "Capturar o Pokémon: Breloom"
  },
  {
    taskNumber: 18,
    objetivo: "Entregar o pokemon: Breloom"
  },
  {
    taskNumber: 19,
    objetivo: "Derrotar Pokemons: 8000 Outland Cacturne"
  },
  {
    taskNumber: 20,
    objetivo: "Coletar:\n- Naturia Gem: 2000",
    comoConseguir: "- Naturia Gem: Dropa de Pokemons do Elemento do Clã na Outland"
  },
  {
    taskNumber: 21,
    objetivo: "Derrotar Pokemons: 2000 Torterra"
  },
  {
    taskNumber: 22,
    objetivo: "Capturar o Pokémon: Torterra"
  },
  {
    taskNumber: 23,
    objetivo: "Coletar:\n- Cristal de Sacrificio (Nature): 500",
    comoConseguir: "- Cristal de Sacrificio (Nature): Dropa na Relíquia do Lurantis"
  }
];

export function NaturiaClanTable() {
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
          {naturiaTasks.slice(0, 4).map((task, index) => (
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
          {naturiaTasks.slice(4, 9).map((task, index) => (
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
          {naturiaTasks.slice(9, 15).map((task, index) => (
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
          {naturiaTasks.slice(15).map((task, index) => (
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
