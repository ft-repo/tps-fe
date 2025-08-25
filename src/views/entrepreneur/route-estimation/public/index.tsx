import { Button } from '@/components/ui'
import { PublicRouteProvider } from '@/features/entrepreneur/route-estimation/public/context'
import RouteEstimationScreen from '@/features/entrepreneur/route-estimation/public/screen'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getVehicleType, useAppDispatch } from '@/store'

function RouteEstimationPublic() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getVehicleType())
  }, [dispatch])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center w-full bg-[linear-gradient(#1F74AA,#052940)] h-1/3 p-5">
        <img src="/img/logo/logo-dark-full.svg" className="w-100" alt="logo" />

        <Button
          variant="solid"
          type="button"
          onClick={() => {
            navigate('/sign-in')
          }}
        >
          ลงชื่อเข้าใช้
        </Button>
      </div>

      <div className="mx-5">
        <PublicRouteProvider>
          <RouteEstimationScreen />
        </PublicRouteProvider>
      </div>
    </div>
  )
}

export default RouteEstimationPublic
