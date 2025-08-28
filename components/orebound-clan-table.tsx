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

const oreboundTasks: ClanTask[] = [
  {
    taskNumber: 1,
    objetivo: "Coletar:\n- Onix Tail: 100\n- Big Stone: 25",
    comoConseguir: "- Onix Tail: Dropa do Onix e Steelix\n- Big Stone: Dar use em 100 Small Stones"
  },
  {
    taskNumber: 2,
    objetivo: "Coletar:\n- Rock Stone: 20\n- Orebound Essence: 15",
    comoConseguir: "- Rock Stone: Dropa de Pokemons do tipo Pedra\n- Orebound Essence: Derrotando Shinys dos elementos do clã"
  },
  {
    taskNumber: 3,
    objetivo: "Coletar:\n- Stone Orb: 30\n- Horn: 30",
    comoConseguir: "- Stone Orb: Dropa de Pokemons do tipo Pedra\n- Horn: Dropa de Pokemons com chifre, tipo Rhyhorn e Rhydon"
  },
  {
    taskNumber: 4,
    objetivo: "Solicitar Pokémon: Onix"
  },
  {
    taskNumber: 5,
    objetivo: "Coletar:\n- Orebound Essence: 30\n- Orebound Fragment: 5\n- Rock Stone: 25",
    comoConseguir: "- Orebound Essence: Derrotando Shinys dos elementos do clã\n- Orebound Fragment: Derrotando Shinys dos elementos do clã\n- Rock Stone: Dropa de Pokemons do tipo Pedra"
  },
  {
    taskNumber: 6,
    objetivo: "Capturar o Pokémon: Donphan"
  },
  {
    taskNumber: 7,
    objetivo: "Derrotar Pokemons: 500 Tyranitar"
  },
  {
    taskNumber: 8,
    objetivo: "Coletar:\n- Rock Stone: 250",
    comoConseguir: "- Rock Stone: Dropa de Pokemons do tipo Pedra"
  },
  {
    taskNumber: 9,
    objetivo: "Derrotar Pokemons: 500 Rhydon"
  },
  {
    taskNumber: 10,
    objetivo: "Coletar:\n- Shiny Orebound Stone: 2",
    comoConseguir: "- Shiny Orebound Stone: Utilizando 3 Fragmentos + 30 Essências + 10 Stones + 250k pra craftar na Professora em Pallet"
  },
  {
    taskNumber: 11,
    objetivo: "Capturar o Pokémon: Quagsire"
  },
  {
    taskNumber: 12,
    objetivo: "Solicitar Pokémon: Quagsire"
  },
  {
    taskNumber: 13,
    objetivo: "Derrotar Pokemons: 500 Sudowoodo"
  },
  {
    taskNumber: 14,
    objetivo: "Derrotar Pokemons: 500 Rhyperior"
  },
  {
    taskNumber: 15,
    objetivo: "Coletar:\n- Rock Paw: 1",
    comoConseguir: "- Rock Paw: Dropa dr Rhyperior"
  },
  {
    taskNumber: 16,
    objetivo: "Coletar:\n- Big Stone: 1000",
    comoConseguir: "- Big Stone: Dar use em 100 Small Stones"
  },
  {
    taskNumber: 17,
    objetivo: "Capturar o Pokémon: Flygon"
  },
  {
    taskNumber: 18,
    objetivo: "Solicitar Pokémon: Flygon"
  },
  {
    taskNumber: 19,
    objetivo: "Derrotar Pokemons: 8000 Outland Armaldo"
  },
  {
    taskNumber: 20,
    objetivo: "Coletar:\n- Orebound Gem: 2000",
    comoConseguir: "- Orebound Gem: Dropa de Pokemons do Elemento do Clã na Outland"
  },
  {
    taskNumber: 21,
    objetivo: "Derrotar Pokemons: 2000 Hippowdon"
  },
  {
    taskNumber: 22,
    objetivo: "Capturar o Pokémon: Hippowdon"
  },
  {
    taskNumber: 23,
    objetivo: "Coletar:\n- Cristal de Sacrificio (Sando): 500",
    comoConseguir: "- Cristal de Sacrificio (Sando): Dropa na Relíquia do Mudsdale"
  }
];

export function OreboundClanTable() {
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
          {oreboundTasks.slice(0, 4).map((task, index) => (
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
          {oreboundTasks.slice(4, 9).map((task, index) => (
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
          {oreboundTasks.slice(9, 15).map((task, index) => (
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
          {oreboundTasks.slice(15).map((task, index) => (
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
