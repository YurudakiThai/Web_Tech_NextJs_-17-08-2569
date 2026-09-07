export type Member = {
  id: number;
  name: string;
  role: string;
  formedYear: number;
  baseLikes: number;
  image: string;
};

export type Band = {
  id: number;
  slug: string;
  name: string;
  genre: string;
  origin: string;
  description: string;
  image: string;
  accentColor: string;
  members: Member[];
};

export type Band_favorite = {
  id: number;
  formedYear: number;
  baseLikes: number;
};
