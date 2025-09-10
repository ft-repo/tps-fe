/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { EstimateRouteSubDetail } from '@/@types/reducer/petition';
import { createContext, useContext, useState } from 'react'

export interface ContextProps {
  index: number;
  item: EstimateRouteSubDetail;
  setIndex: (value: number) => void;
  setItem: (value: EstimateRouteSubDetail) => void;
}

export const PageContext = createContext<ContextProps | null>(null)

export const OtherProvider = (props: any) => {
  const { children } = props
  const [index, setIndex] = useState<number>(0)
  const [item, setItem] = useState<EstimateRouteSubDetail>({
    estimate_id: '',
    sort: ''
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

export const useOtherContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useOtherContext must be used within an OtherProvider");
  }
  return context;
};
