import React, { useState } from 'react'
import { DataContext } from './DataContext'

export const DataProvider = ({children}: any) => {
  const [identifier, setIdentifier] = useState('')
  const [success, setSuccess] = useState(false)
  return (
    <DataContext.Provider value={{identifier, setIdentifier, success, setSuccess}}>
      {children}
    </DataContext.Provider>
  )
}
