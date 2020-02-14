import React, { useContext, useState } from 'react'

import { ListContext } from '../contexts/ListContext'

import './LiveView.css'

export default (props) => {
  const { list } = useContext(ListContext)
  const { closeView } = props

  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [round, setCurrentRound] = useState(1)

  const initOrderList = () => {
    return list.sort((pla_a, pla_b) => pla_a.init - pla_b.init)
  }

  const orderedList = initOrderList()

  const nextPlayer = () => {
    if(currentPlayer + 1 < list.length){
      setCurrentPlayer(currentPlayer + 1)
    } else {
      setCurrentPlayer(0)
      setCurrentRound(round + 1)
    }
  }

  if (!list[currentPlayer]) {
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
      <button type='button' className='back-button btn' onClick={closeView}>Back</button>
    </>
  )
}