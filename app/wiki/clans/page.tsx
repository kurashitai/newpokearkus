"use client";

import { QuickLinks } from "@/components/quick-links";
import { MainContent } from "@/components/main-content";
import { Sidebar } from "@/components/sidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { WikiTabs } from "@/components/wiki-tabs";
import { SearchButton } from "@/components/search-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaleficClanTable } from "@/components/malefic-clan-table";
import { PsycraftClanTable } from "@/components/psycraft-clan-table";
import IronhardClanTable from "@/components/ironhard-clan-table";
import { VolcanicClanTable } from "@/components/volcanic-clan-table";
import { NaturiaClanTable } from "@/components/naturia-clan-table";
import { GardestrikeClanTable } from "@/components/gardestrike-clan-table";
import { WingeonClanTable } from "@/components/wingeon-clan-table";
import { RaiboltClanTable } from "@/components/raibolt-clan-table";
import { OreboundClanTable } from "@/components/orebound-clan-table";
import { SeavellClanTable } from "@/components/seavell-clan-table";

export default function ClansPage() {
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
              <div className="rounded-lg border bg-card p-6 mb-6">
                <h1 className="text-xl sm:text-2xl font-semibold mb-4">Clãs do Poke Arkus</h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  O sistema de Clãs no Poke Arkus pode ser acessado por qualquer jogador em qualquer level, sendo apenas necessário o jogador se dirigir ao Trade Center, também conhecido como TC, e lá procurar a sala de clã no segundo piso del TC.<br/><br/>
                  Uma vez lá, você deve se dirigir até o portal do Clã que mais lhe agrada, conversar com o mestre daquele clã e pronto! Você é o mais novo participante daquele Clã.<br/><br/>
                  Porém não é só isso, os clãs possuem Rankings dentro deles, sendo de 1 a 5, e para progredir dentro do clã o jogador precisa completar as missões que estão disponíveis dentro do clã, e se der certo ao completar tudo, ele pode ir para o próximo level.<br/><br/>
                  Uma vez escolhido o clã, só existem duas formas de o jogador trocar de clã, sendo elas: Terminar todas as missões do rank atual e pedir pra sair, zerando totalmente o seu ranking, ou comprando a troca de clã paga, que troca você diretamente para o mesmo ranking do clã que você estava anteriormente.<br/><br/>
                  Atualmente no Poke Arkus, existem 10 Clãs, sendo eles: Malefic, Psycraft, Ironhard, Volcanic, Gardestrike, Wingeon, Naturia, Orebound, Raibolt e Seavell.<br/><br/>
                  Ao atingir o Ranking 4, o jogador poderá obter acesso ao Pokémon assinatura do seu clã em sua versão Shiny e com Despertar (Awaken), sendo esses Pokémons exclusivos do clã. Esses Pokémons são de Tier Gold e possuem uma aparência diferente e força considerável.<br/><br/>
                </p>
              </div>

              <Tabs defaultValue="malefic" className="space-y-4">
                <TabsList className="grid grid-cols-5 lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-5 gap-2 sm:gap-4 bg-transparent mb-20 md:mb-8 sm:mb-24">
                  <TabsTrigger value="malefic" className="data-[state=active]:bg-muted relative z-10 h-auto py-2">
                    <Image src="/clans/maleficb.png" alt="Malefic" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                  </TabsTrigger>
                  <TabsTrigger value="psycraft" className="data-[state=active]:bg-muted relative z-10 h-auto py-2">
                    <Image src="/clans/psycraftb.png" alt="Psycraft" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                  </TabsTrigger>
                  <TabsTrigger value="ironhard" className="data-[state=active]:bg-muted relative z-10 h-auto py-2">
                    <Image src="/clans/ironhardb.png" alt="Ironhard" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                  </TabsTrigger>
                  <TabsTrigger value="volcanic" className="data-[state=active]:bg-muted relative z-10 h-auto py-2">
                    <Image src="/clans/volcanicb.png" alt="Volcanic" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                  </TabsTrigger>
                  <TabsTrigger value="gardestrike" className="data-[state=active]:bg-muted relative z-10 h-auto py-2">
                    <Image src="/clans/gardestrikeb.png" alt="Gardestrike" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                  </TabsTrigger>
                  <TabsTrigger value="wingeon" className="data-[state=active]:bg-muted relative z-10 h-auto py-2">
                    <Image src="/clans/wingeonb.png" alt="Wingeon" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                  </TabsTrigger>
                  <TabsTrigger value="naturia" className="data-[state=active]:bg-muted relative z-10 h-auto py-2">
                    <Image src="/clans/naturiab.png" alt="Naturia" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                  </TabsTrigger>
                  <TabsTrigger value="orebound" className="data-[state=active]:bg-muted relative z-10 h-auto py-2">
                    <Image src="/clans/oreboundb.png" alt="Orebound" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                  </TabsTrigger>
                  <TabsTrigger value="raibolt" className="data-[state=active]:bg-muted relative z-10 h-auto py-2">
                    <Image src="/clans/raiboltb.png" alt="Raibolt" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                  </TabsTrigger>
                  <TabsTrigger value="seavell" className="data-[state=active]:bg-muted relative z-10 h-auto py-2">
                    <Image src="/clans/seavellb.png" alt="Seavell" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="malefic" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border bg-card">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">Clã Malefic - Mestre dos Fantasmas</h2><br /> 
                        <p className="text-muted-foreground text-sm sm:text-base">Clã responsável pelos Pokemons de elemento Fantasma, Sombrio e Venenoso. Suas técnicas podem ser meio obscuras, mas com certeza são eficiente!</p><br/>
                        <p className="text-muted-foreground text-sm sm:text-base">O clã Malefic tem como Pokemon assinatura o Shiny Misdreavus com Awaken. O Pokemon assinatura tem uma aparência diferente e força considerável.</p><br/>
                        <h3 className="text-lg font-semibold mb-4">Clã Malefic - Tasks</h3><br/>
                        <MaleficClanTable />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="psycraft" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border bg-card">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">Clã Psycraft - Mestre dos Psiquicos</h2><br />
                        <p className="text-muted-foreground text-sm sm:text-base">Clã responsável pelos Pokemons de elemento Psiquico e Fada. Suas habilidades telecinéticas permitem com que eles se comuniquem melhor com seus Pokemons!</p><br/>
                        <p className="text-muted-foreground text-sm sm:text-base">O clã Psycraft tem como Pokemon assinatura o Shiny Mr. Mime com Awaken. O Pokemon assinatura tem uma aparência diferente e força considerável.</p><br/>
                        <h3 className="text-lg font-semibold mb-4">Clã Psycraft - Tasks</h3>
                        <PsycraftClanTable />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="volcanic" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border bg-card">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">Clã Volcanic - Mestre das Chamas</h2><br />
                        <p className="text-muted-foreground text-sm sm:text-base">Clã responsável pelos Pokemons de elemento Fogo. Sua vontade e persistência ardem como chama! Eles com certeza são bem animados.</p><br/>
                        <p className="text-muted-foreground text-sm sm:text-base">O clã Volcanic tem como Pokemon assinatura o Shiny Magmar com Awaken. O Pokemon assinatura tem uma aparência diferente e força considerável.</p><br/>
                        <h3 className="text-lg font-semibold mb-4">Clã Volcanic - Tasks</h3>
                        <VolcanicClanTable />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="naturia" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border bg-card">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">Clã Naturia - Mestre das Plantas</h2><br />
                        <p className="text-muted-foreground text-sm sm:text-base">Clã responsável pelos Pokemons de elemento Planta e Inseto. Sua calmaria e conexão com a natureza podem ser bem interessantes! Eles odeiam repelentes...</p><br/>
                        <p className="text-muted-foreground text-sm sm:text-base">O clã Naturia tem como Pokemon assinatura o Shiny Parasect com Awaken. O Pokemon assinatura tem uma aparência diferente e força considerável.</p><br/>
                        <h3 className="text-lg font-semibold mb-4">Clã Naturia - Tasks</h3>
                        <NaturiaClanTable />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ironhard" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border bg-card">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">Clã Ironhard - Senhores da Resiliência</h2><br />
                        <p className="text-muted-foreground text-sm sm:text-base">Clã responsável pelos Pokemons de elemento Metal. Sua vontade de ferro e determinação são incontestáveis.</p><br/>
                        <p className="text-muted-foreground text-sm sm:text-base">O clã Ironhard tem como Pokemon assinatura o Shiny Steelix com Awaken. O Pokemon assinatura tem uma aparência diferente e força considerável.</p><br/>
                        <h3 className="text-lg font-semibold mb-4">Clã Ironhard - Tasks</h3>
                        <IronhardClanTable />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gardestrike" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border bg-card">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">Clã Gardestrike - Mestre das Lutas</h2><br />
                        <p className="text-muted-foreground text-sm sm:text-base">Clã responsável pelos Pokemons de elemento Lutador e Normal. Técnica de luta é com eles mesmo.</p><br/>
                        <p className="text-muted-foreground text-sm sm:text-base">O clã Gardestrike tem como Pokemon assinatura o Shiny Machamp com Awaken. O Pokemon assinatura tem uma aparência diferente e força considerável.</p><br/>
                        <h3 className="text-lg font-semibold mb-4">Clã Gardestrike - Tasks</h3>
                        <GardestrikeClanTable />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="wingeon" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border bg-card">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">Clã Wingeon - Mestre dos Voadores</h2><br />
                        <p className="text-muted-foreground text-sm sm:text-base">Clã responsável pelos Pokemons de elemento Voador e Dragão. Tendo o céu como seu lar, eles sempre observam os outros de cima.</p><br/>
                        <p className="text-muted-foreground text-sm sm:text-base">O clã Wingeon tem como Pokemon assinatura o Shiny Farfetchd com Awaken. O Pokemon assinatura tem uma aparência diferente e força considerável.</p><br/>
                        <h3 className="text-lg font-semibold mb-4">Clã Wingeon - Tasks</h3>
                        <WingeonClanTable />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="raibolt" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border bg-card">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">Clã Raibolt - Senhores da Eletricidade</h2><br />
                        <p className="text-muted-foreground text-sm sm:text-base">Clã responsável pelos Pokemons de elemento Elétrico. Uma coisa é fato, eles tem muita energia.</p><br/>
                        <p className="text-muted-foreground text-sm sm:text-base">O clã Raibolt tem como Pokemon assinatura o Shiny Raichu com Awaken. O Pokemon assinatura tem uma aparência diferente e força considerável.</p><br/>
                        <h3 className="text-lg font-semibold mb-4">Clã Raibolt - Tasks</h3>
                        <RaiboltClanTable />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="orebound" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border bg-card">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">Clã Orebound - Mestre Minerador</h2><br />
                        <p className="text-muted-foreground text-sm sm:text-base">Clã responsável pelos Pokemons de elemento Pedra e Terra. Sua força e persistência podem ser bem interessantes.</p><br/>
                        <p className="text-muted-foreground text-sm sm:text-base">O clã Orebound tem como Pokemon assinatura o Shiny Sandslash com Awaken. O Pokemon assinatura tem uma aparência diferente e força considerável.</p><br/>
                        <h3 className="text-lg font-semibold mb-4">Clã Orebound - Tasks</h3>
                        <OreboundClanTable />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="seavell" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border bg-card">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">Clã Seavell - Mestre dos Mares</h2><br />
                        <p className="text-muted-foreground text-sm sm:text-base">Clã responsável pelos Pokemons de elemento Agua e Gelo. Tendem a ser calmos e pacientes, igual a água, eles sempre buscam a paz.</p><br/>
                        <p className="text-muted-foreground text-sm sm:text-base">O clã Seavell tem como Pokemon assinatura o Shiny Jynx com Awaken. O Pokemon assinatura tem uma aparência diferente e força considerável.</p><br/>
                        <h3 className="text-lg font-semibold mb-4">Clã Seavell - Tasks</h3>
                        <SeavellClanTable />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
