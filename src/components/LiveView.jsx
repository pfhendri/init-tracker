import React, { useContext } from 'react'

import { InitiativeContext } from '../contexts/InitContext'

import './LiveView.css'

export default () => {
  
  const { round, currentPlayer, nextPlayer, orderedList, endInitiative } = useContext(InitiativeContext)

  if (orderedList.length === 0) {
    return 'Loading...'
  }

  return(
    <>
      <div className='round'>
        <div className='flag'>
          <span>Round</span>
          {round}
        </div>
      </div>
      <div onClick={nextPlayer} className='player'>
        {currentPlayer.name}
      </div>
      <div className='tap-hint'>Tap to move initiative forward</div>
      <button type='button' className='back-button btn' onClick={endInitiative}>Back</button>
    </>
  )
}