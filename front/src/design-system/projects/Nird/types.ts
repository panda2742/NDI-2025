
export interface Answer {
  text: string;
  value: string;
  name: string;
  ancientScore: number;
  sovereignScore: number;
}

export interface FormData {
  question: string;
  answers: Answer[];
}

export interface Idea {
  title: string;
  desc: string;
  minimalAncientScore: number;
  minimalSovereignScore: number;
}