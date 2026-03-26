"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type Locale = "pt-BR" | "en";

const messages = {
  "pt-BR": {
    nav: {
      home: "início",
      testimonials: "depoimentos",
      projects: "projetos",
      apps: "projetos",
      communities: "comunidades",
      scrapbook: "recados",
      albums: "álbuns",
      contact: "contato",
    },
    apps: {
      title: "Apps",
      installed: "instalado",
      screenshots: "screenshots",
    },
    login: {
      welcome: "Conecte-se ao orkut.com com a sua conta Lucas Claros",
      email: "E-mail",
      password: "Senha",
      login: "Entrar",
      newHere: "Ainda não é membro?",
      joinNow: "ENTRAR AGORA",
      accessAccount: "Acesse sua conta",
      rememberMe: "Lembrar de mim",
      forgotPassword: "Esqueceu a senha?",
      connectFriends: "Conecte-se aos seus amigos",
    },
    profile: {
      aboutMe: "quem sou eu",
      socialInfo: "informações pessoais",
      professionalInfo: "informações profissionais",
      experience: "experiência",
      aboutText:
        "Engenheiro de Software com 4+ anos de experiência, referência em Flutter na Cobli. Formado em Mecatrônica pelo IFSP e Ciência da Computação pela USP. Comecei como estagiário mobile na Tokenlab, evoluí pra fullstack na Cobli trabalhando com Kotlin/Spring Boot, React/TypeScript e Flutter. Já entreguei features usadas por centenas de frotas e milhares de motoristas.",
      relationship: "relacionamento",
      relationshipValue: "é complicado",
      humor: "humor",
      humorValue: "sim",
      children: "filhos",
      childrenValue: "2 apps em produção",
      smoker: "fumante",
      smokerValue: "só quando o build quebra",
      livesWith: "mora com",
      livesWithValue: "3 monitores",
      style: "estilo",
      styleValue: "adventure-driven",
      passion: "paixões",
      passionValue: "viagens, jogos e café",
      country: "país",
      countryValue: "Brasil",
      city: "cidade",
      cityValue: "Catanduva, SP",
      languages: "idiomas",
      languagesValue: "português (nativo), inglês (avançado)",
      interests: "interesses",
      interestsValue: "mobile, arquitetura de software, devops, open source",
      music: "música",
      musicValue: "se tocar no shuffle, eu ouço",
      movies: "filmes",
      moviesValue: "Questão de Tempo, Simplesmente Acontece, Coach Carter",
      books: "livros",
      booksValue: "Clean Code (cap. 1-3), DDIA (cap. 1-2), O Grande Gatsby",
      role: "cargo",
      roleValue: "Software Engineer",
      company: "empresa",
      companyValue: "Cobli",
      stack: "stack principal",
      stackValue: "Flutter, Kotlin/Spring Boot, React/TypeScript",
      education: "formação",
      educationValue: "ciência da computação (USP) · mecatrônica (IFSP)",
    },
    testimonials: { title: "depoimentos" },
    communities: {
      title: "comunidades",
      members: "membros",
      yearsExp: "anos de experiência",
    },
    albums: {
      title: "Álbuns",
      photos: "fotos",
      previous: "← anterior",
      next: "próxima →",
      close: "fechar",
      viewOnGithub: "ver no GitHub →",
    },
    contact: {
      title: "recados",
      placeholder: "escreva um recado para Lucas...",
      send: "enviar",
      cta: "quer conversar sobre uma oportunidade? me manda um recado!",
      orReachMe: "ou me encontre em:",
      leaveScrap: "deixe um recado",
      name: "nome",
      namePlaceholder: "seu nome",
      preview: "preview",
      scrapSent: "recado enviado!",
      noScraps: "nenhum recado ainda... seja o primeiro!",
      sending: "enviando...",
      errorSending: "erro ao enviar, tente novamente",
    },
    sidebar: {
      software_engineer: "Engenheiro de Software",
      reliable: "confiável",
      cool: "legal",
      sexy: "sexy",
      yearsExp: "anos de XP",
      repos: "repos",
      projects: "projetos",
      jobs: "empregos",
      companies: "empresas",
      visitors: "visitantes",
      luckyDay: "Lucas foi eleito o sortudo do dia!",
      friends: "amigos",
      communities: "comunidades",
      seeAll: "ver todos",
      seeAllF: "ver todas",
      addFriend: "adicionar como amigo",
      more: "mais",
      male: "masculino, solteiro",
      profile: "perfil",
      scraps: "recados",
      photos: "fotos",
      available: "disponível",
      searchPlaceholder: "pesquisa do orkut",
      testimonials: "depoimentos",
      downloadResume: "baixar currículo",
      welcomeTo: "Bem-vindo ao perfil de",
      about: "sobre",
      privacy: "privacidade",
      terms: "termos",
      madeWith: "Portfolio de Lucas Claros - feito com Next.js + Tailwind",
    },
  },
  en: {
    nav: {
      home: "home",
      testimonials: "testimonials",
      projects: "projects",
      apps: "projects",
      communities: "communities",
      scrapbook: "scrapbook",
      albums: "albums",
      contact: "contact",
    },
    login: {
      welcome: "Sign in to orkut.com with your Lucas Claros account",
      email: "Email",
      password: "Password",
      login: "Sign in",
      newHere: "Not a member yet?",
      joinNow: "JOIN NOW",
      accessAccount: "Access your account",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      connectFriends: "Connect with your friends",
    },
    profile: {
      aboutMe: "about me",
      socialInfo: "personal info",
      professionalInfo: "professional info",
      experience: "experience",
      aboutText:
        "Software Engineer with 4+ years of experience, company-wide Flutter reference at Cobli. Graduated in Mechatronics from IFSP and Computer Science from USP. Started as a mobile intern at Tokenlab, evolved into fullstack at Cobli working with Kotlin/Spring Boot, React/TypeScript and Flutter. Shipped features used by hundreds of fleets and thousands of drivers.",
      relationship: "relationship",
      relationshipValue: "it's complicated",
      humor: "humor",
      humorValue: "yes",
      children: "children",
      childrenValue: "2 apps in production",
      smoker: "smoker",
      smokerValue: "only when the build breaks",
      livesWith: "lives with",
      livesWithValue: "3 monitors",
      style: "style",
      styleValue: "adventure-driven",
      passion: "passions",
      passionValue: "travel, gaming and coffee",
      country: "country",
      countryValue: "Brazil",
      city: "city",
      cityValue: "Catanduva, SP",
      languages: "languages",
      languagesValue: "portuguese (native), english (advanced)",
      interests: "interests",
      interestsValue: "mobile, software architecture, devops, open source",
      music: "music",
      musicValue: "if it's on shuffle, I'll listen",
      movies: "movies",
      moviesValue: "About Time, Love Rosie, Coach Carter",
      books: "books",
      booksValue: "Clean Code (ch. 1-3), DDIA (ch. 1-2), The Great Gatsby",
      role: "role",
      roleValue: "Software Engineer",
      company: "company",
      companyValue: "Cobli",
      stack: "main stack",
      stackValue: "Flutter, Kotlin/Spring Boot, React/TypeScript",
      education: "education",
      educationValue: "computer science (USP) · mechatronics (IFSP)",
    },
    testimonials: { title: "testimonials" },
    communities: {
      title: "communities",
      members: "members",
      yearsExp: "years of experience",
    },
    albums: {
      title: "Albums",
      photos: "photos",
      previous: "← previous",
      next: "next →",
      close: "close",
      viewOnGithub: "view on GitHub →",
    },
    apps: {
      title: "Apps",
      installed: "installed",
      screenshots: "screenshots",
    },
    contact: {
      title: "scraps",
      placeholder: "write a scrap for Lucas...",
      send: "send",
      cta: "want to chat about an opportunity? send me a scrap!",
      orReachMe: "or reach me at:",
      leaveScrap: "leave a scrap",
      name: "name",
      namePlaceholder: "your name",
      preview: "preview",
      scrapSent: "scrap sent!",
      noScraps: "no scraps yet... be the first!",
      sending: "sending...",
      errorSending: "error sending, please try again",
    },
    sidebar: {
      software_engineer: "Software Engineer",
      reliable: "reliable",
      cool: "cool",
      sexy: "sexy",
      yearsExp: "years XP",
      repos: "repos",
      projects: "projects",
      jobs: "jobs",
      companies: "companies",
      visitors: "visitors",
      luckyDay: "Lucas was chosen as today's lucky person!",
      friends: "friends",
      communities: "communities",
      seeAll: "see all",
      seeAllF: "see all",
      addFriend: "add as friend",
      more: "more",
      male: "male, single",
      profile: "profile",
      scraps: "scraps",
      photos: "photos",
      available: "available",
      searchPlaceholder: "orkut search",
      testimonials: "testimonials",
      downloadResume: "download resume",
      welcomeTo: "Welcome to the profile of",
      about: "about",
      privacy: "privacy",
      terms: "terms",
      madeWith: "Lucas Claros Portfolio - made with Next.js + Tailwind",
    },
  },
} as const;

interface I18nContextType {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt-BR";
  const stored = localStorage.getItem("orkut-locale");
  return stored === "en" ? "en" : "pt-BR";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "pt-BR" ? "en" : "pt-BR";
      localStorage.setItem("orkut-locale", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let result: unknown = messages[locale];
      for (const k of keys) {
        result = (result as Record<string, unknown>)?.[k];
      }
      return (result as string) ?? key;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
