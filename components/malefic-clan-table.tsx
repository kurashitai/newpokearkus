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

const maleficTasks: ClanTask[] = [
  {
    taskNumber: 1,
    objetivo: "Coletar:\n- Traces of Ghost: 100\n- Compressed Ghost Essence: 25",
    comoConseguir: "- Traces of Ghost: Dropa de Pokemons do tipo Fantasma e Sombrio\n- Compressed Ghost Essence: Dar use em 100 Ghost Essence"
  },
  {
    taskNumber: 2,
    objetivo: "Coletar:\n- Darkness Stone: 20\n- Malefic Essence: 15",
    comoConseguir: "- Darkness Stone: Dropa de Pokemons do tipo Fantasma e Sombrio\n- Malefic Essence: Derrotando Shinys dos elementos do clã"
  },
  {
    taskNumber: 3,
    objetivo: "Coletar:\n- Venom Flute: 30\n- Future Orb: 30",
    comoConseguir: "- Venom Flute: Dropa de Pokemons do tipo Venenoso\n- Future Orb: Dropa de Pokemons Psiquico"
  },
  {
    taskNumber: 4,
    objetivo: "Entregar o pokemon: Gengar"
  },
  {
    taskNumber: 5,
    objetivo: "Coletar:\n- Malefic Essence: 30\n- Malefic Fragment: 5\n- Darkness Stone: 25",
    comoConseguir: "- Malefic Essence: Derrotando Shinys dos elementos do clã\n- Malefic Fragment: Derrotando Shinys dos elementos do clã\n- Darkness Stone: Dropa de Pokemons do tipo Fantasma e Sombrio"
  },
  {
    taskNumber: 6,
    objetivo: "Capturar o Pokémon: Umbreon"
  },
  {
    taskNumber: 7,
    objetivo: "Derrotar Pokemons: 500 Misdreavus"
  },
  {
    taskNumber: 8,
    objetivo: "Coletar:\n- Darkness Stone: 250",
    comoConseguir: "- Darkness Stone: Dropa de Pokemons do tipo Fantasma e Sombrio"
  },
  {
    taskNumber: 9,
    objetivo: "Derrotar Pokemons: 500 Absol"
  },
  {
    taskNumber: 10,
    objetivo: "Coletar:\n- Shiny Malefic Stone: 2",
    comoConseguir: "- Shiny Malefic Stone: Utilizando 3 Fragmentos + 30 Essências + 10 Stones + 250k pra craftar na Professora em Pallet"
  },
  {
    taskNumber: 11,
    objetivo: "Capturar o Pokémon: Crobat"
  },
  {
    taskNumber: 12,
    objetivo: "Entregar o pokemon: Crobat"
  },
  {
    taskNumber: 13,
    objetivo: "Derrotar Pokemons: 500 Qwilfish"
  },
  {
    taskNumber: 14,
    objetivo: "Derrotar Pokemons: 500 Dusknoir"
  },
  {
    taskNumber: 15,
    objetivo: "Coletar:\n- Ghost Smile: 1",
    comoConseguir: "- Ghost Smile: Dropa do Dusknoir."
  },
  {
    taskNumber: 16,
    objetivo: "Coletar:\n- Compressed Ghost Essence: 1000",
    comoConseguir: "- Compressed Ghost Essence: Dar use em 100 Ghost Essence"
  },
  {
    taskNumber: 17,
    objetivo: "Capturar o Pokémon: Seviper"
  },
  {
    taskNumber: 18,
    objetivo: "Entregar o pokemon: Seviper"
  },
  {
    taskNumber: 19,
    objetivo: "Derrotar Pokemons: 8000 Outland Sableye"
  },
  {
    taskNumber: 20,
    objetivo: "Coletar:\n- Malefic Gem: 2000",
    comoConseguir: "- Malefic Gem: Dropa de Pokemons do Elemento do Clã na Outland"
  },
  {
    taskNumber: 21,
    objetivo: "Derrotar Pokemons: 2000 Drapion"
  },
  {
    taskNumber: 22,
    objetivo: "Capturar o Pokémon: Drapion"
  },
  {
    taskNumber: 23,
    objetivo: "Coletar:\n- Cristal de Sacrificio (Mortis): 500",
    comoConseguir: "- Cristal de Sacrificio (Mortis): Dropa na Relíquia do Dragapult"
  }
];

export function MaleficClanTable() {
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
          {maleficTasks.slice(0, 4).map((task, index) => (
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
          {maleficTasks.slice(4, 9).map((task, index) => (
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
          {maleficTasks.slice(9, 15).map((task, index) => (
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
          {maleficTasks.slice(15).map((task, index) => (
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
