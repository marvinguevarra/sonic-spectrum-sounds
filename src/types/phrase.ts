
export interface Phrase {
  id: string;
  filipino: string;
  english: string;
  category: string;
  respectful?: string;
  emoji?: string;
}

export interface VerbPhrase {
  root: string;
  aspects: {
    completed: { filipino: string; english: string };
    ongoing: { filipino: string; english: string };
    contemplated: { filipino: string; english: string };
  };
}
