export interface Community {
  id: string;
  name: string;
  description: {
    "pt-BR": string;
    en: string;
  };
  members: number;
  yearsExp: number;
  icon: string;
  emoticon?: string;
}

export const communities: Community[] = [
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
    emoticon: "/images/emoticons/heart.png",
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
    emoticon: "/images/emoticons/coffee.png",
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
    emoticon: "/images/emoticons/cool.png",
  },
  {
    id: "clean-arch",
    name: "Clean Architecture Addicts",
    description: {
      "pt-BR": "a gente separa camada até no bolo de aniversário",
      en: "we separate layers even in birthday cake",
    },
    members: 1900,
    yearsExp: 3,
    icon: "🏗️",
    emoticon: "/images/emoticons/nerd.png",
  },
  {
    id: "firebase",
    name: "Firebase Crashlytics Survivors",
    description: {
      "pt-BR": "o app crashou mas pelo menos eu sei onde",
      en: "the app crashed but at least I know where",
    },
    members: 1200,
    yearsExp: 3,
    icon: "🔥",
    emoticon: "/images/emoticons/crying.gif",
  },
  {
    id: "ai-tooling",
    name: "AI-Assisted Development",
    description: {
      "pt-BR": "meu copiloto escreve código melhor que eu às 3 da manhã",
      en: "my copilot writes better code than me at 3am",
    },
    members: 890,
    yearsExp: 1,
    icon: "🤖",
    emoticon: "/images/emoticons/surprised.png",
  },
];
