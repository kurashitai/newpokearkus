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
                  <h1 className="text-2xl font-semibold mb-4">Meta de Doações ou GOAL</h1>
                  <p className="text-muted-foreground">
                    O Sistema de meta de doações, também conhecido como Goal, é um sistema que ajuda a manter o servidor Online enquanto fornece cosméticos únicos para os jogadores como forma de agradecimento.<br/><br/>
                    A Meta de doações é universal e conta tanto pro mundo Harmony quanto pro mundo Chaos. O Goal tem a meta global de 4500 Arkus Coins (AC) compradas, e como meta pessoal 30 AC ou gastar 40 AC no Shop de Arkus Coin, troca entre jogadores não conta.<br/><br/>
                    Ao completar a meta de doações, o jogador irá ganhar recompensas exclusivas do Goal. Porém para receber a recompensa do Goal em si, a meta global de 4500 AC precisará ser batida, caso contrário a recompensa não poderá ser resgatada.<br/><br/>
                    Além das recompensas exclusivas da Meta Global, também tem a recompensa por Gasto em qualquer item dentro do Arkus Shop, exceto a Mudança de Nome. A meta pessoal libera os objetivos nos níveis: 50, 100, 200 e 300. E os gastos são respectivamente: 10, 20, 30 e 40 AC.<br/><br/>
                    Ao bater a meta pessoal situada a Direita do Goal, é só clicar nos baús para receber sua recompensa.<br/><br/> 
                    
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