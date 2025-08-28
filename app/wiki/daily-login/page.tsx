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
                  <h1 className="text-2xl font-semibold mb-4">Daily Login</h1>
                  <p className="text-muted-foreground">
                    O Daily Login tem a função de dar recompensas aos jogadores que fizerem login diariamente.<br/><br/>
                    Existe dois tipos de recompensa para o Daily Login, o Calendário e o Online Points.<br/><br/>
                    O Calendário do Daily Login te da várias recompensas diferentes ao longo do mês, variando entre: Premier Ball, Delta Ball, Booster de Experiência, Chaves de Bronze, Prata e Ouro. E caso você complete os 28 dias logados sem perder nenhum dia, você receberá uma recompensa extra!<br/><br/>
                    Além das recompensas em Item, o Calendário também te da pontos em alguns dias específicos, são eles: 1, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26, 28. Esses pontos podem ser utilizados para ativar Boosts ainda no Calendário, ao clicar em Activate no canto inferior. Jogadores com conta gratuita ganham 1 ponto nos dias anteriormente citados, jogadore VIP ganham 2 pontos, jogadores VIP Plus ganham 3.<br/><br/>
                    Os Bônus que podem ser ativados consomem 1 ponto por bônus, são eles: Experiência de 3H, Taxa de Obtenção (Loot Booster) de 2H, taxa de captura (Catch Boost) de 3H.<br/><br/>
                    Lembrando que o Calendário tem a função de dar recompensas aos jogadores que fizerem login diariamente, mas caso o jogador perca um dia, ele pode comprar as recompensas do dia perdido ai clicar no X dentro do dia perdido, porém precisará pagar o valor de 1 Arkus Coin pra isso.<br/><br/>
                    O Online Points tem a função de dar recompensas aos jogadores que ficarem online. A cada 1H online, você recebe 1 ponto, esses pontos você consegue gastar na loja de Online Points. O Sistema de Online Points também te recompensa pelo tempo logado fora os pontos. Você ganha recompensas com 20 minutos, 40 minutos, 1 hora, 2 horas, 3 horas e 4 horas logado.<br/><br/> 
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