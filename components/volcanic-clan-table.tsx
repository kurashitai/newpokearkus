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

const volcanicTasks: ClanTask[] = [
  {
    taskNumber: 1,
    objetivo: "Coletar:\n- Pot of Lava: 100\n- Compressed Fire: 25",
    comoConseguir: "- Pot of Lava: Dropa de Pokemons do tipo Fogo\n- Compressed Fire: Dar use em 100 Essence of Fire"
  },
  {
    taskNumber: 2,
    objetivo: "Coletar:\n- Fire Stone: 20\n- Volcanic Essence: 15",
    comoConseguir: "- Fire Stone: Dropa de Pokemons do tipo Fogo\n- Volcanic Essence: Derrotando Shinys dos elementos do clã"
  },
  {
    taskNumber: 3,
    objetivo: "Coletar:\n- Fox Tail: 30\n- Fire Tail: 30\n- Fur: 30",
    comoConseguir: "- Fox Tail: Dropa do Vulpix e Ninetales\n- Fire Tail: Dropa da linha evolutiva do Charizard\n- Fur: Dropa de Pokemons com Pelo"
  },
  {
    taskNumber: 4,
    objetivo: "Entregar o pokemon: Charizard"
  },
  {
    taskNumber: 5,
    objetivo: "Coletar:\n- Volcanic Essence: 30\n- Volcanic Fragment: 5\n- Fire Stone: 25",
    comoConseguir: "- Volcanic Essence: Derrotando Shinys dos elementos do clã\n- Volcanic Fragment: Derrotando Shinys dos elementos do clã\n- Fire Stone: Dropa de Pokemons do tipo Fogo"
  },
  {
    taskNumber: 6,
    objetivo: "Capturar o Pokémon: Typhlosion"
  },
  {
    taskNumber: 7,
    objetivo: "Derrotar Pokemons: 500 Houndoom"
  },
  {
    taskNumber: 8,
    objetivo: "Coletar:\n- Fire Stone: 250",
    comoConseguir: "- Fire Stone: Dropa de Pokemons do tipo Fogo"
  },
  {
    taskNumber: 9,
    objetivo: "Derrotar Pokemons: 500 Camerupt"
  },
  {
    taskNumber: 10,
    objetivo: "Coletar:\n- Shiny Volcanic Stone: 2",
    comoConseguir: "- Shiny Volcanic Stone: Utilizando 3 Fragmentos + 30 Essências + 10 Stones + 250k pra craftar na Professora em Pallet"
  },
  {
    taskNumber: 11,
    objetivo: "Capturar o Pokémon: Magmar"
  },
  {
    taskNumber: 12,
    objetivo: "Entregar o pokemon: Magmar"
  },
  {
    taskNumber: 13,
    objetivo: "Derrotar Pokemons: 500 Torkoal"
  },
  {
    taskNumber: 14,
    objetivo: "Derrotar Pokemons: 500 Magmortar"
  },
  {
    taskNumber: 15,
    objetivo: "Coletar:\n- Blaze Topknot: 1",
    comoConseguir: "- Blaze Topknot: Dropa de Magmortar"
  },
  {
    taskNumber: 16,
    objetivo: "Coletar:\n- Compressed Fire: 1000",
    comoConseguir: "- Compressed Fire: Dar use em 100 Essence of Fire"
  },
  {
    taskNumber: 17,
    objetivo: "Capturar o Pokémon: Blaziken"
  },
  {
    taskNumber: 18,
    objetivo: "Entregar o pokemon: Blaziken"
  },
  {
    taskNumber: 19,
    objetivo: "Derrotar Pokemons: 8000 Outland Torkoal"
  },
  {
    taskNumber: 20,
    objetivo: "Coletar:\n- Volcanic Gem: 2000",
    comoConseguir: "- Volcanic Gem: Dropa de Pokemons do Elemento do Clã na Outland"
  },
  {
    taskNumber: 21,
    objetivo: "Derrotar Pokemons: 2000 Infernape"
  },
  {
    taskNumber: 22,
    objetivo: "Capturar o Pokémon: Infernape"
  },
  {
    taskNumber: 23,
    objetivo: "Coletar:\n- Cristal de Sacrificio (Heato): 500",
    comoConseguir: "- Cristal de Sacrificio (Heato): Dropa na Relíquia do Salazzle"
  }
];

export function VolcanicClanTable() {
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
          {volcanicTasks.slice(0, 4).map((task, index) => (
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
          {volcanicTasks.slice(4, 9).map((task, index) => (
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
          {volcanicTasks.slice(9, 15).map((task, index) => (
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
          {volcanicTasks.slice(15).map((task, index) => (
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
