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
                  <h1 className="text-2xl font-semibold mb-4">Shiny Ditto e Memory System</h1>
                  <p className="text-muted-foreground">
                    O Shiny Ditto é um Pokémon conhecido por toda a comunidade por causa da sua habilidade de se transformar em qualquer Pokémon.<br/><br/>
                    Aqui no Poke Arkus não poderia faltar eles, não é mesmo?<br/><br/>
                    O Shiny Ditto funciona da seguinte forma:<br/><br/>
                    O Shiny Ditto consegue se transformar em praticamente qualquer Pokémon até o Tier Prata.<br/><br/>
                    Lembrando que o Shiny Ditto transformado é um pouco mais fraco que a versão original do Pokémon, mas tem algumas belas vantagens: Não precisar capturar o Pokémon em questão, e não precisar Boostar ou Heldar vários Pokémons diferentes só pra um uso talvez momentâneo.<br/><br/>
                    Isso mesmo, o Pokémon transformado recebe o Boost e os Helds que o Ditto está utilizando! E as vantagens não param por aí: Em Tasks de matar algum Pokémon utilizando um Pokémon específico, caso você se transforme com o Ditto no Pokémon que precisa utilizar para matar, a task irá contar como se você estivesse matando com aquele Pokémon.<br/><br/>
                    Para reverter, tudo que você precisa fazer é clicar com o botão direito no Ditto e selecionar a opção &quot;Reverter&quot;. Lembrando que depois de algumas horas transformado, o Ditto volta ao normal.<br/><br/>
                    É aí que entra o novo sistema: Ditto Memory!<br/><br/>
                    O Ditto Memory funciona da seguinte forma: Para usar o Ditto Memory, tudo que você precisa fazer é dar use no Memory e utilizar no Shiny Ditto!<br/><br/>
                    Para ativar é só clicar com o botão direito no Ditto e selecionar a opção &quot;Ditto Memory&quot;.<br/><br/>
                    Depois de clicar nessa opção, você irá ter acesso aos seus Pokémons salvos, sendo eles até 3 opções diferentes!<br/><br/>
                    O Shiny Ditto e Ditto Memory só poderão ser obtidos através do Arkus Shop por Arkus Coin, ou na mão de players através de negociações diretas.
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