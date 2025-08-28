"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchButton } from "@/components/search-button";

export default function WikiPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 1500);
    });
  };

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
                <div className="block lg:hidden">
                  <SearchButton />
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="rounded-lg border bg-card p-6">
                  <h1 className="text-2xl font-semibold mb-4">Brotherhood</h1>
                  <p className="text-muted-foreground">
                    A brotherhood é um sistema de desafios semanais, onde você poderá desafiar NPCs específicos pro duelo, onde você irá caçar eles no mapa e tentará derrotá-los. <br/><br/>
                    A cada vitória que você tiver no duelo, você irá ganhar algumas recompensas do NPC em questão baseado no seu Ranking de Contrato, que variam entre Iniciante (level 250), Mediano (level 300), Desafiador (level 325), Dominador (level 350) e Lendário (level 400).<br/><br/>
                    Ao concluir a quantidade de desafios do Rank em questão, você irá ganhar uma recompensa extra e subirá pra próxima categoria. <br/><br/>
                    Depois de terminar as categorias Iniciante até o Dominador, você liberará a categoria Lendário, onde é a categoria final. Ao terminar o rank Lendário, você será recompensado com algo que não iremos dar Spoilers (Assim que alguém concluir ao menos 1x, iremos atualizar essa parte).<br/><br/>
                  </p>
                  <h1 className="text-xl font-semibold mb-4">Como iniciar na Brotherhood</h1>
                  <p className="text-muted-foreground">
                    Para iniciar na Brotherhood, você precisa estar no nível 250 e se dirigir ao NPC Jenny <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => handleCopy("525, 1206, 5")}>(525, 1206, 5)</span> logo abaixo de Viridian, onde ela irá te pedir pra buscar o relatório com 4 oficiais.<br/>                    
                  </p>

                  <div className="mt-6 bg-card border rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-center">Como Copiar Coordenadas</h2>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative w-full max-w-md h-[300px] rounded-lg overflow-block shadow-lg">
                        <Image 
                          src="/position.gif" 
                          alt="Tutorial de como copiar coordenadas" 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <p className="text-muted-foreground text-center">
                        Clique nas coordenadas em azul para copiá-las rapidamente para a área de transferência, depois é só ir até o jogo, apertar Ctrl+Tab, clicar na lupa e colar as coordenadas.
                      </p>
                    </div>
                  </div>

                  <ol className="list-disc list-inside space-y-2">
                    {[
                      { name: "Oficial 1", coords: "959,824,6", city: "Cerulean" },
                      { name: "Oficial 2", coords: "966,1065,7", city: "Saffron" },
                      { name: "Oficial 3", coords: "1094,1535,7", city: "Fuchsia" },
                      { name: "Oficial 4", coords: "1115,1741,5", city: "Snow" },
                    ].map((officer) => (
                      <li key={officer.coords} className="text-muted-foreground">
                        {officer.name}.{" "}
                        <span
                          className="cursor-pointer text-blue-500 hover:underline"
                          onClick={() => handleCopy(officer.coords)}
                        >
                          ({officer.coords})
                        </span>{" "}
                        - {officer.city}
                        {copied === officer.coords && (
                          <span className="ml-2 text-green-500 text-sm">Copiado!</span>
                        )}
                      </li>
                    ))}
                  </ol><br/><br/>
                  <p className="text-muted-foreground">
                    Após terminar de buscar os relatórios, você vai falar com o NPC General Kraus no edifício da polícia em Celadon <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => handleCopy("721,1006,5")}>(721,1006,5)</span> para entregar todos os relatórios e receber a sua próxima missão.<br/><br/>
                    Depois disso ele irá pedir pra você entregar os relatórios para o NPC Cotoi <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => handleCopy("410,1551,5")}>(410,1551,5)</span> na esquerda de Cinnabar. Cotoi então irá solicitar que você visite os acampamentos e pegue os Mapas, são ao todo 12 acampamentos:<br/><br/>
                  </p>
                  <ol className="list-disc list-inside space-y-2">
                    {[
                      { name: "Acampamento 1", coords: "554,988,7", city: "Entre Viridian e Pewter" },
                      { name: "Acampamento 2", coords: "1281,1402,6", city: "Nordeste Fuchsia" },
                      { name: "Acampamento 3", coords: "773,1364,7", city: "Lagoon Mirage, entre Vermilion e Fuchsia" },
                      { name: "Acampamento 4", coords: "1202,1266,6", city: "Leste Vermilion" },
                      { name: "Acampamento 5", coords: "1068,840,6", city: "Sul Cerulean" },
                      { name: "Acampamento 6", coords: "873,2164,7", city: "Norte Ecruteak" },
                      { name: "Acampamento 7", coords: "641,2541,6", city: "Whirl Island, entre Goldenrod, Olivine e Cianwood" },
                      { name: "Acampamento 8", coords: "1262,2173,7", city: "Norte de Blackthorn" },
                      { name: "Acampamento 9", coords: "1090,2276,7", city: "Entre Violet e Blackthorn" },
                      { name: "Acampamento 10", coords: "416,3112,7", city: "Norte de Petalburg" },
                      { name: "Acampamento 11", coords: "1226,3333,7", city: "Leste de Sootopolis" },
                      { name: "Acampamento 12", coords: "556,3574,7", city: "Parte sul de Dewford" },
                    ].map((camp) => (
                      <li key={camp.coords} className="text-muted-foreground">
                        {camp.name}.{" "}
                        <span
                          className="cursor-pointer text-blue-500 hover:underline"
                          onClick={() => handleCopy(camp.coords)}
                        >
                          ({camp.coords})
                        </span>{" "}
                        - {camp.city}
                        {copied === camp.coords && (
                          <span className="ml-2 text-green-500 text-sm">Copiado!</span>
                        )}
                      </li>
                    ))}
                  </ol><br/><br/>
                  <p className="text-muted-foreground">
                    Após isso, é só você clicar no terminal de mensagens Branco, presente em qualquer Posto Policial ou Centro Pokemon, selecionar o rank que você está desafiando no momento, seguir as instruções de onde está localizado o NPC e ir caçar ele.<br/><br/>
                    Ao todo são 770 contratos para finalizar a missão, sendo limitados a até 70 contratos por semana, distribuido da forma que você quiser. Lembrando que: Ao completar a quantidade limite de desafios da categoria, você não poderá mais desafiar aquela categoria.<br/><br/>
                    Como avisei, ainda não iremos colocar as recompensas finais e de ranking, deixaremos como uma surpresa pros primeiros a concluirem, assim que alguém concluir, iremos atualizar essa seção com todas as recompensas.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}