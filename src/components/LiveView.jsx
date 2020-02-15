import React, { useContext, useState } from 'react'

import { ListContext } from '../contexts/ListContext'

import './LiveView.css'

export default (props) => {
  const { currentList: { players } } = useContext(ListContext)
  const { closeView } = props

  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [round, setCurrentRound] = useState(1)

  const initOrderList = () => {
    const sorted = players.slice().sort((pla_a, pla_b) => pla_b.init - pla_a.init)
    return sorted
  }

  const orderedList = initOrderList()

  const nextPlayer = () => {
    if(currentPlayer + 1 < players.length){
      setCurrentPlayer(currentPlayer + 1)
    } else {
      setCurrentPlayer(0)
      setCurrentRound(round + 1)
    }
  }

  if (!players[currentPlayer]) {
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
        {orderedList[currentPlayer].name}
      </div>
      <div className='tap-hint'>Tap to move initiative forward</div>
      <button type='button' className='back-button btn' onClick={closeView}>Back</button>
    </>
  )
}