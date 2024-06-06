import React, { useState } from 'react';
import Home from './components/Home';
import TwoPlayerGame from './components/TwoPlayerGame';
import GameWithAI from './components/GameWithAI';
import './App.css';

function App() {
  const [mode, setMode] = useState(null);

  const selectMode = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <div className="App">
      {!mode && <Home selectMode={selectMode} />}
      {mode === '2player' && <TwoPlayerGame goBack={() => setMode(null)} />}
      {mode === '1vsAI' && <GameWithAI goBack={() => setMode(null)} />}
    </div>
  );
}

export default App;
