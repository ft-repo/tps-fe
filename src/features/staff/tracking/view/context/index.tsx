/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { Estimate } from '@/store/slices/staff/trackingSlice';
import { createContext, useContext, useState } from 'react'

export interface ContextProps {
  index: number;
  item: Estimate;
  setIndex: (value: number) => void;
  setItem: (value: Estimate) => void;
}

export interface DataParser {

}

export const PageContext = createContext<ContextProps | null>(null)

export const ViewProvider = (props: any) => {
  const { children } = props
  const [index, setIndex] = useState<number>(0)
  const [item, setItem] = useState<Estimate>({
    id: '',
    turn_radius: 0,
    towing_vehicle_id: 0,
    semi_trailer_vehicle_id: 0,
    etc_vehicle_id: null,
    towing_axis_weight: [],
    semi_trailer_axis_weight: [],
    sort: 0,
    created_by: '',
    gps: {
      plate: '',
      speed: 0,
      timestamp: '',
      geom: [],
      is_show: false,
    },
    towing_vehicle: {
      id: 0,
      user_id: '',
      vehicle_type_id: 0,
      plate_no: '',
      plate_province: '',
      brand: '',
      weight: 0,
      color: '',
      kingpin_distance: 0,
      width: 0,
      length: 0,
      height: 0,
      axis_number: 0,
      registration_document_url: '',
    },
    semi_trailer_vehicle: {
      id: 0,
      user_id: '',
      vehicle_type_id: 0,
      plate_no: '',
      plate_province: '',
      brand: '',
      weight: 0,
      color: '',
      kingpin_distance: 0,
      width: 0,
      length: 0,
      height: 0,
      axis_number: 0,
      registration_document_url: '',
    },
    etc_vehicle: {
      id: 0,
      user_id: '',
      vehicle_type_id: 0,
      plate_no: '',
      plate_province: '',
      brand: '',
      weight: 0,
      color: '',
      kingpin_distance: 0,
      width: 0,
      length: 0,
      height: 0,
      axis_number: 0,
      registration_document_url: '',
    }
  })

  return (
    <PageContext.Provider
      value={{
        index,
        item,
        setIndex,
        setItem
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export const useViewContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useViewContext must be used within an ViewProvider");
  }
  return context;
};
