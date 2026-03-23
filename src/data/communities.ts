export interface Community {
  id: string;
  name: string;
  description: {
    "pt-BR": string;
    en: string;
  };
  members: number;
  yearsExp?: number;
  icon: string;
  cover?: string;
  emoticon?: string;
}

export const communities: Community[] = [
  // --- tech ---
  {
    id: "flutter",
    name: "Eu ❤ Flutter",
    description: {
      "pt-BR": "se o app não tiver animação a 60fps eu nem abro",
      en: "if the app doesn't run at 60fps I'm not opening it",
    },
    members: 4200,
    yearsExp: 4,
    icon: "📱",
    cover: "/images/communities/flutter.png",
    emoticon: "/images/emoticons/heart.png",
  },
  {
    id: "react",
    name: "React & TypeScript Brasil",
    description: {
      "pt-BR": "\"any\" não é tipo, é desistência",
      en: "\"any\" is not a type, it's giving up",
    },
    members: 5600,
    yearsExp: 2,
    icon: "⚛️",
    cover: "/images/communities/react.png",
    emoticon: "/images/emoticons/angry.png",
  },
  {
    id: "docker",
    name: "Docker + Kubernetes na veia",
    description: {
      "pt-BR": "funciona na minha máquina não é mais desculpa",
      en: "\"works on my machine\" is no longer an excuse",
    },
    members: 2800,
    yearsExp: 2,
    icon: "🐳",
    cover: "/images/communities/docker.png",
    emoticon: "/images/emoticons/cool.png",
  },
  {
    id: "kotlin",
    name: "Kotlin/Spring Boot Devs",
    description: {
      "pt-BR": "quem nunca esqueceu um @Transactional que atire a primeira pedra",
      en: "whoever never forgot a @Transactional cast the first stone",
    },
    members: 3100,
    yearsExp: 2,
    icon: "☕",
    cover: "/images/communities/kotlin.png",
    emoticon: "/images/emoticons/coffee.png",
  },
  // --- orkut classicas ---
  {
    id: "acordar-cedo",
    name: "Eu Odeio Acordar Cedo",
    description: {
      "pt-BR": "despertador é inimigo nº 1 da humanidade",
      en: "alarm clocks are humanity's #1 enemy",
    },
    members: 6100000,
    icon: "😴",
    cover: "/images/communities/acordar-cedo.jpg",
    emoticon: "/images/emoticons/msn-sleepy.gif",
  },
  {
    id: "segunda-feira",
    name: "Eu odeio segunda-feira",
    description: {
      "pt-BR": "domingo à noite já começa a depressão",
      en: "sunday night the depression already kicks in",
    },
    members: 2893471,
    icon: "😩",
    cover: "/images/communities/segunda-feira.jpg",
    emoticon: "/images/emoticons/msn-crying.gif",
  },
  {
    id: "5-minutinhos",
    name: "Só mais 5 minutinhos",
    description: {
      "pt-BR": "5 minutinhos que viram 2 horas",
      en: "5 minutes that turn into 2 hours",
    },
    members: 2500000,
    icon: "⏰",
    cover: "/images/communities/5-minutinhos.jpg",
    emoticon: "/images/emoticons/msn-wink.gif",
  },
  {
    id: "geladeira",
    name: "Eu abro a geladeira pra pensar",
    description: {
      "pt-BR": "abri 3 vezes e nada mudou lá dentro",
      en: "opened it 3 times and nothing changed inside",
    },
    members: 1847203,
    icon: "🧊",
    cover: "/images/communities/geladeira.jpg",
    emoticon: "/images/emoticons/msn-thinking.gif",
  },
  {
    id: "plantao",
    name: "Eu tenho medo do PLANTÃO",
    description: {
      "pt-BR": "aquele TUM TUM TUM não é brincadeira",
      en: "that TUM TUM TUM is no joke",
    },
    members: 3201487,
    icon: "📺",
    cover: "/images/communities/plantao.jpg",
    emoticon: "/images/emoticons/msn-surprised.png",
  },
  {
    id: "sorvete",
    name: "Queria sorvete, mas era feijão",
    description: {
      "pt-BR": "a decepção de abrir o pote e encontrar feijão",
      en: "the disappointment of opening the tub and finding beans",
    },
    members: 987654,
    icon: "🍨",
    cover: "/images/communities/sorvete.jpg",
    emoticon: "/images/emoticons/msn-sad.png",
  },
];
