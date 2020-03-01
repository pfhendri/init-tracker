import React, { useState } from 'react'

import Notification from '../components/Notifications/Notification'

const initialContext = {
  handleNotification: (text) => {}
}

export const SwContext = React.createContext(initialContext)

export const SwProvider = ({children}) => {
  const [notification, setNotification] = useState(null)

  const handleNotification = (text) => {
    setNotification(text) 
  }

  return(
    <SwContext.Provider value={{ handleNotification }}>
      { notification && <Notification notification={notification} clearNotification={() => setNotification(null)} /> }
      { children }
    </SwContext.Provider>
  )
}