import CharacterCard from './CharacterCard';
import type { Character } from '../types';

interface Props {
  characters: Character[];
  gameId: string;
  accentColor: string;
  accentColorDark: string;
}

export default function CharacterGrid({ characters, gameId, accentColor, accentColorDark }: Props) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2 sm:gap-3">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          gameId={gameId}
          accentColor={accentColor}
          accentColorDark={accentColorDark}
        />
      ))}
    </div>
  );
}
