"use client";

import { Sidebar } from "@/components/sidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchButton } from "@/components/search-button";

export const dynamic = 'force-dynamic';

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
                  <h1 className="text-2xl font-semibold mb-4">Shinys e suas Evoluções</h1>
                  <p className="text-muted-foreground">
                    O Sistema de Shiny no Poke Arkus funciona da seguinte forma: Ao matar um Pokemon na Hunt, ele tem chance de Respawnar como Shiny na próxima vez que renascer, os Pokemons Shiny são mais fortes e tem bem mais HP que sua versão normal.<br/>
                    Ao derrotar o Pokemon Shiny, tudo que você precisa fazer é jogar qualquer bola nele e torcer para capturar, porém caso não capture, não se preocupe, em algum momento ele irá entrar na bola graças ao <a href="/wiki/sistema-de-captura" className="text-primary hover:underline">Sistema de Captura</a>.<br/><br/>
                    Para poder evoluir o seu Pokemon Shiny, vocé pode usar o Sistema de Evoluções, que consiste em usar a Shiny Stone do Clã do seu Pokemon para evoluir um Pokemon Shiny em um Pokemon Shiny Evoluido, por exemplo, evoluir o Shiny Metapod para um maravilhoso Shiny Butterfree!<br/><br/>
                    Uma vez evoluido, o Pokemon Shiny Evoluido irá ter um aumento de HP, ataque e defesa, o que significa que ele irá ser mais forte e precisará de mais nível para ser utilizado, porém não se preocupe, pois você não consegue evoluir Pokemons que você não tem nível para usar.<br/><br/>
                    A Shiny Stone do Clã pode ser obtida ao juntar 3 Fragmentos, 30 Essências, 10 Stones, todos do mesmo clã, além de uma pequena taxa de 250k por Shiny Stone.<br/>
                    Em posse dos materiais, tudo que você precisa fazer é se deslocar até a cidade de Pallet, falar com a professora de lá, escolher o elemento da Shiny Stone que você deseja e pronto! Depois disso é só utilizar a Shiny Stone pra evoluir o seu tão amado Pokemon.<br/><br/>  
                    Lembrando que tanto os Fragmentos quanto as Essências só são obtidas ao matar Pokemons Shiny, porém fique atento, os Pokemons de ÚLTIMA ou de única evolulão não dropam nem Fragmento nem Essência.<br/><br/>
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