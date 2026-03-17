import { useMainsContext } from '../context/FavoritesContext';
import CharacterGrid from './CharacterGrid';
import type { Game } from '../types';

interface Props {
  game: Game;
}

export default function GameSection({ game }: Props) {
  const { mainsByGame } = useMainsContext();
  const mainsCount = mainsByGame.get(game.id)?.size ?? 0;

  return (
    <div>
      <div className="flex items-baseline gap-3 mb-4">
        <h2
          className="text-lg sm:text-xl font-bold tracking-tight"
          style={{ color: game.accentColor }}
        >
          {game.name}
        </h2>
        <span className="text-zinc-500 text-sm">
          {game.characters.length} fighters
          {mainsCount > 0 && (
            <span className="ml-1" style={{ color: game.accentColor }}>
              · {mainsCount} as main
            </span>
          )}
        </span>
      </div>
      <CharacterGrid
        characters={game.characters}
        gameId={game.id}
        accentColor={game.accentColor}
        accentColorDark={game.accentColorDark}
      />
    </div>
  );
}
