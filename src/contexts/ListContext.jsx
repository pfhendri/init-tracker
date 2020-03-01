import React, { useState, useEffect } from 'react'

import { generateId } from '../util'

export const ListContext = React.createContext()

export const ListProvider = (props) => {
  const [currentList, setList] = useState({ id: generateId(), name: '', players: [] })
  const [isNewList, setNewList] = useState(true)

  const [lists, setLists] = useState([])

  const [listNotification, setListNotification] = useState(null)

  useEffect(() => {
    const savedLists = localStorage.getItem('savedLists')
    if(savedLists){
      setLists(JSON.parse(savedLists))
    }
  }, [])

  const addPlayer = (newPlayer) => {
    newPlayer.id = generateId()
    const updatedList = {...currentList, players: [ ...currentList.players, newPlayer] }
    setList(updatedList)
  }

  const updatePlayer = (name, value, player) => {
    const updatedPlayer = { ...player, [name]: value }
    const playerList = currentList.players.slice()
    const playerIndex = playerList.findIndex(({id}) => id === player.id)
    playerList[playerIndex] = updatedPlayer
    const updatedList = {...currentList, players: playerList}
    setList(updatedList)
  }

  const removePlayer = (id) => {
    const updatedList = currentList.players.filter(player => player.id !== id)
    setList({ ...currentList, players: updatedList })
  }

  const newList = () => {
    setList({ id: generateId(), name: '', players: []})
    setNewList(true)
  }

  const updateList = (value) => {
    const updatedList = {...currentList, name: value}
    setList(updatedList)
  }

  const setCurrentList = (id) => {
    const list = lists.find(li => li.id === id)
    if (list) {
      setList(list)
      setNewList(false)
    } else {
      newList()
    }
  }

  const clearList = () => {
    setList({name: '', players: []})
  }

  const removeList = () => {
    const updatedLists = lists.filter(list => list.id !== currentList.id)
    setLists(updatedLists)
    localStorage.setItem('savedLists', JSON.stringify(updatedLists))  
    newList()
    setListNotification('List Removed')
  }

  const saveList = () => {
    const updatedLists = [...lists]
    const currentListIndex = updatedLists.findIndex(list => list.id === currentList.id)
    if (currentListIndex >= 0) {
      updatedLists[currentListIndex] = currentList
    } else {
      updatedLists.push(currentList)
    }
    setLists(updatedLists)
    localStorage.setItem('savedLists', JSON.stringify(updatedLists))
    setNewList(false)
    setListNotification('List Saved')
  }

  const clearNotification = () => {
    setListNotification(null)
  }

  return(
    <ListContext.Provider value={ { isNewList, currentList, addPlayer, updatePlayer, removePlayer, lists, newList, setCurrentList, updateList, clearList, removeList, saveList, listNotification, clearNotification } }>
      {props.children}
    </ListContext.Provider>
  )
}