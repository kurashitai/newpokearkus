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

const raiboltTasks: ClanTask[] = [
  {
    taskNumber: 1,
    objetivo: "Coletar:\n- Electric Box: 100\n- Electric Sphere: 25",
    comoConseguir: "- Electric Box: Dropa de Pokemons do tipo Elétrico\n- Electric Sphere: Dar use em 100 Screw"
  },
  {
    taskNumber: 2,
    objetivo: "Coletar:\n- Thunder Stone: 20\n- Raibolt Essence: 15",
    comoConseguir: "- Thunder Stone: Dropa de Pokemons do tipo Elétrico\n- Raibolt Essence: Derrotando Shinys dos elementos do clã"
  },
  {
    taskNumber: 3,
    objetivo: "Coletar:\n- Electric Rat Tail: 30\n- Electric Tail: 30",
    comoConseguir: "- Electric Rat Tail: Dropa de Pokemons da linha evolutiva do Pikachu\n- Electric Tail: Dropa de Electabuzz"
  },
  {
    taskNumber: 4,
    objetivo: "Entregar o pokemon: Jolteon"
  },
  {
    taskNumber: 5,
    objetivo: "Coletar:\n- Raibolt Essence: 30\n- Raibolt Fragment: 5\n- Thunder Stone: 25",
    comoConseguir: "- Raibolt Essence: Derrotando Shinys dos elementos do clã\n- Raibolt Fragment: Derrotando Shinys dos elementos do clã\n- Thunder Stone: Dropa de Pokemons do tipo Elétrico"
  },
  {
    taskNumber: 6,
    objetivo: "Capturar o Pokémon: Electabuzz"
  },
  {
    taskNumber: 7,
    objetivo: "Derrotar Pokemons: 500 Electrode"
  },
  {
    taskNumber: 8,
    objetivo: "Coletar:\n- Thunder Stone: 250",
    comoConseguir: "- Thunder Stone: Dropa de Pokemons do tipo Elétrico"
  },
  {
    taskNumber: 9,
    objetivo: "Derrotar Pokemons: 500 Ampharos"
  },
  {
    taskNumber: 10,
    objetivo: "Coletar:\n- Shiny Raibolt Stone: 2",
    comoConseguir: "- Shiny Raibolt Stone: Utilizando 3 Fragmentos + 30 Essências + 10 Stones + 250k pra craftar na Professora em Pallet"
  },
  {
    taskNumber: 11,
    objetivo: "Capturar o Pokémon: Lanturn"
  },
  {
    taskNumber: 12,
    objetivo: "Entregar o pokemon: Lanturn"
  },
  {
    taskNumber: 13,
    objetivo: "Derrotar Pokemons: 500 Minun"
  },
  {
    taskNumber: 14,
    objetivo: "Derrotar Pokemons: 500 Electivire"
  },
  {
    taskNumber: 15,
    objetivo: "Coletar:\n- Electric Paw: 1",
    comoConseguir: "- Electric Paw: Dropa de Electivire"
  },
  {
    taskNumber: 16,
    objetivo: "Coletar:\n- Electric Sphere: 1000",
    comoConseguir: "- Electric Sphere: Dar use em 100 Screw"
  },
  {
    taskNumber: 17,
    objetivo: "Capturar o Pokémon: Plusle"
  },
  {
    taskNumber: 18,
    objetivo: "Entregar o pokemon: Plusle"
  },
  {
    taskNumber: 19,
    objetivo: "Derrotar Pokemons: 8000 Outland Manectric"
  },
  {
    taskNumber: 20,
    objetivo: "Coletar:\n- Raibolt Gem: 2000",
    comoConseguir: "- Raibolt Gem: Dropa de Pokemons do Elemento do Clã na Outland"
  },
  {
    taskNumber: 21,
    objetivo: "Derrotar Pokemons: 2000 Luxray"
  },
  {
    taskNumber: 22,
    objetivo: "Capturar o Pokémon: Luxray"
  },
  {
    taskNumber: 23,
    objetivo: "Coletar:\n- Cristal de Sacrificio (Electric): 500",
    comoConseguir: "- Cristal de Sacrificio (Electric): Dropa na Relíquia do Vikavolt"
  }
];

export function RaiboltClanTable() {
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
          {raiboltTasks.slice(0, 4).map((task, index) => (
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
          {raiboltTasks.slice(4, 9).map((task, index) => (
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
          {raiboltTasks.slice(9, 15).map((task, index) => (
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
          {raiboltTasks.slice(15).map((task, index) => (
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
