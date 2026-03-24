export interface Testimonial {
  id: string;
  name: string;
  role: string;
  photo: string;
  emoticon: string;
  quote: {
    "pt-BR": string;
    en: string;
  };
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Δlαη Tµяιηg.exe 🖥️",
    role: "Mathematician & Cryptanalyst",
    photo: "/images/friends/alan-turing.jpg",
    emoticon: "/images/emoticons/thinking.gif",
    quote: {
      "pt-BR": "se ele consegue debugar meu teste, consegue qualquer coisa",
      en: "if he can debug my test, he can do anything",
    },
    date: "1950",
  },
  {
    id: "2",
    name: "Ada ♥ Lovelace [π]",
    role: "First Programmer",
    photo: "/images/friends/ada-lovelace.jpg",
    emoticon: "/images/emoticons/wink.gif",
    quote: {
      "pt-BR":
        "finalmente alguém que documenta o código. brincadeira, mas quase",
      en: "finally someone who documents the code. kidding, but almost",
    },
    date: "1843",
  },
  {
    id: "3",
    name: "LiNuX †ØRvALDs 🐧",
    role: "Linux Creator",
    photo: "/images/friends/linus-torvalds.jpg",
    emoticon: "/images/emoticons/cool.png",
    quote: {
      "pt-BR": "código limpo, PRs pequenos, zero drama. raro",
      en: "clean code, small PRs, zero drama. rare",
    },
    date: "2024",
  },
  {
    id: "4",
    name: "R9 • Ø FєηôмєηØ ⚽🇧🇷",
    role: "Melhor do Mundo",
    photo: "/images/friends/ronaldo-fenomeno.jpg",
    emoticon: "/images/emoticons/thumbsup.png",
    quote: {
      "pt-BR": "o cara driblou tantos bugs que parecia eu driblando zagueiro",
      en: "this guy dribbled past so many bugs it looked like me dribbling past defenders",
    },
    date: "2002",
  },
  {
    id: "5",
    name: "Avril Lavigne † sk8er girl 🎸🖤",
    role: "Sk8er Girl",
    photo: "/images/friends/avril-lavigne.jpg",
    emoticon: "/images/emoticons/grin.png",
    quote: {
      "pt-BR": "ele disse 'vou deployar sexta às 17h' e eu pensei: why'd you have to go and make things so complicated?",
      en: "he said 'I'll deploy on friday at 5pm' and I thought: why'd you have to go and make things so complicated?",
    },
    date: "2007",
  },
];
