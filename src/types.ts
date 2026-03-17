export interface Character {
  id: string;
  name: string;
  portraitUrl?: string;
}

export interface Game {
  id: string;
  name: string;
  shortName: string;
  accentColor: string;
  accentColorDark: string;
  characters: Character[];
}

export type CharKey = `${string}::${string}`;
