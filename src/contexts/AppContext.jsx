import React from 'react'

// Import other contexts
import { ListProvider } from './ListContext'
import { InitiativeProvider } from './InitContext'

export const AppProvider = ({children}) => {
  return(
    <ListProvider>
      <InitiativeProvider>
        {children}
      </InitiativeProvider>
    </ListProvider>
  )
}