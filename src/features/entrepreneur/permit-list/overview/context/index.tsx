/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { } from '@/@types/entrepreneur/permit-list'
import React, { createContext, useContext } from 'react'

export const PageContext = createContext<null>(null)

export const PermitProvider = (props: any) => {
  const { children } = props

  return (
    <PageContext.Provider
      value={null}
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
