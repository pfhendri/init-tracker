import React, { useState, useEffect } from 'react'

import Notification from '../components/Notifications/Notification'

const initialContext = {
  handleNotification: (text) => {}
}

export const SwContext = React.createContext(initialContext)

export const SwProvider = ({children}) => {
  const [notification, setNotification] = useState(null)
  const [installPrompt, setInstallPrompt] = useState(null)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      console.log('Install Prompt Fired')

      setInstallPrompt(e)

      if((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true){
        return false;
      }
      
      if(installPrompt){
        setNotification(<div>Would you like to install this App on your device? <button className='btn btn-negative' onClick={installApp}>Install</button></div>)
      }
    })
  }, [])

  const installApp = async () => {
    if(!installPrompt) return false

    installPrompt.prompt()
    let outcome = await this.installPrompt.userChoice
    if(outcome.outcome === 'accepted'){
      console.log("App Installed")
    }
    else{
      console.log("App not installed");
    }

    setInstallPrompt(null)
  }

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