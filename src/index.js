import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { AppProvider } from './contexts/AppContext'
import { SwContext } from './contexts/SwContext'

const ServiceWorkerApp = () => {
  const { handleNotification } = React.useContext(SwContext)  
  const [installPrompt, setInstallPrompt] = React.useState(null)

  React.useEffect( () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      console.log('Install Prompt Fired')

      setInstallPrompt(e)

      handleNotification(<div>Would you like to install this App on your device? <button className='btn btn-negative' onClick={installApp}>Install</button></div>)
    })

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

    serviceWorker.register({
      onUpdate: (reg) => { 
        handleNotification(<div>App ready to update! <button class='btn btn-negative' onClick={() => window.location.reload()}>Update</button></div>) 
      }
    });
  }, [])

  return <App />
}

ReactDOM.render(
  <AppProvider>
    <ServiceWorkerApp /> 
  </AppProvider>,
  document.getElementById('root')
);


