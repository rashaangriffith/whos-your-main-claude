import { useMainsContext } from '../context/FavoritesContext';
import type { Character } from '../types';

interface Props {
  character: Character;
  gameId: string;
  accentColor: string;
  accentColorDark: string;
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

export default function CharacterCard({ character, gameId, accentColor, accentColorDark }: Props) {
  const { isMain, toggleMain } = useMainsContext();
  const mained = isMain(gameId, character.id);

  return (
    <button
      onClick={() => toggleMain(gameId, character.id)}
      className="relative w-full aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transition-transform duration-150 active:scale-95 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      style={{
        border: mained ? `2px solid ${accentColor}` : '2px solid transparent',
        boxShadow: mained ? `0 0 12px ${accentColor}66` : undefined,
      }}
      aria-label={`${mained ? 'Remove' : 'Add'} ${character.name} ${mained ? 'from' : 'to'} mains`}
      aria-pressed={mained}
    >
      {/* Background */}
      {character.portraitUrl ? (
        <img
          src={character.portraitUrl}
          alt={character.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(160deg, ${accentColor}, ${accentColorDark})`,
          }}
        >
          {/* Decorative stripe overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 55%)',
            }}
          />
          <span className="relative text-white/40 font-black text-4xl select-none leading-none">
            {getInitials(character.name)}
          </span>
        </div>
      )}

      {/* Name bar */}
      <div
        className="absolute bottom-0 left-0 right-0 px-1.5 py-1.5 text-center"
        style={{
          background: 'linear-gradient(transparent, rgba(0,0,0,0.80))',
        }}
      >
        <span className="text-white text-[0.65rem] sm:text-xs font-bold uppercase tracking-wide leading-tight block">
          {character.name}
        </span>
      </div>

      {/* Star badge */}
      {mained && (
        <div className="absolute top-1 right-1.5 text-yellow-400 text-sm leading-none select-none">
          ★
        </div>
      )}
    </button>
  );
}
