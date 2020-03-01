import React, { useState, useContext } from 'react'

import Notification from '../components/Notifications/Notification'
import { ListContext } from '../contexts/ListContext'
import { InitiativeContext } from '../contexts/InitContext'

export default function PlayerList() {
  const [newPlayer, setNewPlayer] = useState({ id: null, name: '', init: 0 })
  const {
    currentList,
    lists, 
    addPlayer, 
    updatePlayer, 
    removePlayer,
    isNewList,
    setCurrentList,
    updateList, 
    removeList, 
    saveList,
    listNotification, 
    clearNotification
  } = useContext(ListContext)

  const { startInitiative, initCount, restartInitative } = useContext(InitiativeContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    addPlayer(newPlayer)
    setNewPlayer({ id: null, name: '', init: 0 })
  }

  const handleChange = (e) => {
    const { value } = e.target
    setNewPlayer({ name: value, init: 0 })
  }

  const handleListNameChange = (e) => {
    const { value } = e.target
    const foundList = lists.find(list => list.name === value)
    if (foundList) {
      setCurrentList(foundList.id)
    } else {
      updateList(value)
    }
  }

  const handleListSelect = (e) => {
    const id = parseInt(e.target.value)
    setCurrentList(id)
  }

  return(
    <>
      { listNotification && <Notification notification={listNotification} clearNotification={clearNotification} /> }
      <div className='PlayerList'>
        <h1>Player List</h1>
        { isNewList ? <div>
          <input type='text' list='playerLists' placeholder='Enter new list name, or select one' onChange={handleListNameChange} style={{ width: '100%', marginBottom: '.5rem', padding: '.5rem'}}/>
          <datalist id='playerLists'>
            {lists.map((list, i) => (
              <option value={list.name} key={list.id}/>
            ))}
          </datalist>
        </div> : 
        <select defaultValue={currentList.id} onChange={handleListSelect} style={{ width: '100%', marginBottom: '.5rem', padding: '.5rem', border: '2px solid #eee'}}>
          <option value=''>New List</option>
          {lists.map((list, i) => (
            <option value={list.id} key={list.id}>{list.name}</option>
          ))}
        </select> }
        
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
          {currentList.players.map( (player, i) => (
            <li key={player.name} className='player-item'>
              <div className='player-name'>{player.name}</div> 
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
          <button type='button' className='btn' onClick={removeList}>Remove List</button>
        </div>
        <hr />
        <div className={ initCount > 0 ? 'init-buttons beyond' : 'init-buttons'}>
          <button type='button' disabled={currentList.players.length === 0} className='btn' onClick={startInitiative}>Start Initiative</button>
          { initCount > 0 && <button type='button' className='btn' onClick={restartInitative}>Restart Initiative</button> }
        </div>
      </div>

          { currentList.players.length === 0 && <div className='missing-player-notification'>Please add a Player or List of Players to start initiative</div> }
    </>
  )
}