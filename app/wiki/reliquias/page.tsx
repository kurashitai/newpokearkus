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
                  <h1 className="text-2xl font-semibold mb-4">Sistema de Relíquias</h1>
                  <p className="text-muted-foreground">
                    As relíquias são uma parte importante do Poke Arkus, pois elas dão acesso a Pokemons que tem uma curva de crescimento relativamente maior, podendo se estender até o Tier Ruby.<br/><br/>
                    Atualmente existem dois meios de obtenção de Relíquias, sendo eles: Tasker Shop e Dimensional Zone.<br/><br/>
                    Dentro das Relíquias existem algumas missões especiais que são necessárias para progredir no jogo e liberar as Relíquias posteriores.<br/><br/>
                    Ao liberar todas as relíquias de um tipo (Dz ou TS) e completar as tasks presentes na interface das relíquias, você liberará o acesso ao Pokemon especial daquele tipo de Relíquia, sendo eles: Gourgheist e sua linha evolutiva para as relíquias de Task Shop e Hatterene e sua linha evolutiva para as relíquias de Dimensional Zone.<br/><br/>
                    Tanto o Gourgheist quanto o Hatterene são pokemons de força sem igual, com movesets únicos e bastante completos. E futuramente poderão obter a versão Shiny deles ao completar algumas missões.<br/><br/>
                    Dentro das Reliquias da Gourgeist e Hatterene haverá os fragmentos de reliquias, após obter 50 fragmentos de Reliquias dos pokémons você poderá enfrentar os seus Shinys fazendo assim um desafio dinamico para aqueles que desejarem esses pokemons.<br/>
                    </p><br/><br/>
                    <h2 className="text-lg font-semibold mb-4">Lembrando que: </h2><p className="text-muted-foreground">Para acessar as relíquias não basta só obter elas, tem que liberar o acesso a elas completando algumas missões que podem ser conseguidas no NPC Aldrin Bravomonte em Sootopolis.</p>
                </div>

                {/* Tabs de Navegação */}
                <Tabs defaultValue="tasker-shop" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tasker-shop">Tasker Shop</TabsTrigger>
                    <TabsTrigger value="dimensional-zone">Dimensional Zone</TabsTrigger>
                  </TabsList>

                  {/* Conteúdo Geral */}
                  <TabsContent value="tasker-shop" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <h2 className="text-xl font-semibold mb-4 text-center">Relíquias de Tasker Shop</h2>
                      <p className="text-muted-foreground">Dentro das Relíquias de Tasker Shop, existem 20 Pokemons que podem ser obtidos, sendo 10 das versões normais e 10 das versões Shiny.<br/><br/>
                      As versões Shiny são invocadas ao derrotar as versões normais e receber os cristais de invocação deles, ao conseguir os cristais, você deve se dirigir a uma das Zonas de Invocação presentes na Relíquia, e dar Use no Cristal Gigante que tem lá.<br/>
                      Lembrando que cada Pokemon tem seu próprio cristal.</p><br/>
                      <p className="text-muted-foreground">Abaixo segue uma lista das Relíquias possíveis de se obter no Tasker Shop:</p><br/>
                      <ol className="list-disc list-inside space-y-2">
                        <li className="text-muted-foreground">Kommo-o</li>
                        <li className="text-muted-foreground">Araquanid</li>
                        <li className="text-muted-foreground">Salazzle</li>
                        <li className="text-muted-foreground">Florges</li>
                        <li className="text-muted-foreground">Drampa</li>
                        <li className="text-muted-foreground">Bisharp</li>
                        <li className="text-muted-foreground">Lurantis</li>
                        <li className="text-muted-foreground">Vikavolt</li>
                        <li className="text-muted-foreground">Dragapult</li>
                        <li className="text-muted-foreground">Mudsdale</li>
                      </ol>
                    </div>
                  </TabsContent>

                  {/* Guia Detalhado */}
                  <TabsContent value="dimensional-zone" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <h2 className="text-xl font-semibold mb-4 text-center">Relíquias de Dimensional Zone</h2>
                      <p className="text-muted-foreground">Assim como nas Relíquias de Tasker Shop, existem 20 Pokemons que podem ser obtidos, sendo 10 das versões normais e 10 das versões Shiny.<br/><br/>
                      Porém a forma de invocação dos Shiny de Relíquia de Dimensional Zone é feita através dos Cards que são obtidos dos Pokemons comuns, ao conseguir o Card é só utilizar ele no corpo do Pokemon comum de mesmo tipo do Card para se tornar Shiny, então é só derrotar e tentar sua sorte.</p><br/>
                      <p className="text-muted-foreground">Abaixo segue uma lista das Relíquias possíveis de se obter no Dimensional Zone e seu Shop:</p><br/>
                      <ol className="list-disc list-inside space-y-2">
                        <li className="text-muted-foreground">Incineroar</li>
                        <li className="text-muted-foreground">Decidueye</li>
                        <li className="text-muted-foreground">Primarina</li>
                        <li className="text-muted-foreground">Toucannon</li>
                        <li className="text-muted-foreground">Toxtricity</li>
                        <li className="text-muted-foreground">Toxapex</li>
                        <li className="text-muted-foreground">Lycanrock</li>
                        <li className="text-muted-foreground">Oranguru</li>
                        <li className="text-muted-foreground">Bewear</li>
                        <li className="text-muted-foreground">Aegislash</li>
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