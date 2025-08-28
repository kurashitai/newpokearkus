"use client";

import { Sidebar } from "@/components/sidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchButton } from "@/components/search-button";

export default function WikiPage() {
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
                {/* Cabeçalho da Página */}
                <div className="rounded-lg border bg-card p-6">
                  <h1 className="text-2xl font-semibold mb-4">Outlands</h1>
                  <p className="text-muted-foreground">
                    As Outlands são uma outra mecânica bem conhecida no jogo, là os Pokemons dão mais Experiência ao serem derrotados, e possuem uma quantidade de drop melhorada, se tornando um ótimo local para conseguir tanto Grana quanto Level, fora a grande quantidade de Stones que dropa là, se tornando um local muito necessário pra quem quer <a href="wiki/boost" className="text-primary hover:underline">Boostar</a> seus Pokemons.<br/><br/>
                    Outra função das Outlands é ser a principal forma de conseguir <a href="/wiki/helds" className="text-primary hover:underline">Held Itens</a>, quanto maior o nível da Outland, melhor o farm de helds, a Experiência e o Loot.<br/>
                    Atuamente existem 3 outlands, sendo eles: Outland 1, Ethereal Glade&apos;s (Outland 2) e Lost Wild Sanctuary (Outland 3), e os seus níveis de acesso são: Outland 1: Nível 100 até o Nível 250, Outland 2: Nível 250 até o Nível 400 e Outland 3: Nível 350+.<br/><br/>
                    Dentro das Outlands existem algumas missões especiais que são necessárias para progredir no jogo e liberar as Outlands posteriores.<br/>
                    Essas missões tem ótimas recompensas, sendo algumas delas <a href="/wiki/awaken" className="text-primary hover:underline">Awaken Boost</a> para elevar alguns Pokemons até o tier Gold, aumentando assim a sua força.<br/><br/>

                    <br/>
                  </p>
                </div>

                {/* Tabs de Navegação */}
                <Tabs defaultValue="outland1" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="outland1">Outland 1</TabsTrigger>
                    <TabsTrigger value="outland2">Ethereal Glade&apos;s</TabsTrigger>
                    <TabsTrigger value="outland3">Lost Wild Sanctuary</TabsTrigger>
                  </TabsList>

                  {/* Conteúdo Geral */}
                  <TabsContent value="outland1" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <h2 className="text-xl font-semibold mb-4 text-center">Como acessar a Outland 1</h2>
                      <ol className=" list-disc list-inside space-y-2">
                        <li className="text-muted-foreground">A Outland 1 poderá ser acessada através do NPC Outlander, que fica situado no Trade Center (TC), te dando 3 opções de Spawn na Outland 1, porém os 3 Spawns podem ser acessados lá dentro, independente de onde você escolha.</li>
                        <li className="text-muted-foreground">Tudo que você precisa para acessar a Outland 1, é ter o Nível 100 para entrar.</li><br/>
                        </ol>
                      <h2 className="text-xl font-semibold mb-4 text-center">Tipagens encontradas em cada parte</h2>
                      <ol className=" list-disc list-inside space-y-2">
                      <li className="text-muted-foreground">Outland Leste: Fogo, Pedra, Lutador e Venenoso.</li>
                      <li className="text-muted-foreground">Outland Oeste: Terra, Gelo, Normal e Fogo.</li>
                      <li className="text-muted-foreground">Outland Norte: Psiquico, Inseto, Planta e Água.</li>
                      </ol>
                    </div>
                  </TabsContent>

                  {/* Guia Detalhado */}
                  <TabsContent value="outland2" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <h2 className="text-xl font-semibold mb-4 text-center">Como acessar a Outland 2</h2>
                      <ol className="list-disc list-inside space-y-2">
                        <li className="text-muted-foreground">Encontrar o NPC Railander em Johto, na cidade de Cianwood, na posição (519, 2635, 7), completar a task inicial dele que pede 200 gemas de cada elemento, e pagar uma pequena taxa para acessar a Outland 2.</li>
                        <li className="text-muted-foreground">Ter level 250+.</li>
                        <br/>
                      </ol>
                    </div>
                  </TabsContent>

                  {/* Dicas e Truques */}
                  <TabsContent value="outland3" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                    <h2 className="text-xl font-semibold mb-4 text-center">Como acessar a Outland 3</h2>
                      <ol className="list-disc list-inside space-y-2">
                        <li className="text-muted-foreground">Encontrar o NPC Alucard em Hoenn, na cidade de Sootopolis, na posição (1193, 3333, 2), completar a task inicial dele que pede 1000 gemas de cada elemento, 100 Tokens de cada e pagar uma pequena taxa para acessar a Outland 3.</li>
                        <li className="text-muted-foreground">Ter level 350+.</li>
                        <br/>
                      </ol>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}