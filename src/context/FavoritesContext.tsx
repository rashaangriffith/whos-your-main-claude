import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useFavorites } from '../hooks/useFavorites';

type MainsContextValue = ReturnType<typeof useFavorites>;

const MainsContext = createContext<MainsContextValue | null>(null);

export function MainsProvider({ children }: { children: ReactNode }) {
  const mains = useFavorites();
  return (
    <MainsContext.Provider value={mains}>
      {children}
    </MainsContext.Provider>
  );
}

export function useMainsContext(): MainsContextValue {
  const ctx = useContext(MainsContext);
  if (!ctx) throw new Error('useMainsContext must be used within MainsProvider');
  return ctx;
}
