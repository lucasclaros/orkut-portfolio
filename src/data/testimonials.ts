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
    name: "Alan Turing",
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
    name: "Ada Lovelace",
    role: "First Programmer",
    photo: "/images/friends/ada-lovelace.png",
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
    name: "Linus Torvalds",
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
    name: "Grace Hopper",
    role: "Compiler Pioneer",
    photo: "/images/friends/grace-hopper.jpg",
    emoticon: "/images/emoticons/thumbsup.png",
    quote: {
      "pt-BR":
        "esse garoto não espera o bug aparecer, já tá corrigindo antes",
      en: "this kid doesn't wait for the bug to show up, he's already fixing it",
    },
    date: "1985",
  },
  {
    id: "5",
    name: "Brendan Eich",
    role: "JavaScript Creator",
    photo: "/images/friends/brendan-eich.jpg",
    emoticon: "/images/emoticons/grin.png",
    quote: {
      "pt-BR": "fez em TypeScript o que eu fiz em 10 dias. só que funciona",
      en: "did in TypeScript what I did in 10 days. except it works",
    },
    date: "2024",
  },
];
