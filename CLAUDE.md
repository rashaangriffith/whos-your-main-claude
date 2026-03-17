# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # ESLint
npx tsc --noEmit  # Type-check only, no output
```

There are no tests. Verify correctness with `npx tsc --noEmit` and `npm run build`.

## Architecture

### Navigation model
`App.tsx` owns a `View` discriminated union — no router:

```ts
type View =
  | { screen: 'home' }
  | { screen: 'my-mains' }
  | { screen: 'select-game' }
  | { screen: 'select-character'; gameId: string };
```

Each screen is a full-page component that receives navigation as prop callbacks (`onBack`, `onDone`, `onSelectGame`, etc.). `App.tsx` switches on `view.screen` and renders the appropriate component.

### State: mains (favorites)
`src/hooks/useFavorites.ts` manages mains state as a `Set<CharKey>` where `CharKey = "gameId::charId"` (built by `makeCharKey()` from `src/data/games.ts`). State is persisted to localStorage under `wym_mains`. The hook exposes: `isMain`, `toggleMain`, `clearMains`, `mainsCount`, `mainsByGame` (a `Map<gameId, Set<charId>>`).

`src/context/FavoritesContext.tsx` wraps the hook in a React context. Use `useMainsContext()` inside any component that needs to read or mutate mains.

### Data
`src/data/games.ts` is the single source of truth — a static `GAMES: Game[]` array. Adding a new game means adding an entry there. No backend, no API.

### Screens and components
- `HomeScreen` — summary + preview tiles + action cards (Add a Main / My Mains)
- `SelectGameScreen` — grid of game cards from `GAMES`
- `SelectCharacterScreen` — wraps `CharacterGrid` for a specific game; toggle mains inline
- `MainsView` — mains grouped by game via `mainsByGame`
- `CharacterGrid` / `CharacterCard` — reusable; `CharacterCard` calls `toggleMain` directly via context
- `GameSection` — used if you ever want to show a full roster inline (not currently on any screen)

### Styling
Tailwind CSS with a dark base (`bg-zinc-950`). Accent colors come from `Game.accentColor` / `Game.accentColorDark` and are applied via inline `style` props (not Tailwind classes) since they're dynamic hex values.
