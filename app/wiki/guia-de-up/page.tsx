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
                <div className="rounded-lg border bg-card p-6">
                  <h1 className="text-2xl font-semibold mb-4">Em breve!</h1>
                  <p className="text-muted-foreground">
                    Página em construção.
                  </p>
                </div>

                {/* <Tabs defaultValue="geral" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="geral">Geral</TabsTrigger>
                    <TabsTrigger value="guia">Guia</TabsTrigger>
                    <TabsTrigger value="dicas">Dicas</TabsTrigger>
                  </TabsList>

                  <TabsContent value="geral" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <h2 className="text-xl font-semibold mb-4 text-center">Visão Geral</h2>
                      <p className="text-muted-foreground">
                        Informações gerais sobre os diferentes tipos de boost disponíveis no jogo.
                      </p>
                    </div>

                    <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.jpg"
                        alt="Exemplo de Boost"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="guia" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <h2 className="text-xl font-semibold mb-4 text-center">Como Usar Boosts</h2>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Onde encontrar boosts</li>
                        <li>Como ativar diferentes tipos de boost</li>
                        <li>Duração dos boosts</li>
                      </ol>
                    </div>
                  </TabsContent>

                  <TabsContent value="dicas" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <h2 className="text-xl font-semibold mb-4 text-center">Dicas e Truques</h2>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Melhores momentos para usar boost</li>
                        <li>Combinações eficientes de boost</li>
                        <li>Estratégias de maximização</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs> */}
              </div>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}