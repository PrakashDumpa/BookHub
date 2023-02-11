import React from 'react'

const BookHubContext = React.createContext({
  currentRouteId: '',
  setCurrentRouteId: () => {},
})

export default BookHubContext
