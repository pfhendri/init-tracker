import React, { useState, useEffect } from 'react'

export const ListContext = React.createContext()

export const ListProvider = (props) => {
  const [list, setList] = useState([])

  useEffect(() => {
    const savedList = localStorage.getItem('currentList')
    if(savedList){
      setList(JSON.parse(savedList))
    }
  }, [])

  const addPlayer = (newPlayer) => {
    newPlayer.id = Math.floor(Date.now())
    const updatedList = [...list, newPlayer]
    setList(updatedList)
  }

  const updatePlayer = (name, value, player) => {
    const updatedPlayer = { ...player, [name]: value }
    const playerList = list.slice()
    const playerIndex = playerList.findIndex(({id}) => id === player.id)
    playerList[playerIndex] = updatedPlayer
    setList(playerList)
  }

  const removePlayer = (id) => {
    const updatedList = list.filter(player => player.id !== id)
    setList(updatedList)
  }

  const clearList = () => {
    setList([])
    localStorage.removeItem('currentList')
  }

  const saveList = () => {
    localStorage.setItem('currentList', JSON.stringify(list))
  }

  return(
    <ListContext.Provider value={ { list, addPlayer, updatePlayer, removePlayer, clearList, saveList } }>
      {props.children}
    </ListContext.Provider>
  )
}