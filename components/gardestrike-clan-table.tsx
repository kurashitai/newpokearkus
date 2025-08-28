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

const gardestrikeTasks: ClanTask[] = [
  {
    taskNumber: 1,
    objetivo: "Coletar:\n- Belt of Champion: 100\n- Injection: 25",
    comoConseguir: "- Belt of Champion: Dropa de Pokemons do tipo Lutador\n- Injection: Dar use em 100 Bandaid"
  },
  {
    taskNumber: 2,
    objetivo: "Coletar:\n- Punch Stone: 20\n- Gardestrike Essence: 15",
    comoConseguir: "- Punch Stone: Dropa de Pokemons do tipo Lutador\n- Gardestrike Essence: Dar use em 100 Normal Essence"
  },
  {
    taskNumber: 3,
    objetivo: "Coletar:\n- Luck Medalion: 30",
    comoConseguir: "- Luck Medalion: Dropa de Pokemons do tipo Normal"
  },
  {
    taskNumber: 4,
    objetivo: "Entregar o pokemon: Machamp"
  },
  {
    taskNumber: 5,
    objetivo: "Coletar:\n- Gardestrike Essence: 30\n- Gardestrike Fragment: 5\n- Punch Stone: 25",
    comoConseguir: "- Gardestrike Essence: Derrotando Shinys dos elementos do clã\n- Gardestrike Fragment: Derrotando Shinys dos elementos do clã\n- Punch Stone: Dropa de Pokemons do tipo Lutador"
  },
  {
    taskNumber: 6,
    objetivo: "Capturar o Pokémon: Ursaring"
  },
  {
    taskNumber: 7,
    objetivo: "Derrotar Pokemons: 500 Heracross"
  },
  {
    taskNumber: 8,
    objetivo: "Coletar:\n- Punch Stone: 250",
    comoConseguir: "- Punch Stone: Dropa de Pokemons do tipo Lutador"
  },
  {
    taskNumber: 9,
    objetivo: "Derrotar Pokemons: 500 Primeape"
  },
  {
    taskNumber: 10,
    objetivo: "Coletar:\n- Shiny Gardestrike Stone: 2",
    comoConseguir: "- Shiny Gardestrike Stone: Utilizando 3 Fragmentos + 30 Essências + 10 Stones + 250k pra craftar na Professora em Pallet"
  },
  {
    taskNumber: 11,
    objetivo: "Capturar o Pokémon: Persian"
  },
  {
    taskNumber: 12,
    objetivo: "Entregar o pokemon: Persian"
  },
  {
    taskNumber: 13,
    objetivo: "Derrotar Pokemons: 500 Miltank"
  },
  {
    taskNumber: 14,
    objetivo: "Derrotar Pokemons: 500 Slaking"
  },
  {
    taskNumber: 15,
    objetivo: "Coletar:\n- Monkey Hull: 1",
    comoConseguir: "- Monkey Hull: Dropa de Slaking"
  },
  {
    taskNumber: 16,
    objetivo: "Coletar:\n- Injection: 1000",
    comoConseguir: "- Injection: Dar use em 100 Bandaid"
  },
  {
    taskNumber: 17,
    objetivo: "Capturar o Pokémon: Zangoose"
  },
  {
    taskNumber: 18,
    objetivo: "Entregar o pokemon: Zangoose"
  },
  {
    taskNumber: 19,
    objetivo: "Derrotar Pokemons: 8000 Outland Hariyama"
  },
  {
    taskNumber: 20,
    objetivo: "Coletar:\n- Gardestrike Gem: 2000",
    comoConseguir: "- Gardestrike Gem: Dropa de Pokemons do Elemento do Clã na Outland"
  },
  {
    taskNumber: 21,
    objetivo: "Derrotar Pokemons: 2000 Toxicroak"
  },
  {
    taskNumber: 22,
    objetivo: "Capturar o Pokémon: Toxicroak"
  },
  {
    taskNumber: 23,
    objetivo: "Coletar:\n- Cristal de Sacrificio (Kicker): 500",
    comoConseguir: "- Cristal de Sacrificio (Kicker): Dropa na Relíquia do Kommo-o"
  }
];

export function GardestrikeClanTable() {
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
          {gardestrikeTasks.slice(0, 4).map((task, index) => (
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
          {gardestrikeTasks.slice(4, 9).map((task, index) => (
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
          {gardestrikeTasks.slice(9, 15).map((task, index) => (
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
          {gardestrikeTasks.slice(15).map((task, index) => (
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
