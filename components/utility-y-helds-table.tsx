import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UtilityYHeld {
  nome: string;
  imagem: string;
  tiers: {
    [key: number]: string;
  };
  descricao: string;
}

const utilityYHelds: UtilityYHeld[] = [
  {
    nome: "Y-Teleport",
    imagem: "/helds/Teleport.png",
    tiers: {
      1: "N/A",
      2: "N/A",
      3: "N/A",
      4: "N/A",
      5: "40",
      6: "N/A",
      7: "N/A"
    },
    descricao: "Reduz o tempo de recarga da habilidade teleport em X minutos."
  },
  {
    nome: "Y-Cure",
    imagem: "/helds/Cure.png",
    tiers: {
      1: "20%",
      2: "30%",
      3: "50%",
      4: "70%",
      5: "80%",
      6: "90%",
      7: "100%"
    },
    descricao: "Seu Pokémon ganha X% de chance de remover um status negativo pelo qual foi afetado."
  },
  // {
  //   nome: "Y-Control",
  //   imagem: "/helds/Control.png",
  //   tiers: {
  //     1: "40",
  //     2: "60",
  //     3: "80",
  //     4: "100",
  //     5: "120",
  //     6: "140",
  //     7: "160"
  //   },
  //   descricao: "Reduz o tempo de recarga da habilidade Control Mind em X segundos."
  // },
  {
    nome: "Y-Regeneration",
    imagem: "/helds/Regeneration.png",
    tiers: {
      1: "700/s",
      2: "1000/s",
      3: "1500/s",
      4: "2000/s",
      5: "3000/s",
      6: "4000/s",
      7: "5000/s"
    },
    descricao: "Regenera a vida do Pokémon em X por segundo quando fora de batalha."
  },
  {
    nome: "Y-Wing",
    imagem: "/helds/YWing.png",
    tiers: {
      1: "100",
      2: "145",
      3: "185",
      4: "225",
      5: "270",
      6: "310",
      7: "370"
    },
    descricao: "Aumenta a velocidade de voo do Pokémon em X."
  },
  // {
  //   nome: "Y-Antiburn",
  //   imagem: "/helds/Antiburn.png",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "50",
  //     5: "N/A",
  //     6: "N/A",
  //     7: "N/A"
  //   },
  //   descricao: "Reduz o dano causado pelo efeito Burn em 50%."
  // },
  // {
  //   nome: "Y-Antipoison",
  //   imagem: "/helds/Antipoison.png",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "50",
  //     5: "N/A",
  //     6: "N/A",
  //     7: "N/A"
  //   },
  //   descricao: "Reduz o dano causado pelo efeito Poison em 50%."
  // }
  // {
  //   nome: "Y-Ghost",
  //   imagem: "/helds/Ghost.png",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "N/A",
  //     5: "N/A",
  //     6: "N/A",
  //     7: "N/A"
  //   },
  //   descricao: "O Pokémon ganha propriedades de fantasma, tornando-se capaz de atravessar paredes."
  // },
  // {
  //   nome: "Y-Light",
  //   imagem: "/helds/Light.png",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "N/A",
  //     5: "N/A",
  //     6: "N/A",
  //     7: "N/A"
  //   },
  //   descricao: "O Pokémon aprende a habilidade Light."
  // },
  // {
  //   nome: "Y-Headbutt",
  //   imagem: "/helds/Headbutt.png",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "N/A",
  //     5: "N/A",
  //     6: "N/A",
  //     7: "N/A"
  //   },
  //   descricao: "O Pokémon aprende a habilidade Headbutt."
  // },
  // {
  //   nome: "Y-Dig",
  //   imagem: "/helds/Dig.png",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "N/A",
  //     5: "N/A",
  //     6: "N/A",
  //     7: "N/A"
  //   },
  //   descricao: "O Pokémon aprende a habilidade Dig."
  // },
  // {
  //   nome: "Y-Smash",
  //   imagem: "/helds/Smash.png",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "N/A",
  //     5: "N/A",
  //     6: "N/A",
  //     7: "N/A"
  //   },
  //   descricao: "O Pokémon aprende a habilidade Rock Smash."
  // },
  // {
  //   nome: "Y-Cut",
  //   imagem: "/helds/Cut.png",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "N/A",
  //     5: "N/A",
  //     6: "N/A",
  //     7: "N/A"
  //   },
  //   descricao: "O Pokémon aprende a habilidade Cut."
  // },
  // {
  //   nome: "Y-Antiself",
  //   imagem: "/helds/Antiself.png",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "N/A",
  //     5: "N/A",
  //     6: "N/A",
  //     7: "N/A"
  //   },
  //   descricao: "Não tem mais utilidade a partir do changelog 23/06/2022, serve apenas para fusão."
  // },
  // {
  //   nome: "Y-Blur",
  //   imagem: "/helds/Blur.png",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "N/A",
  //     5: "N/A",
  //     6: "N/A",
  //     7: "N/A"
  //   },
  //   descricao: "Não tem mais utilidade a partir do changelog 31/10/2018, serve apenas para fusão."
  // }
];

export function UtilityYHeldsTable() {
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
            <TableHead className="w-[25%]">Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {utilityYHelds.map((held, index) => (
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
              {[1, 2, 3, 4, 5, 6, 7].map((tier) => (
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
