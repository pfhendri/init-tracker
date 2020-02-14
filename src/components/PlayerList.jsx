import React, { useState, useContext } from 'react'

import { ListContext } from '../contexts/ListContext'

export default function PlayerList(props) {
  const [newPlayer, setNewPlayer] = useState({ id: null, name: '', init: 0 })
  const { openView } = props
  const {
    list, 
    addPlayer, 
    updatePlayer, 
    removePlayer, 
    clearList, 
    saveList
  } = useContext(ListContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    addPlayer(newPlayer)
    setNewPlayer({ id: null, name: '', init: 0 })
  }

  const handleChange = (e) => {
    const { value } = e.target
    setNewPlayer({ name: value, init: 0 })
  }

  return(
    <div className='PlayerList'>
      <h1>Player List</h1>
      <form onSubmit={handleSubmit} className='new-player-form'>
        <input
          type='text'
          placeholder='Character name'
          name='name'
          onChange={handleChange}
          value={newPlayer.name}
        />
        <button type='submit' className='btn'>Add</button>
      </form>
      <hr />
      <ul className='player-list'>
        {list.map( (player, i) => (
          <li key={player.name} className='player-item'>
            {player.name} 
            <input 
              type='number' 
              value={player.init}
              onChange={(e) => updatePlayer('init', e.target.value, player)}
            />
            <button type='button' className='btn' onClick={() => removePlayer(player.id)}>X</button>
          </li>
        ))}
      </ul>
      <div className='button-actions'>
        <button type='button' className='btn' onClick={saveList}>Save List</button>
        <button type='button' className='btn' onClick={clearList}>Clear List</button>
      </div>
      <hr />
      <div style={{display: 'flex', justifyContent: 'center' }}>
        <button type='button' className='btn' onClick={openView}>Start Initiative</button>
      </div>
    </div>
  )
}