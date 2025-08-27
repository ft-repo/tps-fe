/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { PetitionEstimateRequest, PetitionEstimateResponse } from '@/@types/services/petition';
import { createContext, useContext, useState } from 'react'

export interface ContextProps {
  step: number;
  setStep: (step: number | any) => void;
  dataParser: DataParser;
  setDataParser: (dataParser: DataParser) => void;
}

export interface DataParser extends MatchType {
  req_data: PetitionEstimateRequest;
  res_data: PetitionEstimateResponse;
}

export interface MatchType {
  match_type: number;
}

export const PageContext = createContext<ContextProps | null>(null)

export const RouteProvider = (props: any) => {
  const { children } = props
  const [step, setStep] = useState<number>(1)
  const [dataParser, setDataParser] = useState<DataParser>({
    req_data: {
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
    },
    res_data: {
      estimate: [],
      set_id: ''
    },
    match_type: 0
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

export const useRouteContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useRouteContext must be used within an RouteProvider");
  }
  return context;
};
