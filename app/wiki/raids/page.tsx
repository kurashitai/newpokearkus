"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { SearchButton } from "@/components/search-button";

export default function RaidsWiki() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const raids = [
    { name: "Serpente Verdejante", pokemon: "Serperior", coords: "840,3306,7" },
    { name: "Chama Furiosa", pokemon: "Emboar", coords: "391,1656,4" },
    { name: "Maré Bravejante", pokemon: "Samurott", coords: "451,2617,7" },
    { name: "Bravo Corredor", pokemon: "Stoutland", coords: "1060,1425,6" },
    { name: "Cristais Carmesim", pokemon: "Gigalith", coords: "659,852,6" },
    { name: "Mineral Metálico", pokemon: "Excadrill", coords: "1269,2477,7" },
    { name: "Lutador Intrépido", pokemon: "Mienshao", coords: "1125,915,2" },
    { name: "Inseto Caçador", pokemon: "Leavanny", coords: "767,3479,7" },
    { name: "Lutador Pantanoso", pokemon: "Seismitoad", coords: "709,3704,6" },
    { name: "Tumba Sinistra", pokemon: "Cofagrigus", coords: "1491,1637,7" },
    { name: "Ave Sombria", pokemon: "Mandibuzz", coords: "641,865,4" },
    { name: "Frieza Incansável", pokemon: "Cryogonal", coords: "1256,1928,5" },
    { name: "Lagarta Venenosa", pokemon: "Scolipede", coords: "841,856,7" },
    { name: "Mente Brilhante", pokemon: "Gothitelle", coords: "978,3243,7" },
    { name: "Rei dos Céus", pokemon: "Braviary", coords: "1126,1261,7" },
    { name: "Fada Floral", pokemon: "Whimsicott", coords: "553,694,6" },
    { name: "Enguia Eletrizante", pokemon: "Eelektross", coords: "572,2374,5" },
    { name: "Dragão Combatente", pokemon: "Haxorus", coords: "1505,3416,8" }
  ];

  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
        <div>
          <div className="space-y-8">
            <div className="rounded-lg border bg-card p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <Link href="/wiki">
                  <button className="btn flex items-center text-foreground/80 hover:text-primary">
                    <ChevronLeft className="mr-2" />
                    Retornar
                  </button>
                </Link>
              </div>
              <div className="rounded-lg border bg-card p-6">

                <h1 className="text-2xl font-semibold mb-4">Guia Completo das Raids</h1>
                <p className="text-muted-foreground">
                  As Raids são eventos PvE onde jogadores enfrentam ondas de Pokémons para ganhar recompensas raras. Elas possuem dificuldades progressivas e necessitam de um <strong>Raid Ticket</strong> para participar, que pode ser obtido através do <strong>NPC Lukas - Explorador de Fendas</strong> em <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => handleCopy("1077,1237,6")}>(1077,1237,6)</span> na direita de Vermilion.
                </p>
                <h2 className="text-xl font-semibold mt-6">Como funcionam as Raids?</h2><br/>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Necessário ter level 300 para participar.</li>
                  <li>A cada 1 hora, um portal aleatório surge no mapa, abrindo uma nova Raid.</li>
                  <li>Com um ticket em mãos, fique dentro da área da raid.</li>
                  <li>O aviso da Raid aparece 1 minuto antes do portal ser ativado.</li>
                  <li>Cada Raid dura 20 minutos e possui 20 ondas de inimigos.</li>
                  <li>Um Boss surge a cada 5 ondas.</li>
                  <li>Para avançar, a onda anterior precisa ser completamente derrotada.</li>
                  <li>A dificuldade dos Pokémons aumenta a cada onda, atingindo o auge na onda 20.</li>
                  <li>Efeitos negativos (paralisia, sono, etc.) não funcionam nas Raids.</li>
                  <li>Pokémons da Raid não podem ser puxados, exceto pelo efeito Attract.</li>
                  <li>Cooldown das habilidades reduzido em 40%, mas o Held X-Cooldown não tem efeito.</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6">Como entrar nas Raids?</h2><br/>
                <p className="text-muted-foreground">
                  Para entrar, fique ao lado do portal que apareceu na localização da Raid.<br/>
                  Cada entrada custa <strong>4KK ou 1 Arkus Coin</strong> (Raid Ticket).
                </p>
                <h2 className="text-xl font-semibold mt-6">Lista de Raids e Localizações</h2>
                <table className="w-full border-collapse border border-gray-700 mt-4">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="border border-gray-700 p-2">Nome</th>
                      <th className="border border-gray-700 p-2">Pokémon</th>
                      <th className="border border-gray-700 p-2">Localização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raids.map((raid) => (
                      <tr key={raid.coords} className="text-center">
                        <td className="border border-gray-700 p-2">{raid.name}</td>
                        <td className="border border-gray-700 p-2">{raid.pokemon}</td>
                        <td className="border border-gray-700 p-2">
                          <span
                            className="cursor-pointer text-blue-500 hover:underline"
                            onClick={() => handleCopy(raid.coords)}
                          >
                            ({raid.coords})
                          </span>
                          {copied === raid.coords && (
                            <span className="ml-2 text-green-500 text-sm">Copiado!</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h2 className="text-xl font-semibold mt-6">Rotações Semanais</h2><br />
                <p className="text-muted-foreground">
                  As Raids seguem um sistema de rotação semanal:
                </p>
                <br />
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Semana 1:</strong> Chama Furiosa, Maré Bravejante, Dragão Combatente, Tumba Sinistra, Cristais Carmesim, Lutador Intrépido.</li>
                  <li><strong>Semana 2:</strong> Serpente Verdejante, Frieza Incansável, Enguia Eletrizante, Ave Sombria, Mente Brilhante, Bravo Corredor.</li>
                  <li><strong>Semana 3:</strong> Mineral Metálico, Inseto Caçador, Lutador Pantanoso, Lagarta Venenosa, Rei dos Céus, Fada Floral.</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6">Tipos das Raids</h2><br/>
                <p className="text-muted-foreground">
                  Cada Raid possui um tipo específico, o que afeta sua dificuldade e as melhores estratégias:
                </p>
                <br />
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Grass, Fire, Water, Normal, Rock, Steel, Fighting, Bug, Ground, Ghost, Dark, Ice, Poison, Psychic, Flying, Fairy, Electric, Dragon.</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6">Sistema de Recompensas</h2><br/>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Cada onda derrotada concede itens que podem ser trocados com o NPC Lukas - Explorador de Fendas.</li>
                  <li>Além disso, algumas missões dentro das Raids concedem <strong>Almarinas</strong>, essenciais para trocas avançadas.</li>
                  <li>Alguns itens raros estão disponíveis apenas para jogadores que completam as Raids.</li>
                  <li>Almarinas podem ser obtidas ao completar certas missões dentro das Raids e são essenciais para trocas avançadas no Lukas.</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6">Regras da Raid</h2><br/>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Multi Client&apos;s não serão permitidos.</li>
                  <li>Jogadores que se recusarem a colaborar e/ou atrapalhem o andamento da Raid poderão ser banidos das Raid&apos;s por até 30 Dias.</li>
                  <li>Qualquer tipo de abuso de bug ou algo que beneficie o jogador de forma desleal acarretará na suspensão da conta e/ou banimento das Raid&apos;s.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
