import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import SelectGameScreen from './components/SelectGameScreen';
import SelectCharacterScreen from './components/SelectCharacterScreen';
import MainsView from './components/MainsView';

type View =
  | { screen: 'home' }
  | { screen: 'my-mains' }
  | { screen: 'select-game' }
  | { screen: 'select-character'; gameId: string };

export default function App() {
  const [view, setView] = useState<View>({ screen: 'home' });

  if (view.screen === 'select-game') {
    return (
      <SelectGameScreen
        onSelectGame={(gameId) => setView({ screen: 'select-character', gameId })}
        onBack={() => setView({ screen: 'home' })}
      />
    );
  }

  if (view.screen === 'select-character') {
    return (
      <SelectCharacterScreen
        gameId={view.gameId}
        onBack={() => setView({ screen: 'select-game' })}
        onDone={() => setView({ screen: 'home' })}
      />
    );
  }

  if (view.screen === 'my-mains') {
    return <MainsView onBack={() => setView({ screen: 'home' })} />;
  }

  return (
    <HomeScreen
      onAddMain={() => setView({ screen: 'select-game' })}
      onMyMains={() => setView({ screen: 'my-mains' })}
    />
  );
}
