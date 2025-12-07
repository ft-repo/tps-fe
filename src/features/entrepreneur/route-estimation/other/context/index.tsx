/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { PetitionExtendedPostRequest } from '@/@types/services/petition'
import React, { createContext, useContext, useState } from 'react'

export interface ContextProps {
  step: number;
  setStep: (step: number | any) => void;
  dataParser: DataParser;
  setDataParser: (dataParser: DataParser) => void;
}
export interface DataParser extends MatchType {
  data: PetitionExtendedPostRequest;
  value: FieldValue;
  temporary_id: string;
}

export interface MatchType {
  match_type: number;
}

export interface FieldValue {
  is_same: boolean[];
}

export const PageContext = createContext<ContextProps | null>(null)

export const OtherProvider = (props: any) => {
  const { children } = props
  const [step, setStep] = useState<number>(1)
  const [dataParser, setDataParser] = useState<DataParser>({
    data: {
      petition_extended_detail: {
        cert_date: '',
        poa_name: '',
        phone_number: '',
        ref_form_no: '',
        remark: ''
      },
      petition_extended_address: {
        contact_address: {
          house_number: '',
          village: '',
          lane: '',
          road: '',
          sub_district_id: 0,
          district_id: 0,
          province_id: 0,
          zip_code: ''
        },
        poa_address: {
          house_number: '',
          village: '',
          lane: '',
          road: '',
          sub_district_id: 0,
          district_id: 0,
          province_id: 0,
          zip_code: ''
        }
      },
      petition_extended_vehicle: {
        towing_vehicle_id: 0,
        semi_trailer_vehicle_id: 0,
        etc_vehicle_id: [],
        axis_weight_towing: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        axis_weight_semi_trailer: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
      },
    },
    value: {
      is_same: [],
    },
    match_type: 0,
    temporary_id: ''
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

export const useOtherContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useOtherContext must be used within an OtherProvider");
  }
  return context;
};
