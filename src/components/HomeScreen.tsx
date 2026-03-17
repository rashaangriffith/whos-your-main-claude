import { useMainsContext } from '../context/FavoritesContext';
import { GAMES } from '../data/games';

interface Props {
  onAddMain: () => void;
  onMyMains: () => void;
}

export default function HomeScreen({ onAddMain, onMyMains }: Props) {
  const { mainsCount, mainsByGame } = useMainsContext();

  const gamesWithMains = GAMES.filter((g) => (mainsByGame.get(g.id)?.size ?? 0) > 0);

  const summaryText =
    mainsCount === 0
      ? 'No mains yet. Pick your fighters!'
      : `${mainsCount} main${mainsCount !== 1 ? 's' : ''} across ${gamesWithMains.length} game${gamesWithMains.length !== 1 ? 's' : ''}`;

  // Preview: up to 6 mains sorted by game order
  const previewMains: { gameId: string; charId: string; accentColor: string; accentColorDark: string; name: string }[] = [];
  for (const game of GAMES) {
    const charSet = mainsByGame.get(game.id);
    if (!charSet) continue;
    for (const charId of charSet) {
      if (previewMains.length >= 6) break;
      const char = game.characters.find((c) => c.id === charId);
      if (char) {
        previewMains.push({
          gameId: game.id,
          charId,
          accentColor: game.accentColor,
          accentColorDark: game.accentColorDark,
          name: char.name,
        });
      }
    }
    if (previewMains.length >= 6) break;
  }

  function getInitials(name: string): string {
    return name
      .split(/[\s\-.]+/)
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full py-10 flex flex-col gap-8">
        {/* Title */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Who's Your Main?
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">{summaryText}</p>
        </div>

        {/* Preview row */}
        {previewMains.length > 0 && (
          <div className="flex gap-2">
            {previewMains.map((m) => (
              <div
                key={`${m.gameId}::${m.charId}`}
                className="w-12 h-16 rounded-md overflow-hidden flex-shrink-0 relative"
                style={{ background: `linear-gradient(160deg, ${m.accentColor}, ${m.accentColorDark})` }}
                title={m.name}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 55%)' }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white/40 font-black text-lg select-none">
                  {getInitials(m.name)}
                </span>
                <div
                  className="absolute bottom-0 left-0 right-0 px-0.5 py-0.5 text-center"
                  style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}
                >
                  <span className="text-white text-[0.5rem] font-bold uppercase tracking-wide leading-tight block truncate">
                    {m.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action cards */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Add a Main */}
          <button
            onClick={onAddMain}
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-zinc-950 rounded-xl px-6 py-8 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            <div className="text-2xl mb-2">＋</div>
            <div className="text-xl font-black tracking-tight">Add a Main</div>
            <div className="text-sm font-medium text-zinc-700 mt-1">
              Choose a game and pick your fighter
            </div>
          </button>

          {/* My Mains */}
          <button
            onClick={onMyMains}
            disabled={mainsCount === 0}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-6 py-8 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            <div className="text-2xl mb-2">★</div>
            <div className="text-xl font-black tracking-tight">My Mains</div>
            <div className="text-sm font-medium text-zinc-400 mt-1">
              {mainsCount === 0 ? 'Add some mains first' : `View your ${mainsCount} main${mainsCount !== 1 ? 's' : ''}`}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
