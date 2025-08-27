/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { ContextProps, RouteEstimationRequest } from '@/@types/entrepreneur/route-estimation'
import React, { createContext, useContext, useState } from 'react'

export const PageContext = createContext<ContextProps | null>(null)

export const PublicRouteProvider = (props: any) => {
  const { children } = props
  const [step, setStep] = useState<number>(1)
  const [dataParser, setDataParser] = useState<RouteEstimationRequest>({
    vehicle: [],
    start_point: {
      type: 'Point',
      coordinates: [0, 0],
    },
    end_point: {
      type: 'Point',
      coordinates: [0, 0],
    },
    vehicle_route: {
      type: 'LineString',
      coordinates: [],
    },
  })

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

export const usePublicRouteContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePublicRouteContext must be used within an PublicRouteProvider");
  }
  return context;
};
