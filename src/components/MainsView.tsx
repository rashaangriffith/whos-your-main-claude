import { GAMES } from '../data/games';
import { useMainsContext } from '../context/FavoritesContext';
import CharacterGrid from './CharacterGrid';

interface Props {
  onBack: () => void;
}

export default function MainsView({ onBack }: Props) {
  const { mainsByGame, mainsCount, clearMains } = useMainsContext();

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

        {mainsCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4 select-none">★</div>
            <p className="text-zinc-400 text-lg font-medium">No mains yet.</p>
            <p className="text-zinc-600 text-sm mt-1">Tap 'Add a Main' to get started.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-yellow-400">
                My Mains
                <span className="ml-2 text-zinc-500 font-normal text-sm">{mainsCount} selected</span>
              </h1>
              <button
                onClick={() => {
                  if (window.confirm('Clear all mains?')) clearMains();
                }}
                className="text-xs text-zinc-500 hover:text-red-400 transition-colors px-2 py-1 rounded border border-zinc-700 hover:border-red-400"
              >
                Clear all
              </button>
            </div>

            {GAMES.map((game) => {
              const mainSet = mainsByGame.get(game.id);
              if (!mainSet || mainSet.size === 0) return null;

              const mainChars = game.characters.filter((c) => mainSet.has(c.id));

              return (
                <div key={game.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-1 h-5 rounded-full"
                      style={{ backgroundColor: game.accentColor }}
                    />
                    <span
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: game.accentColor }}
                    >
                      {game.shortName}
                    </span>
                    <span className="text-zinc-600 text-xs">{mainChars.length} fighters</span>
                  </div>
                  <CharacterGrid
                    characters={mainChars}
                    gameId={game.id}
                    accentColor={game.accentColor}
                    accentColorDark={game.accentColorDark}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
