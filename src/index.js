import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { AppProvider } from './contexts/AppContext'
import { SwContext } from './contexts/SwContext'

const ServiceWorkerApp = () => {
  const { handleNotification } = React.useContext(SwContext)

  

  React.useEffect( () => {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.register({
      onSuccess: (reg) => { handleNotification('Successfully Installed') },
      onUpdate: (reg) => { handleNotification(<div>App ready to update! <button class='btn btn-negative' onClick={() => window.location.reload()}>Update</button></div>) }
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


