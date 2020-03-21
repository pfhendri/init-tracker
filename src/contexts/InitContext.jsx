import React, { useState, useContext, useEffect } from 'react'

import { ListContext } from './ListContext'

const initialState = {
  round: 1,
  initCount: 0,
  currentPlayer: null,
  orderedList: [],
  goToNextPlayer: () => {},
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
  const [playerOnDeck, setPlayerOnDeck] = useState(null)
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

  const goToNextPlayer = () => {
    const currentPlayerIndex = orderedList.findIndex(player => player.id === currentPlayer.id)
    if(currentPlayerIndex + 1 < orderedList.length){
      const player = orderedList[currentPlayerIndex + 1]
      setCurrentPlayer(player)
      if(currentPlayerIndex + 2 < orderedList.length){
        setPlayerOnDeck(orderedList[currentPlayerIndex + 2])
      }else {
        setPlayerOnDeck(orderedList[0])
      }
    } else {
      setCurrentPlayer(orderedList[0])
      setPlayerOnDeck(orderedList[1])
      setRound(round + 1)
    }
    setInitCount(initCount + 1)
  }

  const startInitiative = () => {
    setStartInit(true)
    if(initCount === 0){
      setCurrentPlayer(orderedList[0])
      setPlayerOnDeck(orderedList[1])
    } else {
      const currentPlayerIndex = orderedList.findIndex(player => player.id === currentPlayer.id)
      setPlayerOnDeck(orderedList[currentPlayerIndex + 1])
    }
  }

  const endInitiative = () => {
    setStartInit(false)
  }

  const restartInitative = () => {
    setCurrentPlayer(orderedList[0])
    setPlayerOnDeck(orderedList[1])
    startInitiative()
    setRound(1)
    setInitCount(0)
  }
  
  return(
    <InitiativeContext.Provider value={{
      round, 
      initCount, 
      currentPlayer, 
      playerOnDeck,
      goToNextPlayer, 
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