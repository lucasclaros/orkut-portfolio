export interface AlbumPhoto {
  src: string;
  caption: {
    "pt-BR": string;
    en: string;
  };
}

export interface Album {
  id: string;
  title: {
    "pt-BR": string;
    en: string;
  };
  description: {
    "pt-BR": string;
    en: string;
  };
  stack: string[];
  coverImage?: string;
  coverGradient?: string;
  coverIcon?: string;
  githubUrl?: string;
  photos: AlbumPhoto[];
}

export const albums: Album[] = [
  {
    id: "cobli",
    title: {
      "pt-BR": "Cobli Apps",
      en: "Cobli Apps",
    },
    description: {
      "pt-BR":
        "app do motorista e gestor de frota. referência em Flutter na empresa.",
      en: "driver and fleet manager apps. company-wide Flutter reference.",
    },
    stack: ["Flutter", "Kotlin", "React", "TypeScript"],
    coverGradient: "from-[#1A73E8] to-[#0D47A1]",
    coverIcon: "🚛",
    photos: [],
  },
  {
    id: "mepagaai",
    title: {
      "pt-BR": "MePagaAí",
      en: "MePagaAí",
    },
    description: {
      "pt-BR":
        "marketplace p2p de revenda de ingressos com pix. clean architecture + BLoC.",
      en: "p2p ticket resale marketplace with pix payments. clean architecture + BLoC.",
    },
    stack: ["Flutter", "Dart", "BLoC", "Dio"],
    coverImage: "/images/albums/mepagaai/home.png",
    githubUrl: "https://github.com/lucasclaros/mepaga_ai",
    photos: [
      {
        src: "/images/albums/mepagaai/home.png",
        caption: {
          "pt-BR": "tela inicial com ingressos disponíveis",
          en: "home screen with available tickets",
        },
      },
      {
        src: "/images/albums/mepagaai/ticket.png",
        caption: {
          "pt-BR": "detalhes do ingresso e fluxo de compra",
          en: "ticket details and purchase flow",
        },
      },
      {
        src: "/images/albums/mepagaai/profile.png",
        caption: {
          "pt-BR": "perfil do usuário",
          en: "user profile",
        },
      },
    ],
  },
  {
    id: "tcc",
    title: {
      "pt-BR": "TCC Mecatrônica",
      en: "Mechatronics Thesis",
    },
    description: {
      "pt-BR":
        "estufa automatizada com ESP32, sensores e app mobile. projeto final do técnico em mecatrônica (2019).",
      en: "automated greenhouse with ESP32, sensors and mobile app. mechatronics technical degree final project (2019).",
    },
    stack: ["C++", "NodeMCU", "MIT App Inventor", "HTML"],
    coverImage: "/images/albums/tcc/app-icon.jpeg",
    githubUrl: "https://github.com/lucasclaros/tcc-mecatronica",
    photos: [
      {
        src: "/images/albums/tcc/app-icon.jpeg",
        caption: {
          "pt-BR": "ícone do app de controle",
          en: "control app icon",
        },
      },
      {
        src: "/images/albums/tcc/nodemcu.png",
        caption: {
          "pt-BR": "pinagem do NodeMCU usado no projeto",
          en: "NodeMCU pinout used in the project",
        },
      },
    ],
  },
  {
    id: "marseille",
    title: {
      "pt-BR": "Marseille",
      en: "Marseille",
    },
    description: {
      "pt-BR":
        "dashboard de monitoramento de sensores em tempo real com gRPC bidirectional streaming. projeto final de sistemas distribuídos.",
      en: "real-time sensor monitoring dashboard with gRPC bidirectional streaming. distributed systems final project.",
    },
    stack: ["Python", "gRPC", "Streamlit", "Plotly"],
    coverGradient: "from-[#306998] to-[#FFD43B]",
    coverIcon: "📡",
    githubUrl: "https://github.com/lucasclaros/marseille",
    photos: [],
  },
  {
    id: "orkut-portfolio",
    title: {
      "pt-BR": "Orkut Portfolio",
      en: "Orkut Portfolio",
    },
    description: {
      "pt-BR":
        "este site! portfolio pessoal com tema orkut feito em next.js + tailwind.",
      en: "this website! personal portfolio with orkut theme built with next.js + tailwind.",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    coverGradient: "from-[#ED008C] to-[#C4006F]",
    coverIcon: "o",
    photos: [],
  },
];
