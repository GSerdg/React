export interface PeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PeopleResult[];
}

export interface PeopleResult {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: Gender;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

type Gender = 'male' | 'female' | 'n/a';
