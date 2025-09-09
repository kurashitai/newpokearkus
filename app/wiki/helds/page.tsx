"use client";

import { Sidebar } from "@/components/sidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchButton } from "@/components/search-button";
import { OffensiveHeldsTable } from "@/components/offensive-helds-table";
import { DefensiveHeldsTable } from "@/components/defensive-helds-table";
import { UtilityXHeldsTable } from "@/components/utility-x-helds-table";
import { UtilityYHeldsTable } from "@/components/utility-y-helds-table";

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
                  <h1 className="text-2xl font-semibold mb-4">Helds</h1>
                  <p className="text-muted-foreground">
                  Os Held Item trata-se de um item que pode ser equipado a um Pokémon ou um Device.<br/><br/>
                  Este item tem algo conhecido como Tier, que nada mais é que o seu nível, ou seja, quanto maior for o Tier de um Held Item, melhor e mais raro ele será. Com as diferenciações de tier, também há a alteração de coloração do Held Item, baseado no tier, de modo que, todo Held Item Tier 1 é marrom e todo Held de Tier 7 é vermelho.<br/><br/>
                  Além dos Tiers, os Helds se dividem em X e Y, onde o Held X tende a ser, na maioria das vezes, focado pra combate, e o Held Y tende a ser mais utilitário.<br/><br/>
                  Todo Pokémon pode possuir 1 held X e 1 held Y, para equipar o held é simples: O Pokémon deve estar em sua mochila para equipar um Held Item, com isso clique com o botão direito no Held Item e com o esquerdo no Pokémon escolhido.<br/><br/>
                  Lembrando que colocar um held X em cima de outro held X irá substituir o held anterior, fazendo com que ele seja perdido, então tome bastante cuidado.<br/><br/>
                  Você consegue remover o Held seguramente ao utilizar o item Held Removal de mesmo tipo do Held que você deseja remover, sendo X ou Y. O Held Removal pode ser obtido no Online Shop ou no Arkus Shop.<br/><br/>
                  O modo de obtenção dos Helds é relativamente simples, basta você dropar as tokens nas <a href="/wiki/outlands/" className="text-primary hover:underline">Outlands</a>, com a quantidade correta de Tokens é só você se dirigir ao NPC Silas, dentro do Trade Center (TC) e pronto! É só trocar as Tokens por Held Box e abrir elas.
                  </p><br/>

                  <ol className="list-disc list-inside space-y-2">
                  <li className="text-muted-foreground">Held Box Tier: (1 a 2) - 20 Devoted Token </li>
                  <li className="text-muted-foreground">Held Box Tier: (1 a 3) - 50 Devoted Token </li>
                  <li className="text-muted-foreground">Held Box Tier: (2 a 3) - 100 Devoted Token </li>
                  <li className="text-muted-foreground">Held Box Tier: (3 a 4) - 30 Might Token </li>
                  <li className="text-muted-foreground">Held Box Tier: (3 a 5) - 50 Might Token </li>
                  <li className="text-muted-foreground">Held Box Tier: (4 a 6) - 50 Honored Token </li>
                  <li className="text-muted-foreground">Held Box Tier: (5 a 6) - 100 Honored Token </li>
                  <li className="text-muted-foreground">Held Box Tier: (6 a 7) - 100 Specialist Token </li>
                  <li className="text-muted-foreground">Held Box Tier: (7) - 200 Specialist Token </li>
                  </ol><br/>

                  <p className="text-muted-foreground">

                  Outro modo de conseguir Helds e evoluir eles é através da Fusão de Helds, que pode ser feita também no TC, na máquina de fusão de Helds no lado Esquerdo do TC. A fusão requer três Helds do mesmo tier e uma quantia em dinheiro baseada no tier. Em troca, você receberá um Held aleatório de tier superior, exceto quando fundindo três Helds de tier 7, que resultam em outro Held aleatório de tier 7.<br/><br/>
                  Valores para Fusão de Helds, lembrando que esses valores são os valores INTEIROS, caso você possua VIP PLUS o valor será a METADE disso:<br/></p>
                  <ol className="list-disc list-inside space-y-2">
                  <li className="text-muted-foreground">Tier 1 para 2: 60k</li>
                  <li className="text-muted-foreground">Tier 2 para 3: 150k</li>
                  <li className="text-muted-foreground">Tier 3 para 4: 300k</li>
                  <li className="text-muted-foreground">Tier 4 para 5: 1kk</li>
                  <li className="text-muted-foreground">Tier 5 para 6: 2kk</li>
                  <li className="text-muted-foreground">Tier 6 para 7 e 7 para 7: 2kk</li>
                  </ol><br/>
                  <h1 className="text-2xl font-semibold mb-4">Device</h1>
                  <p className="text-muted-foreground">Atualmente é possível obter até 2 devices por personagem, sendo eles únicos, ou seja, não podem ser comercializados.<br/></p>
                  <p className="text-muted-foreground">O Device é um item que serve para adicionar mais um held ao seu Pokemon, quebrando a limitação de 2 helds por Pokemon, com o diferencial que você pode remover o Device do pokemon em questão apenas digitando !device no chat.<br/></p>
                  <p className="text-muted-foreground">Ao colocar um Device no seu Pokemon, o mesmo se tornará ÚNICO enquanto estiver com o Device equipado, porém perderá o status de único ao remover o Device.<br/></p>
                  <p className="text-muted-foreground">Para utilizar o Device é bem simples, basta colocar um Held no Device, colocar o Device no primeiro slot da sua bolsa e o Pokemon que você quer colocar o Device no segundo slot, depois é só dar use no Device e clicar no Pokemon que você deseja, pronto! Device Colocado.<br/></p>
                  <p className="text-muted-foreground">Lembrando que: Não é possível colocar dois Devices no mesmo Pokemon, não é possível colocar Helds repetidos, por exemplo: Se o Pokemon já tem o Held Attack e você também tem um Held Attack no Device, não é possível equipar o Pokemon com o Device.<br/></p>
                  <p className="text-muted-foreground">Para remover um Held do Device, é só colocar o Device no Pokemon e usar um Device Removal do tipo do Held que está no device, sendo X ou Y.<br/><br/></p>
                  <p className="text-muted-foreground">Os dois Devices podem ser obtidos da seguinte forma: O Primeiro Device está disponível no Arkus Shop na aba Mercado, pelo valor de 50 Arkus Coin, enquanto o segundo Device pode ser obtido através de uma quest em Mauville, no NPC Sr. Birch, na posição 786, 3211, 7. Lembrando que a ordem de obtenção dos Devices não importa.<br/></p>
                  <p className="text-muted-foreground">A quest do Device se divide em 4 partes:</p><br/>
                  <ol className="list-disc list-inside space-y-2">
                  <li className="text-muted-foreground">Parte 1: Entregar 150 Devoted Tokens, 100 Might Tokens, 50 Honored Tokens </li>
                  <li className="text-muted-foreground">Parte 2: Entregar 1 Sand Eye </li>
                  <li className="text-muted-foreground">Parte 3: Entregar um Kabuto </li>
                  <li className="text-muted-foreground">Parte 4: Entregar 250 Electric Box, 100 Electric Spheres </li>
                  </ol><br/>
                  <p className="text-muted-foreground italic">* O Device se comporta da mesma forma que o Pokemon, então se você colocar um Held em cima do outro, o anterior irá sumir, então tome bastante cuidado com isso. </p>

                </div><br/>

                <Tabs defaultValue="ofensivos" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="ofensivos">Ofensivos</TabsTrigger>
                    <TabsTrigger value="defensivos">Defensivos</TabsTrigger>
                    <TabsTrigger value="utilitariosX">Utilitários X</TabsTrigger>
                    <TabsTrigger value="utilitariosY">Utilitários Y</TabsTrigger>
                  </TabsList>

                  <TabsContent value="ofensivos" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <OffensiveHeldsTable />
                    </div>
                  </TabsContent>

                  <TabsContent value="defensivos" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <DefensiveHeldsTable />
                    </div>
                  </TabsContent>

                  <TabsContent value="utilitariosX" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <UtilityXHeldsTable />
                    </div>
                  </TabsContent>

                  <TabsContent value="utilitariosY" className="space-y-4">
                    <div className="rounded-lg border bg-card p-6">
                      <UtilityYHeldsTable />
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