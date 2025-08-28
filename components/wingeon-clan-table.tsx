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

const wingeonTasks: ClanTask[] = [
  {
    taskNumber: 1,
    objetivo: "Coletar:\n- Colored Feather: 100\n- Compressed Straw: 25",
    comoConseguir: "- Colored Feather: Dropa da linha evolutiva do Pidgeot\n- Compressed Straw: Dar use em 100 Straw"
  },
  {
    taskNumber: 2,
    objetivo: "Coletar:\n- Feather Stone: 20\n- Wingeon Essence: 15",
    comoConseguir: "- Feather Stone: Dropa de Pokemons do tipo Voador\n- Wingeon Essence: Derrotando Shinys dos elementos do clã"
  },
  {
    taskNumber: 3,
    objetivo: "Coletar:\n- Farfetchd Stick: 30\n- Bird Beak: 30",
    comoConseguir: "- Farfetchd Stick: Dropa do Farfetchd\n- Bird Beak: Dropa de Pokemons do tipo Voador"
  },
  {
    taskNumber: 4,
    objetivo: "Entregar o pokemon: Dragonite"
  },
  {
    taskNumber: 5,
    objetivo: "Coletar:\n- Wingeon Essence: 30\n- Wingeon Fragment: 5\n- Feather Stone: 25",
    comoConseguir: "- Wingeon Essence: Derrotando Shinys dos elementos do clã\n- Wingeon Fragment: Derrotando Shinys dos elementos do clã\n- Feather Stone: Dropa de Pokemons do tipo Voador"
  },
  {
    taskNumber: 6,
    objetivo: "Capturar o Pokémon: Noctowl"
  },
  {
    taskNumber: 7,
    objetivo: "Derrotar Pokemons: 500 Togetic"
  },
  {
    taskNumber: 8,
    objetivo: "Coletar:\n- Feather Stone: 250",
    comoConseguir: "- Feather Stone: Dropa de Pokemons do tipo Voador"
  },
  {
    taskNumber: 9,
    objetivo: "Derrotar Pokemons: 500 Swellow"
  },
  {
    taskNumber: 10,
    objetivo: "Coletar:\n- Shiny Wingeon Stone: 2",
    comoConseguir: "- Shiny Wingeon Stone: Utilizando 3 Fragmentos + 30 Essências + 10 Stones + 250k pra craftar na Professora em Pallet"
  },
  {
    taskNumber: 11,
    objetivo: "Capturar o Pokémon: Farfetchd"
  },
  {
    taskNumber: 12,
    objetivo: "Entregar o pokemon: Farfetchd"
  },
  {
    taskNumber: 13,
    objetivo: "Derrotar Pokemons: 500 Tropius"
  },
  {
    taskNumber: 14,
    objetivo: "Derrotar Pokemons: 500 Salamence"
  },
  {
    taskNumber: 15,
    objetivo: "Coletar:\n- Bloody Wings: 1",
    comoConseguir: "- Bloody Wings: Dropa de Salamence"
  },
  {
    taskNumber: 16,
    objetivo: "Coletar:\n- Compressed Straw: 1000",
    comoConseguir: "- Compressed Straw: Dar use em 100 Straw"
  },
  {
    taskNumber: 17,
    objetivo: "Capturar o Pokémon: Pelipper"
  },
  {
    taskNumber: 18,
    objetivo: "Entregar o pokemon: Pelipper"
  },
  {
    taskNumber: 19,
    objetivo: "Derrotar Pokemons: 8000 Outland Tropius"
  },
  {
    taskNumber: 20,
    objetivo: "Coletar:\n- Wingeon Gem: 2000",
    comoConseguir: "- Wingeon Gem: Dropa de Pokemons do Elemento do Clã na Outland"
  },
  {
    taskNumber: 21,
    objetivo: "Derrotar Pokemons: 2000 Staraptor"
  },
  {
    taskNumber: 22,
    objetivo: "Capturar o Pokémon: Staraptor"
  },
  {
    taskNumber: 23,
    objetivo: "Coletar:\n- Cristal de Sacrificio (Draka): 500",
    comoConseguir: "- Cristal de Sacrificio (Draka): Dropa na Relíquia do Drampa"
  }
];

export function WingeonClanTable() {
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
          {wingeonTasks.slice(0, 4).map((task, index) => (
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
          {wingeonTasks.slice(4, 9).map((task, index) => (
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
          {wingeonTasks.slice(9, 15).map((task, index) => (
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
          {wingeonTasks.slice(15).map((task, index) => (
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
