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
                  <h1 className="text-2xl font-semibold mb-4">Sistema de Task</h1>
                  <p className="text-muted-foreground">
                    O Sistema de Tasks do Poke Arkus se divide em 4 categorias: Captura, Batalha, Coleta e Caça.<br/><br/>
                    </p>
                    <ol className="list-disc list-inside space-y-2">
                    <li className="text-muted-foreground">Captura: Tasks relacionadas a captura de Pokemons.</li>
                    <li className="text-muted-foreground">Batalha: Tasks relacionadas a batalhas de Pokemons com o desafio de utilizar um Pokemon específico.</li>
                    <li className="text-muted-foreground">Coleta: Tasks relacionadas a coleta de itens de certos Pokemons.</li>
                    <li className="text-muted-foreground">Caça: Tasks relacionadas a caça de Pokemons.</li>
                    </ol><br/>
                    <p className="text-muted-foreground">
                    As Tasks são limitadas em 21 tasks por semana, podendo ser concluídas quando o jogador quiser, se ele quiser completar as 21 em um único dia ele pode, porém a contagem reseta toda Segunda-Feira.<br/><br/>
                    Cada conclusão de Task concede uma quantidade de recompensas por conclusão, baseada no seu Tasker Level e na dificuldade da Task, sendo essas recompensas:<br/>
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li className="text-muted-foreground">Grana.</li>
                      <li className="text-muted-foreground">Experiência.</li>
                      <li className="text-muted-foreground">Experiência de Tasker.</li>
                      <li className="text-muted-foreground">Premier Ball.</li>
                      <li className="text-muted-foreground">Ametista.</li>
                    </ul><br/>
                    <p className="text-muted-foreground">
                    As dificuldades das tasks são: Iniciante, Desafiante e Avançado.<br/>
                    Os níveis das tasks possuem algumas limitações pra não deixar as tasks sem sentido, são elas: <br/><br/>
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li className="text-muted-foreground">Easy: Level 1-99</li>
                      <li className="text-muted-foreground">Medium: Level 100-199</li>
                      <li className="text-muted-foreground">Hard: Level 200-349</li>
                      <li className="text-muted-foreground">Hardened: Level 350-600</li>
                    </ul><br/>
                    <p className="text-muted-foreground">
                    O Outro multiplicador final para as recompensas semanais é o Tasker Level.<br/><br/>
                    O Sistema de Task também conta com um sistema de Shop e de Bônus baseado no Tasker Level, o Shop tem como moeda principal a Ametista, onde você pode optar por comprar Pokemons, Addons, <a href="/wiki/awaken" className="text-primary hover:underline">Awakens</a> ou <a href="/wiki/reliquias" className="text-primary hover:underline">Reliquias</a>.<br/><br/>
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