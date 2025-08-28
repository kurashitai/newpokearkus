"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

interface WikiTab {
  title: string;
  content: {
    title: string;
    description?: string;
    benefits?: {
      task: number;
      objetivo: string;
      descricao: string;
    }[];
    secondTitle?: string;
    secondDescription?: string;
    missions?: {
      rank: number;
      task: string;
      reward: string;
      status: string;
    }[];
    thirdTitle?: string;
    thirdDescription?: string;
    exclusivePokemon?: {
      name: string;
      type: string;
      tier: string;
      imageUrl: string;
    };
  };
  icon?: {
    src: string;
    alt: string;
  };
}

interface WikiTabsProps {
  tabs: WikiTab[];
}

export function WikiTabs({ tabs }: WikiTabsProps) {
  return (
    <Tabs defaultValue={tabs[0]?.title.toLowerCase()} className="w-full">
      <TabsList className="w-full flex-wrap h-auto justify-center gap-4 grid-cols-10">
        {tabs.map((tab) => (
          <TabsTrigger value={tab.title.toLowerCase()} className="p-1" key={tab.title}>
            {tab.icon ? (
              <Image
                src={tab.icon.src}
                alt={tab.icon.alt}
                width={32}
                height={32}
                className="hover:scale-110 transition-transform w-8 h-8 lg:w-10 lg:h-10"
              />
            ) : (
              tab.title
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.title}
          value={tab.title.toLowerCase()}
          className="mt-4 space-y-8 text-center"
        >
          {/* Primeira Seção - Benefícios */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">{tab.content.title}</h2>
            {tab.content.description && (
              <p className="text-muted-foreground text-sm sm:text-base mb-4">{tab.content.description}</p>
            )}
            
            {tab.content.benefits && (
              <div className="overflow-x-auto text-left">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left text-sm sm:text-base whitespace-nowrap">Task</th>
                      <th className="p-2 text-left text-sm sm:text-base whitespace-nowrap">Objetivo</th>
                      <th className="p-2 text-left text-sm sm:text-base whitespace-nowrap">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tab.content.benefits.map((benefit, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 text-sm sm:text-base whitespace-nowrap">{benefit.task}</td>
                        <td className="p-2 text-sm sm:text-base whitespace-nowrap">{benefit.objetivo}</td>
                        <td className="p-2 text-sm sm:text-base whitespace-nowrap">{benefit.descricao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Segunda Seção - Missões */}
          {tab.content.secondTitle && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">{tab.content.secondTitle}</h2>
              {tab.content.secondDescription && (
                <p className="text-muted-foreground text-sm sm:text-base mb-4">{tab.content.secondDescription}</p>
              )}
              
              {tab.content.missions && (
                <div className="overflow-x-auto text-left">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left text-sm sm:text-base whitespace-nowrap">Rank</th>
                        <th className="p-2 text-left text-sm sm:text-base whitespace-nowrap">Tarefa</th>
                        <th className="p-2 text-left text-sm sm:text-base whitespace-nowrap">Recompensa</th>
                        <th className="p-2 text-left text-sm sm:text-base whitespace-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tab.content.missions.map((mission, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 text-sm sm:text-base whitespace-nowrap">{mission.rank}</td>
                          <td className="p-2 text-sm sm:text-base whitespace-nowrap">{mission.task}</td>
                          <td className="p-2 text-sm sm:text-base whitespace-nowrap">{mission.reward}</td>
                          <td className="p-2 text-sm sm:text-base whitespace-nowrap">{mission.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Terceira Seção - Pokémon Exclusivo */}
          {tab.content.thirdTitle && tab.content.exclusivePokemon && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">{tab.content.thirdTitle}</h2>
              {tab.content.thirdDescription && (
                <p className="text-muted-foreground text-sm sm:text-base mb-4">{tab.content.thirdDescription}</p>
              )}
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-64 h-64">
                  <Image
                    src={tab.content.exclusivePokemon.imageUrl}
                    alt={tab.content.exclusivePokemon.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <p><strong>Nome:</strong> {tab.content.exclusivePokemon.name}</p>
                  <p><strong>Tipo:</strong> {tab.content.exclusivePokemon.type}</p>
                  <p><strong>Tier:</strong> {tab.content.exclusivePokemon.tier}</p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
