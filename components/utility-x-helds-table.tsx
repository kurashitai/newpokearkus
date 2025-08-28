import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UtilityXHeld {
  nome: string;
  imagem: string;
  tiers: {
    [key: number]: string;
  };
  descricao: string;
}

const utilityXHelds: UtilityXHeld[] = [
  {
    nome: "X-Lucky",
    imagem: "/helds/Lucky4.png",
    tiers: {
      1: "10%",
      2: "20%",
      3: "35%",
      4: "50%",
      5: "65%",
      6: "80%",
      7: "100%",
      8: "N/A"
    },
    descricao: "Aumenta a chance de dropar itens em X%."
  },
  {
    nome: "X-Experience",
    imagem: "/helds/Experience.png",
    tiers: {
      1: "10%",
      2: "15%",
      3: "20%",
      4: "25%",
      5: "30%",
      6: "35%",
      7: "40%",
      8: "N/A"
    },
    descricao: "Aumenta a experiência recebida ao derrotar um Pokémon selvagem em X%."
  },
  {
    nome: "X-Accuracy",
    imagem: "/helds/Accuracy.png",
    tiers: {
      1: "20%",
      2: "25%",
      3: "30%",
      4: "35%",
      5: "40%",
      6: "45%",
      7: "50%",
      8: "N/A"
    },
    descricao: "Aumenta a chance de acertar status negativo em X%."
  },
  {
    nome: "X-Return",
    imagem: "/helds/Return.png",
    tiers: {
      1: "2.5%",
      2: "3%",
      3: "4%",
      4: "5%",
      5: "6%",
      6: "7%",
      7: "9%",
      8: "N/A"
    },
    descricao: "Retorna X% de todo dano recebido."
  },
  {
    nome: "X-Poison",
    imagem: "/helds/Poison.png",
    tiers: {
      1: "90%",
      2: "125%",
      3: "160%",
      4: "195%",
      5: "230%",
      6: "265%",
      7: "300%",
      8: "N/A"
    },
    descricao: "Aumenta o dano do status Poison em X%."
  },
  {
    nome: "X-Hellfire",
    imagem: "/helds/Hellfire.png",
    tiers: {
      1: "90%",
      2: "125%",
      3: "160%",
      4: "195%",
      5: "230%",
      6: "265%",
      7: "300%",
      8: "N/A"
    },
    descricao: "Aumenta o dano do status Burn em X%."
  },
  {
    nome: "X-Rage",
    imagem: "/helds/Rage.png",
    tiers: {
      1: "10%",
      2: "20%",
      3: "30%",
      4: "40%",
      5: "50%",
      6: "70%",
      7: "100%",
      8: "N/A"
    },
    descricao: "Concede uma chance de X% de usar o ataque Rage."
  },
  {
    nome: "X-Strafe",
    imagem: "/helds/Strafe.png",
    tiers: {
      1: "10%",
      2: "20%",
      3: "30%",
      4: "40%",
      5: "50%",
      6: "70%",
      7: "100%",
      8: "N/A"
    },
    descricao: "Concede uma chance de X% de usar o ataque Strafe."
  },
  {
    nome: "X-Agility",
    imagem: "/helds/Agility.png",
    tiers: {
      1: "8%",
      2: "14%",
      3: "20%",
      4: "30%",
      5: "40%",
      6: "50%",
      7: "60%",
      8: "N/A"
    },
    descricao: "Concede uma chance de X% de usar o ataque Agility."
  },
  {
    nome: "X-Haste",
    imagem: "/helds/Haste.png",
    tiers: {
      1: "60",
      2: "85",
      3: "110",
      4: "135",
      5: "170",
      6: "205",
      7: "250",
      8: "N/A"
    },
    descricao: "Aumenta a velocidade Pokémon em X."
  },
  {
    nome: "X-Elemental",
    imagem: "/helds/Elemental.png",
    tiers: {
      1: "8%",
      2: "10%",
      3: "12%",
      4: "14%",
      5: "17%",
      6: "19%",
      7: "22%",
      8: "N/A"
    },
    descricao: "O Pokémon tem uma chance de X% de usar uma passiva do elemento dele."
  },
  {
    nome: "X-Cooldown",
    imagem: "/helds/X-coldown.png",
    tiers: {
      1: "N/A",
      2: "N/A",
      3: "11%",
      4: "N/A",
      5: "14%",
      6: "N/A",
      7: "17%",
      8: "N/A"
    },
    descricao: "Reduz o tempo de recarga dos ataques do seu Pokémon em X%."
  }
  // {
  //   nome: "X-Blink",
  //   imagem: "/helds/X-blink.png",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "N/A",
  //     5: "70",
  //     6: "N/A",
  //     7: "N/A",
  //     8: "N/A"
  //   },
  //   descricao: "Reduz o tempo de recarga da habilidade Blink em 70%."
  // },
  // {
  //   nome: "X-Upgrade",
  //   imagem: "/helds/X-upgrade-tier-4.gif",
  //   tiers: {
  //     1: "N/A",
  //     2: "N/A",
  //     3: "N/A",
  //     4: "3 -> 4",
  //     5: "4 -> 5",
  //     6: "5 -> 6",
  //     7: "6 -> 7",
  //     8: "7 -> 8"
  //   },
  //   descricao: "Atualiza o Held Item da categoria anterior para o Tier do Held utilizado, caso o Held já esteja em seu Pokémon."
  // }
];

export function UtilityXHeldsTable() {
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
          {utilityXHelds.map((held, index) => (
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
