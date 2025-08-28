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
                  <h1 className="text-2xl font-semibold mb-4">Boost</h1>
                  <p className="text-muted-foreground">
                  O sistema de Boost no Poke Arkus funciona de forma um pouco diferente, em vez de utilizar as stones de elemento diretamente nos Pokemons, o jogador precisará trocar elas pela Boost Stone no Trade Center (TC). <br/><br/>
                   Essa Boost Stone pode ser usada para aumentar aumentar o nível do Pokemon, fazendo com que o poder de ataque, defesa e vida de um Pokemon aumente junto, porém com o efeito colateral de aumentar o nível necessário para uso do Pokemon baseado no nível de Boost do mesmo. <br/><br/>
                   Por exemplo: Se um pokemon que necessita de nível 100 para utilizar receber um boost +50, ele precisará de nível 150 para ser utilizado.<br/><br/>
                   As Boost Stone são divididas em 3 grupos, sendo eles: Boost +50, Boost +60 e Boost +70.<br/>
                    A Boost +50 só consegue elevar o nível de Boost até +50.<br/>
                   A Boost +60 consegue elevar o nível de Boost do +50 até +60.<br/>
                    A Boost +70 consegue elevar o nível de Boost do +60 até +70.<br/><br/>
                    Para Boostar seu pokemon é bem simples, tudo que você precisa é: Soltar o Pokemon que você quer Boostar, depois selecionar a Boost Stone que deseja usar, dar use nela e utilizar no seu Pokemon, e pronto! O Pokemon será Boostado.
                  </p>
                </div>

                {/* Tabs de Navegação */}
                <Tabs defaultValue="geral" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="geral">Boost +50</TabsTrigger>
                    <TabsTrigger value="guia">Boost +60</TabsTrigger>
                    <TabsTrigger value="dicas">Boost +70</TabsTrigger>
                  </TabsList>

                  {/* Conteúdo Geral */}
                  <TabsContent value="geral" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <h2 className="text-xl font-semibold mb-4 text-center">Como conseguir:</h2>
                      <p className="text-md">
                        A maneira mais fácil de conseguir Boost +50 é via Trade Center (TC).<br/>
                        Para isso, basta entrar no Trade Center, procurar o NPC Chimbinha que irá realizar a troca das suas Stones Elementais por Boost +50, e pronto!<br/>
                        Lembrando que as trocas não são 1 por 1, são 15 Stones Elementais=1 Boost Stone.<br/><br/>
                      </p>
                    </div>
                  </TabsContent>

                  {/* Guia Detalhado */}
                  <TabsContent value="guia" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <h2 className="text-xl font-semibold mb-4 text-center">Como conseguir:</h2>
                      <p className="text-md">
                        Boost +60 poderá ser obtido através de chance, ao abrir o baú da <a href="/wiki/dimensional-zone" className="text-primary underline">Zona Dimensional</a> de tier Ouro ou superior, ou no Dz Shop, situado no Trade Center (TC).
                      </p>
                    </div>
                  </TabsContent>

                  {/* Dicas e Truques */}
                  <TabsContent value="dicas" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <h2 className="text-xl font-semibold mb-4 text-center">Como conseguir:</h2>
                      <p className="text-md">
                        Boost +70 poderá ser obtido atravéz de chance, ao abrir o baú da <a href="/wiki/dimensional-zone" className="text-primary underline">Zona Dimensional</a> de tier Ruby, ou no Dz Shop, situado no Trade Center (TC).
                      </p>
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