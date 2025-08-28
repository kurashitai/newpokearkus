import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OffensiveHeld {
  nome: string;
  imagem: string;
  tiers: {
    [key: number]: string;
  };
  descricao: string;
}

const offensiveHelds: OffensiveHeld[] = [
  {
    nome: "X-Attack",
    imagem: "/helds/Attack4.png",
    tiers: {
      1: "8%",
      2: "12%",
      3: "16%",
      4: "19%",
      5: "22%",
      6: "25%",
      7: "28%",
      8: "31%",
 
    },
    descricao: "Aumenta a força do Pokémon em X%."
  },
  {
    nome: "X-Critical",
    imagem: "/helds/Critical4.png",
    tiers: {
      1: "8%",
      2: "10%",
      3: "12%",
      4: "14%",
      5: "16%",
      6: "20%",
      7: "24%",
      8: "27%",
 
    },
    descricao: "Concede uma chance de X% de causar dano crítico."
  },
  {
    nome: "X-Boost",
    imagem: "/helds/Boost.png",
    tiers: {
      1: "12",
      2: "16",
      3: "20",
      4: "24",
      5: "28",
      6: "32",
      7: "36",
      8: "N/A",
 
    },
    descricao: "Aumenta o boost do Pokémon em X."
  }
];

export function OffensiveHeldsTable() {
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
          {offensiveHelds.map((held, index) => (
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
