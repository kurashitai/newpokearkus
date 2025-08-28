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

const ironhardTasks: ClanTask[] = [
  {
    taskNumber: 1,
    objetivo: "Coletar:\n- Compressed Steel: 100\n- Metal Coat: 25",
    comoConseguir: "- Compressed Steel: Dar use em 100 Piece of Steel\n- Metal Coat: Dropa de Pokemons do tipo Metal"
  },
  {
    taskNumber: 2,
    objetivo: "Coletar:\n- Metal Coat: 20\n- Ironhard Fragment: 15",
    comoConseguir: "- Metal Coat: Dropa de Pokemons do tipo Metal\n- Ironhard Fragment: Derrotando Shinys dos elementos do clã"
  },
  {
    taskNumber: 3,
    objetivo: "Coletar:\n- Metal Coat: 30",
    comoConseguir: "- Metal Coat: Dropa de Pokemons do tipo Metal"
  },
  {
    taskNumber: 4,
    objetivo: "Entregar o pokemon: Magneton"
  },
  {
    taskNumber: 5,
    objetivo: "Coletar:\n- Ironhard Fragment: 30\n- Ironhard Fragment: 5\n- Metal Coat: 25",
    comoConseguir: "- Ironhard Fragment: Derrotando Shinys dos elementos do clã\n- Metal Coat: Dropa de Pokemons do tipo Metal"
  },
  {
    taskNumber: 6,
    objetivo: "Capturar o Pokémon: Forretress"
  },
  {
    taskNumber: 7,
    objetivo: "Derrotar Pokemons: 500 Scizor"
  },
  {
    taskNumber: 8,
    objetivo: "Coletar:\n- Metal Coat: 250",
    comoConseguir: "- Metal Coat: Dropa de Pokemons do tipo Metal"
  },
  {
    taskNumber: 9,
    objetivo: "Derrotar Pokemons: 500 Steelix"
  },
  {
    taskNumber: 10,
    objetivo: "Coletar:\n- Shiny Ironhard Stone: 2",
    comoConseguir: "- Shiny Ironhard Stone: Utilizando 3 Fragmentos + 30 Essências + 10 Stones + 250k pra craftar na Professora em Pallet"
  },
  {
    taskNumber: 11,
    objetivo: "Capturar o Pokémon: Skarmory"
  },
  {
    taskNumber: 12,
    objetivo: "Entregar o pokemon: Skarmory"
  },
  {
    taskNumber: 13,
    objetivo: "Derrotar Pokemons: 500 Aggron"
  },
  {
    taskNumber: 14,
    objetivo: "Derrotar Pokemons: 500 Metagross"
  },
  {
    taskNumber: 15,
    objetivo: "Coletar:\n- Iron Orb: 1",
    comoConseguir: "- Iron Orb: Dropa de Metagross"
  },
  {
    taskNumber: 16,
    objetivo: "Coletar:\n- Compressed Steel: 1000",
    comoConseguir: "- Compressed Steel: Dar use em 100 Piece of Steel"
  },
  {
    taskNumber: 17,
    objetivo: "Capturar o Pokémon: Mawile"
  },
  {
    taskNumber: 18,
    objetivo: "Entregar o pokemon: Mawile"
  },
  {
    taskNumber: 19,
    objetivo: "Derrotar Pokemons: 8000 Outland Aggron"
  },
  {
    taskNumber: 20,
    objetivo: "Coletar:\n- Ironhard Gem: 2000",
    comoConseguir: "- Ironhard Gem: Dropa de Pokemons do Elemento do Clã na Outland"
  },
  {
    taskNumber: 21,
    objetivo: "Derrotar Pokemons: 2000 Bronzong"
  },
  {
    taskNumber: 22,
    objetivo: "Capturar o Pokémon: Bronzong"
  },
  {
    taskNumber: 23,
    objetivo: "Coletar:\n- Cristal de Sacrificio (Metallo): 500",
    comoConseguir: "- Cristal de Sacrificio (Metallo): Dropa na Relíquia do Bisharp"
  }
];

export default function IronhardClanTable() {
  return (
    <>
      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]"><b>Task</b></TableHead>
            <TableHead className="w-[45%]"><b>Objetivo</b></TableHead>
            <TableHead className="w-[45%]"><b>Como conseguir</b></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ironhardTasks.slice(0, 6).map((task, index) => (
            <TableRow key={index}>
              <TableCell>Task {task.taskNumber}</TableCell>
              <TableCell className="whitespace-pre-line">{task.objetivo}</TableCell>
              <TableCell className="whitespace-pre-line">{task.comoConseguir || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]"><b>Task</b></TableHead>
            <TableHead className="w-[45%]"><b>Objetivo</b></TableHead>
            <TableHead className="w-[45%]"><b>Como conseguir</b></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ironhardTasks.slice(6, 12).map((task, index) => (
            <TableRow key={index}>
              <TableCell>Task {task.taskNumber}</TableCell>
              <TableCell className="whitespace-pre-line">{task.objetivo}</TableCell>
              <TableCell className="whitespace-pre-line">{task.comoConseguir || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]"><b>Task</b></TableHead>
            <TableHead className="w-[45%]"><b>Objetivo</b></TableHead>
            <TableHead className="w-[45%]"><b>Como conseguir</b></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ironhardTasks.slice(12, 18).map((task, index) => (
            <TableRow key={index}>
              <TableCell>Task {task.taskNumber}</TableCell>
              <TableCell className="whitespace-pre-line">{task.objetivo}</TableCell>
              <TableCell className="whitespace-pre-line">{task.comoConseguir || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]"><b>Task</b></TableHead>
            <TableHead className="w-[45%]"><b>Objetivo</b></TableHead>
            <TableHead className="w-[45%]"><b>Como conseguir</b></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ironhardTasks.slice(18).map((task, index) => (
            <TableRow key={index}>
              <TableCell>Task {task.taskNumber}</TableCell>
              <TableCell className="whitespace-pre-line">{task.objetivo}</TableCell>
              <TableCell className="whitespace-pre-line">{task.comoConseguir || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
