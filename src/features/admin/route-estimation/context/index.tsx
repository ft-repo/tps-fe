import { ContextProps, FormValue } from '@/@types/admin/route-estimation'
import React, { createContext, useContext, useState } from 'react'

export const PageContext = createContext<ContextProps | null>(null)

export const RouteEstimatationProvider = (props) => {
  const { children } = props
  const [step, setStep] = useState<number>(1)
  const [dataParser, setDataParser] = useState<FormValue>({ form_template: [] })

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

export const useRouteEstimationContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useRouteEstimationContext must be used within an RouteEstimatationProvider");
  }
  return context;
};
