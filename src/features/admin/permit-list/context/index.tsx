import {  } from '@/@types/admin/permit-list'
import React, { createContext, useContext, useState } from 'react'

export const PageContext = createContext<null>(null)

export const PermitProvider = (props) => {
  const { children } = props

  return (
    <PageContext.Provider
      value={{
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export const usePermitContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePermitContext must be used within an PermitProvider");
  }
  return context;
};
