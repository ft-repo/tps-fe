import { Control } from "react-hook-form"

export interface FormProps {
    formIndex: number
    control: Control<any>
    vehicleList: any
    setVehicleId: (id: string | null) => void
  }