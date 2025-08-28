import {
  Gamepad2,
  Building2,
  Cog,
} from "lucide-react";
import { KantoIcon, JohtoIcon, HoennIcon, SinnohIcon, MechanicsIcon, PokeCenterIcon } from "@/components/region-icons";

export const categories = [
  {
    title: "Kanto",
    icon: KantoIcon,
    subcategories: [
      {
        name: "Shinys e Evoluções",
        description: "Descubra como obter Pokémon Shiny e suas evoluções especiais",
        keywords: "shiny evolution evolução raro especial",
        href: "/wiki/shinys-e-evolucoes"
      },
      {
        name: "Boost System",
        description: "Aprenda sobre os diferentes tipos de boost e como utilizá-los",
        keywords: "boost aumentar poder força",
        href: "/wiki/boost"
      },
      {
        name: "Held System",
        description: "Guia completo sobre os itens held e seus efeitos",
        keywords: "held items segurar equipar",
        href: "/wiki/helds"
      },
      {
        name: "Ditto e Memory",
        description: "Tudo sobre o Ditto e suas mecânicas especiais",
        keywords: "ditto transformar copiar",
        href: "/wiki/ditto"
      },
      {
        name: "Raids",
        description: "Guia completo sobre as Raids e suas recompensas.",
        keywords: "raids Grass Fire Water Normal Rock Steel Fighting Bug Ground Ghost Dark Ice Poison Psychic Flying Fairy Electric Dragon Lukas",
        href: "/wiki/raids"
      }
    ],
  },
  {
    title: "Johto",
    icon: JohtoIcon,
    subcategories: [
      {
        name: "Outlands",
        description: "Guia completo sobre as Outlands e suas peculiaridades",
        keywords: "outlands área especial região",
        href: "/wiki/outlands"
      },
      {
        name: "Clans",
        description: "Explore os diferentes clãs disponíveis no jogo e seus benefícios únicos",
        keywords: "clans clãs dragões sombras guerreiros elementais psíquicos voadores insetos minerais místicos guardiões",
        href: "/wiki/clans"
      },
      {
        name: "Tasks",
        description: "Lista completa de tasks e como completá-las",
        keywords: "tasks tarefas missões objetivos",
        href: "/wiki/tasks"
      },
      {
        name: "Relíquias",
        description: "Descubra todas as relíquias e seus segredos",
        keywords: "relíquias artefatos tesouros",
        href: "/wiki/reliquias"
      },
      {
        name: "Awakening",
        description: "Sistema de Awakening Stone e Awakening Boost",
        keywords: "awakening stone awakening boost",
        href: "/wiki/awaken"
      }
    ],
  },
  {
    title: "Hoenn",
    icon: HoennIcon,
    subcategories: [
      {
        name: "Bosses",
        description: "Guia de todos os bosses e estratégias para derrotá-los",
        keywords: "bosses chefes batalhas difíceis",
        href: "/wiki/bosses"
      },
      {
        name: "Dimensional Zone",
        description: "Explore a Dimensional Zone e seus mistérios",
        keywords: "dimensional zone área especial dimensão",
        href: "/wiki/dimensional-zone"
      },
      {
        name: "Brotherhood",
        description: "Tudo sobre o sistema de Brotherhood",
        keywords: "brotherhood irmandade grupo equipe",
        href: "/wiki/brotherhood"
      },
      {
        name: "Em Breve",
        description: "Novidades em breve.",
        keywords: "novidades atualizações futuro",
        href: "/wiki/em-breve"
      }
      // {
      //   name: "Pokemons Megas",
      //   description: "Guia completo sobre Mega Evoluções",
      //   keywords: "mega evolução pedras especiais",
      //   href: "/wiki/megas"
      // }
    ],
  },
  {
    title: "Sinnoh",
    icon: SinnohIcon,
    subcategories: [
      {
        name: "Em Breve",
        description: "Novidades em breve.",
        keywords: "novidades atualizações futuro",
        href: "/wiki/em-breve"
      }
    ],
  },
  {
    title: "Mecânicas",
    icon: MechanicsIcon,
    subcategories: [
      {
        name: "Charms",
        description: "Guia completo sobre charms e seus efeitos",
        keywords: "charms amuletos sorte bonus",
        href: "/wiki/charms"
      },
      {
        name: "Gentleman Brooks",
        description: "Tudo sobre o Gentleman Brooks e suas recompensas",
        keywords: "gentleman brooks npc especial",
        href: "/wiki/gentleman-brooks"
      },
      {
        name: "Daily Login",
        description: "Recompensas diárias e como obtê-las",
        keywords: "daily login recompensas diárias",
        href: "/wiki/daily-login"
      },
      {
        name: "Goal",
        description: "Sistema de objetivos e recompensas",
        keywords: "goal objetivos metas recompensas",
        href: "/wiki/goal"
      }
      // {
      //   name: "Sistema de Captura",
      //   description: "Sistema de Captura e recompensas",
      //   keywords: "captura bolsa bolsas recompensas",
      //   href: "/wiki/sistema-de-captura"
      // }
    ],
  },
  {
    title: "Pokémon Center",
    icon: PokeCenterIcon,
    subcategories: [
      {
        name: "Quests",
        description: "Lista completa de quests e recompensas",
        keywords: "quests missões tarefas recompensas",
        href: "/wiki/quests"
      },
      {
        name: "Guia de Up",
        description: "Aprenda as melhores formas de upar seu Pokémon",
        keywords: "up level experiência treino",
        href: "/wiki/guia-de-up"
      },
      {
        name: "FAQ",
        description: "Perguntas frequentes e suas respostas",
        keywords: "faq dúvidas perguntas respostas ajuda",
        href: "/wiki/faq"
      },
      {
        name: "Em Breve",
        description: "Novidades em breve.",
        keywords: "novidades atualizações futuro",
        href: "/wiki/em-breve"
      }
      // {
      //   name: "Tier List",
      //   description: "Ranking dos melhores Pokémon por categoria",
      //   keywords: "tier list ranking melhores pokémon",
      //   href: "/wiki/tier-list"
      // }
    ],
  },
];
