import { GAMES } from '../data/games';

interface Props {
  onSelectGame: (gameId: string) => void;
  onBack: () => void;
}

export default function SelectGameScreen({ onSelectGame, onBack }: Props) {
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

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-8">
          Choose a Game
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GAMES.map((game) => (
            <button
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className="rounded-xl overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${game.accentColor}, ${game.accentColorDark})`,
              }}
            >
              <div className="px-6 py-8">
                <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                  {game.shortName}
                </div>
                <div className="text-xl font-black text-white tracking-tight">{game.name}</div>
                <div className="text-sm text-white/60 mt-2">
                  {game.characters.length} fighters
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
