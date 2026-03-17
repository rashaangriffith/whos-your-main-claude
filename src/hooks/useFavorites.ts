import { useState, useMemo } from 'react';
import { makeCharKey } from '../data/games';

const LS_KEY = 'wym_mains';

interface UseMainsReturn {
  isMain: (gameId: string, charId: string) => boolean;
  toggleMain: (gameId: string, charId: string) => void;
  clearMains: () => void;
  mainsCount: number;
  mainsByGame: Map<string, Set<string>>;
}

function loadFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return new Set<string>(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set<string>();
  }
}

export function useFavorites(): UseMainsReturn {
  const [mains, setMains] = useState<Set<string>>(loadFromStorage);

  const isMain = (gameId: string, charId: string): boolean =>
    mains.has(makeCharKey(gameId, charId));

  const toggleMain = (gameId: string, charId: string): void => {
    const key = makeCharKey(gameId, charId);
    setMains((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      localStorage.setItem(LS_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const clearMains = (): void => {
    setMains(new Set());
    localStorage.removeItem(LS_KEY);
  };

  const mainsByGame = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const key of mains) {
      const [gameId, charId] = key.split('::');
      if (!map.has(gameId)) map.set(gameId, new Set());
      map.get(gameId)!.add(charId);
    }
    return map;
  }, [mains]);

  return {
    isMain,
    toggleMain,
    clearMains,
    mainsCount: mains.size,
    mainsByGame,
  };
}
