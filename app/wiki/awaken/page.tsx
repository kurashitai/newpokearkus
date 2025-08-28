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
                  <h1 className="text-2xl font-semibold mb-4">Awaken Stone e Awaken Boost</h1>
                  <p className="text-muted-foreground">
                    Os sistemas de Awakening Stone e Awakening Boost vieram com o intuito de adicionar mais dinamismo e diversão ao jogo, tornando possível aumentar o nível de poder e tier de seus Pokemons prediletos.<br/><br/>
                    A Awakening Stone serve para aumentar o poder do seu Pokemon junto com o Tier dele, modificando o moveset do Pokemon, enquanto a Awakening Boost serve pra aumentar os status do Pokemon e aumentar também o seu Tier.<br/><br/>
                    Tanto as Awakening Stones quanto as Awakening Boosts podem ser obtidas de várias formas diferentes, sendo elas: <a href="/wiki/tasks/" className="text-primary hover:underline">Tasks</a>, <a href="/wiki/dimensional-zone/" className="text-primary hover:underline">Dimensional Zones</a>, Quests, entre outras.<br/><br/>
                    Para utilizar a Awakening Stone é simples, basta ter o Pokemon que você quer dar Awaken, e utilizar a Awakening Stone nele como se fosse evoluir, e assim ele irá se transformar em um Pokemon Awaken. Com isso, ele irá ter o moveset e tier de seu Pokemon baseado na Awakening Stone que vocé utilizou.<br/><br/>
                    Porém para utilizar a Awakening Boost é um pouco diferente, você precisará de 6 sucessos no uso da Awakening Boost para o seu Pokemon subir de Ranking, o uso da Awakening Boost tem chance de falhar caso você use apenas a Awakening Boost, porém caso você queira ter 100% de chance no uso da Awakening Boost, existe um item chamado Potencialy Ring, esse item pode ser obtido no Shop por Arkus Coin, porém cada Awakening Boost que você use, irá consumir o Potencialy Ring.<br/><br/>
                    Pokemons com Awakening são representados pela Cor Vermelha na Tier List, enquanto Pokemons com Awakening Boost são representados pela Cor Azul.<br/><br/>
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