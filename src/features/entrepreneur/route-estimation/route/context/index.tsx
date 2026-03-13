/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { FieldTypeArr, RegionState } from '@/@types/entrepreneur/route-estimation';
import { PetitionEstimateRequest, PetitionEstimateResponse, EstimateResponse } from '@/@types/services/petition';
import { AxisMaxWeight } from '@/@types/shared';
import { createContext, useContext, useState } from 'react'

export interface ContextProps {
  step: number;
  setStep: (step: number | any) => void;
  dataParser: DataParser;
  setDataParser: (dataParser: DataParser) => void;
  index: number;
  item: EstimateResponse;
  setIndex: (value: number) => void;
  setItem: (value: EstimateResponse) => void;
  towingMaxWeight: AxisMaxWeight[];                          // ← add
  setTowingMaxWeight: (value: AxisMaxWeight[]) => void;     // ← add
  semiMaxWeight: AxisMaxWeight[];                            // ← add
  setSemiMaxWeight: (value: AxisMaxWeight[]) => void;       // ← add
}

export interface DataParser {
  req_data: PetitionEstimateRequest;
  res_data: PetitionEstimateResponse;
  raw_body: FieldTypeArr;
  region_detail: {
    start: RegionState,
    end: RegionState
  }
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
    raw_body: {
      start_point: 0,
      end_point: 0,
      // start_latitude: 0,
      // start_longitude: 0,
      // end_latitude: 0,
      // end_longitude: 0,
      route_form: []
    },
    region_detail: {
      start: {
        id: null,
        name: null
      },
      end: {
        id: null,
        name: null
      },
    }
  })
  const [index, setIndex] = useState<number>(0)
  const [item, setItem] = useState<EstimateResponse>({
    estimate_id: '',
    vehicle: []
  })
  const [towingMaxWeight, setTowingMaxWeight] = useState<AxisMaxWeight[]>([])
  const [semiMaxWeight, setSemiMaxWeight] = useState<AxisMaxWeight[]>([])

  return (
    <PageContext.Provider
      value={{
        step,
        setStep,
        dataParser,
        setDataParser,
        index,
        item,
        setIndex,
        setItem,
        towingMaxWeight,
        setTowingMaxWeight,
        semiMaxWeight,
        setSemiMaxWeight
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
