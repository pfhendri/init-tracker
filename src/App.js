import React, { useState } from 'react';

import PlayerList from './components/PlayerList'
import LiveView from './components/LiveView'

import './App.css';

function App() {
  const [startInit, setStartInit] = useState(false)
  return (
    <div className="App">
      { startInit ? 
        <LiveView closeView={() => setStartInit(false)} /> :
        <PlayerList openView={() => setStartInit(true)} />
      }
    </div>
  );
}

export default App;
