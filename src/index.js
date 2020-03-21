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

    serviceWorker.register({
      onUpdate: (reg) => { 
        handleNotification(<div>App ready to update! <button class='btn btn-negative' onClick={() => window.location.reload()}>Update</button></div>) 
      }
    });
  }, [handleNotification])

  return <App />
}

ReactDOM.render(
  <AppProvider>
    <ServiceWorkerApp /> 
  </AppProvider>,
  document.getElementById('root')
);


