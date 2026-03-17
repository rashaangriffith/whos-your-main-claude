import { GAMES } from '../data/games';
import CharacterGrid from './CharacterGrid';

interface Props {
  gameId: string;
  onBack: () => void;
  onDone: () => void;
}

export default function SelectCharacterScreen({ gameId, onBack, onDone }: Props) {
  const game = GAMES.find((g) => g.id === gameId);
  if (!game) return null;

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-sm mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
        >
          ← Back
        </button>

        <div className="flex items-start justify-between mb-2 gap-4">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: game.accentColor }}
            >
              {game.name}
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Tap a character to add or remove them as a main
            </p>
          </div>
          <button
            onClick={onDone}
            className="flex-shrink-0 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-zinc-950 font-bold text-sm px-5 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            Done
          </button>
        </div>

        <div className="mt-6">
          <CharacterGrid
            characters={game.characters}
            gameId={game.id}
            accentColor={game.accentColor}
            accentColorDark={game.accentColorDark}
          />
        </div>
      </div>
    </div>
  );
}
