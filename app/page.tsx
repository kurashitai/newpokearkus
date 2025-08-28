import { QuickLinks } from "@/components/quick-links";
import { MainContent } from "@/components/main-content";
import { Sidebar } from "@/components/sidebar";
import { HeroSlider } from "@/components/hero-slider";
import { SocialButtons } from "@/components/social-buttons";
import Image from "next/image";

export default function Home() {
  const profissoes = [
    { nome: "Profissão 1", descricao: "Descrição detalhada da profissão 1 e suas características únicas." },
    { nome: "Profissão 2", descricao: "Descrição detalhada da profissão 2 e suas características únicas." },
    { nome: "Profissão 3", descricao: "Descrição detalhada da profissão 3 e suas características únicas." },
    { nome: "Profissão 4", descricao: "Descrição detalhada da profissão 4 e suas características únicas." },
  ];

  return (
    <main className="overflow-x-hidden">
      <div className="container mx-auto py-6 px-2 sm:px-4">
        <HeroSlider />
        
        {/* <div className="w-full overflow-hidden mt-6 lg:py-12">
          <div className="professions-grid">
            {profissoes.map((prof, index) => (
              <div key={index} className="flip-div-wrapper">
                <div className="flip-div-inner">
                  <div className="flip-div-front">
                    <div className="relative w-full h-full">
                      <Image
                        src="/teste.jpg"
                        alt={prof.nome}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                        priority={index < 2}
                      />
                      <div className="absolute bottom-[7%] right-[-3%] w-[85%]">
                        <div className="relative">
                          <Image
                            src="/banner.jpg"
                            alt="Banner"
                            width={328}
                            height={104}
                            className="w-full h-auto"
                          />
                          <div className="absolute left-[5%] top-[20%] h-[65%] w-[90%] flex justify-center items-center overflow-hidden">
                            <span className="font-sono font-bold text-white uppercase prof-name">
                              {prof.nome}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flip-div-back">
                    <div className="flex items-center justify-center h-full p-6">
                      <p className="flip-card-text text-white font-sono">
                        {prof.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <SocialButtons />
      </div>
      <div className="justify-between text-center items-center p-10">
        <p className=" font-extrabold">
          Divirta-se com outros jogadores em um mundo repleto de Pokémons e
          aventuras.
        </p>
        <p>
          © 1996 - 2023 | Todos os Pokémons e seus respectivos nomes são
          direitos reservados a Nintendo.
        </p>
        <p>Um game feito de fã para fã | Arkus Team.</p>
      </div>
    </main>
  );
}
