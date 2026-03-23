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
    id: "cobli-motorista",
    title: {
      "pt-BR": "Cobli Motorista",
      en: "Cobli Motorista",
    },
    description: {
      "pt-BR":
        "app do motorista para indicar veículo em uso e consultar histórico. referência em Flutter na empresa.",
      en: "driver app to indicate vehicle in use and check history. company-wide Flutter reference.",
    },
    stack: ["Flutter", "Dart", "BLoC"],
    coverImage: "/images/albums/cobli-motorista/1.png",
    photos: [
      { src: "/images/albums/cobli-motorista/1.png", caption: { "pt-BR": "tela inicial", en: "home screen" } },
      { src: "/images/albums/cobli-motorista/2.png", caption: { "pt-BR": "seleção de veículo", en: "vehicle selection" } },
      { src: "/images/albums/cobli-motorista/3.png", caption: { "pt-BR": "detalhes da viagem", en: "trip details" } },
      { src: "/images/albums/cobli-motorista/4.png", caption: { "pt-BR": "histórico de uso", en: "usage history" } },
    ],
  },
  {
    id: "cobli-gestor",
    title: {
      "pt-BR": "Cobli Gestor de Frotas",
      en: "Cobli Fleet Manager",
    },
    description: {
      "pt-BR":
        "app do gestor para monitorar frota, rastrear rotas e acessar vídeos de eventos em tempo real.",
      en: "manager app to monitor fleet, track routes and access real-time event videos.",
    },
    stack: ["Flutter", "Dart", "Kotlin", "React"],
    coverImage: "/images/albums/cobli-gestor/1.png",
    photos: [
      { src: "/images/albums/cobli-gestor/1.png", caption: { "pt-BR": "painel da frota", en: "fleet dashboard" } },
      { src: "/images/albums/cobli-gestor/2.png", caption: { "pt-BR": "rastreamento de veículos", en: "vehicle tracking" } },
      { src: "/images/albums/cobli-gestor/3.png", caption: { "pt-BR": "detalhes do veículo", en: "vehicle details" } },
      { src: "/images/albums/cobli-gestor/4.png", caption: { "pt-BR": "vídeos de eventos", en: "event videos" } },
    ],
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
