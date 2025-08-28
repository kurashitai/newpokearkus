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
                <div className="rounded-lg border bg-card p-6">
                  <h1 className="text-2xl font-semibold mb-4">Charms</h1>
                  <p className="text-muted-foreground">
                    Charms são itens que aumentam algumas rates, cada charm aumentando a sua própria rate. Os charms consistem em: Shiny Charm, Mega Charm, Catcher Booster, Exp Booster.<br/><br/>
                  </p>
                  <ol className="list-disc list-inside space-y-2">
                    <li className="text-muted-foreground">Shiny Charm: Aumenta consideravelmente a chance de Spawnar um Pokemon Shiny ao matar um pokemon.</li>
                    <li className="text-muted-foreground">Mega Charm: Aumenta consideravelmente a chance de Spawnar um Pokemon Mega ao matar um pokemon, porém o Mega Charm só funciona depois do level 250.</li>
                    <li className="text-muted-foreground">Catcher Booster: Da 1 ponto extra a todas as Pokebolas que você jogar no Pokemon, exceto Premier Ball que não possui pontuação. Também aumenta um pouco a chance de captura na sorte.</li>
                    <li className="text-muted-foreground">Exp Booster: Aumenta a experiência obtida ao derrotar os Pokemons, normalmente o principal Booster de Exp é a estrela, que aumenta em 100% a experiência base obtida.	</li>
                  </ol><br/>
                  <p className="text-muted-foreground">Depois de ativar o Charm, o item será utilizado e desaparecerá, porém você conseguirá acompanhar o tempo restante de todos os seus charms atraés do comando !charms.<br/><br/>
                    Lembrando que uma vez que você utilize qualquer Charm, mesmo que você deslogue ele continuará contando.
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