import React, { useContext } from 'react';

import PlayerList from './components/PlayerList'
import LiveView from './components/LiveView'

import { InitiativeContext } from './contexts/InitContext'

import './App.css';

function App() {
  const { startInit } = useContext(InitiativeContext)

  return (
    <div className="App">
      { startInit ? 
        <LiveView /> :
        <PlayerList />
      }
    </div>
  );
}

export default App;
