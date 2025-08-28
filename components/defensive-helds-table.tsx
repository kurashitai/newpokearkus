import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DefensiveHeld {
  nome: string;
  imagem: string;
  tiers: {
    [key: number]: string;
  };
  descricao: string;
}

const defensiveHelds: DefensiveHeld[] = [
  {
    nome: "X-Defense",
    imagem: "/helds/Defense4.png",
    tiers: {
      1: "8%",
      2: "10%",
      3: "12%",
      4: "14%",
      5: "16%",
      6: "20%",
      7: "24%",
      8: "27%"
    },
    descricao: "Aumenta a defesa do Pokémon em X%."
  },
  {
    nome: "X-Block",
    imagem: "/helds/Block4.png",
    tiers: {
      1: "6%",
      2: "8%",
      3: "10%",
      4: "12%",
      5: "14%",
      6: "18%",
      7: "22%",
      8: "25%"
    },
    descricao: "Concede uma chance de X% de bloquear 90% de um ataque recebido."
  },
  {
    nome: "X-Vitality",
    imagem: "/helds/Vitality.png",
    tiers: {
      1: "5%",
      2: "8%",
      3: "12%",
      4: "15%",
      5: "19%",
      6: "22%",
      7: "25%",
      8: "N/A"
    },
    descricao: "Aumenta a vida do Pokémon em X%."
  },
  {
    nome: "X-Harden",
    imagem: "/helds/Harden.png",
    tiers: {
      1: "4%",
      2: "7%",
      3: "10%",
      4: "13%",
      5: "16%",
      6: "19%",
      7: "22%",
      8: "N/A"
    },
    descricao: "Concede uma chance de X% de usar o ataque Harden."
  }
];

export function DefensiveHeldsTable() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[10%]"><b>Ícone</b></TableHead> */}
            <TableHead className="w-[10%]"><b>Nome</b></TableHead>
            <TableHead className="w-[5%]"><b>Tier 1</b></TableHead>
            <TableHead className="w-[5%]"><b>Tier 2</b></TableHead>
            <TableHead className="w-[5%]"><b>Tier 3</b></TableHead>
            <TableHead className="w-[5%]"><b>Tier 4</b></TableHead>
            <TableHead className="w-[5%]"><b>Tier 5</b></TableHead>
            <TableHead className="w-[5%]"><b>Tier 6</b></TableHead>
            <TableHead className="w-[5%]"><b>Tier 7</b></TableHead>
            <TableHead className="w-[5%]"><b>Tier 8</b></TableHead>
            <TableHead className="w-[25%]">Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {defensiveHelds.map((held, index) => (
            <TableRow key={index}>
              {/* <TableCell className="text-center">
                <Image
                  src={held.imagem}
                  alt={`${held.nome} icon`}
                  width={258}
                  height={32}
                  className="inline-block"
                />
              </TableCell> */}
              <TableCell className="text-center font-medium">{held.nome}</TableCell>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((tier) => (
                <TableCell key={tier} className={`text-center ${held.tiers[tier] === 'N/A' ? 'text-red-500' : ''}`}>
                  {held.tiers[tier]}
                </TableCell>
              ))}
              <TableCell>{held.descricao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
