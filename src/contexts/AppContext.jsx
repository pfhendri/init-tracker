import React from 'react'

// Import other contexts
import { ListProvider } from './ListContext'
import { InitiativeProvider } from './InitContext'
import { SwProvider } from './SwContext'

export const AppProvider = ({children}) => {
  return(
    <SwProvider>
      <ListProvider>
        <InitiativeProvider>
          {children}
        </InitiativeProvider>
      </ListProvider>
    </SwProvider>
  )
}