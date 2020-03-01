import React, { useState, useContext, useEffect } from 'react'

import { ListContext } from './ListContext'

const initialState = {
  round: 1,
  initCount: 0,
  currentPlayer: null,
  orderedList: [],
  nextPlayer: () => {},
  startInit: () => {},
  startInitiative: () => {}, 
  endInitiative: () => {}, 
  restartInitative: () => {},
}

export const InitiativeContext = React.createContext(initialState)

export const InitiativeProvider = ({children}) => {
  const [startInit, setStartInit] = useState(false)
  const [round, setRound] = useState(1)
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [orderedList, setOrderedList] = useState([])

  const [initCount, setInitCount] = useState(0)

  const { currentList: { players } } = useContext(ListContext)

  useEffect(() => {
    const initOrderList = () => {
      const sorted = players.slice().sort((pla_a, pla_b) => pla_b.init - pla_a.init)
      setOrderedList(sorted)
    }

    initOrderList()
  }, [players])

  const nextPlayer = () => {
    const currentPlayerIndex = orderedList.findIndex(player => player.id === currentPlayer.id)
    if(currentPlayerIndex + 1 < orderedList.length){
      const player = orderedList[currentPlayerIndex + 1]
      setCurrentPlayer(player)
    } else {
      setCurrentPlayer(orderedList[0])
      setRound(round + 1)
    }
    setInitCount(initCount + 1)
  }

  const firstPlayer = () => {
    console.log(orderedList)
    let firstPlayer = orderedList[0]
    orderedList.forEach(player => {
      if (parseInt(player.init) > parseInt(firstPlayer.init)){
        firstPlayer = player
      }
    })
    return firstPlayer
  }

  const startInitiative = () => {
    setStartInit(true)
    if(initCount === 0){
      const player = firstPlayer()
      setCurrentPlayer(player)
    }
  }

  const endInitiative = () => {
    setStartInit(false)
  }

  const restartInitative = () => {
    const player = firstPlayer()
    setCurrentPlayer(player)
    startInitiative()
    setRound(1)
    setInitCount(0)
  }
  
  return(
    <InitiativeContext.Provider value={{
      round, 
      initCount, 
      currentPlayer, 
      nextPlayer, 
      orderedList, 
      startInit, 
      startInitiative, 
      endInitiative, 
      restartInitative
    }}>
      {children}
    </InitiativeContext.Provider>
  )
}