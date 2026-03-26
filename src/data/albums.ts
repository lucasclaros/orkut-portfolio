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

// Fotos pessoais — a preencher em sessão futura
export const albums: Album[] = [];
