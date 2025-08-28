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
                  <h1 className="text-2xl font-semibold mb-4">Gentleman Brooks</h1>
                  <p className="text-muted-foreground">
                  Para tornar a progressão mais linear e recompensadora nos estágios iniciais e intermediários, apresentamos o Gentleman Brooks, um NPC dedicado a ajudar os jogadores conforme avançam de nível. Ele será um mentor generoso, garantindo que sua jornada seja equilibrada até você estar preparado para seguir sozinho.<br/><br/>
                  Como o Gentleman Brooks Funciona:<br/><br/>
                  Ele irá aparecer pra você em determinados níveis, te guiando em sua jornada.<br/><br/>
                  Início do Suporte:<br/><br/>
                  O Brooks começa a auxiliar os jogadores a partir do nível 50, garantindo que a transição entre os estágios iniciais e intermediários seja suave e recompensadora.<br/><br/>
                  Seu suporte se encerra no nível 350, momento em que o jogador já estará equipado e experiente o suficiente para seguir com sua própria estratégia e exploração.<br/><br/>
                  Conforme o jogador sobe de nível, o Brooks oferece recompensas ajustadas à progressão, que podem incluir:<br/><br/>
                  Itens úteis como: Pokéballs, Revives, Stones e alguns outros itens.<br/><br/>
                  No nível 350 ele irá falar com você e te guiar para os últimos passos sob sua tutoria.
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