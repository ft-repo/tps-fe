/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { ContextProps, FieldType } from '@/@types/entrepreneur/route-estimation'
import React, { createContext, useContext, useState } from 'react'

export const PageContext = createContext<ContextProps | null>(null)

export const OtherProvider = (props: any) => {
  const { children } = props
  const [step, setStep] = useState<number>(1)
  const [dataParser, setDataParser] = useState<FieldType>({ form_template: [] })

  return (
    <PageContext.Provider
      value={{
        step,
        setStep,
        dataParser,
        setDataParser
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export const useOtherContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useOtherContext must be used within an OtherProvider");
  }
  return context;
};
