import { Button } from '@/components/ui'
import { RouteProvider } from '@/features/entrepreneur/route-estimation/route/context'
import RouteEstimationScreen from '@/features/entrepreneur/route-estimation/route/screen'
import { useNavigate } from 'react-router-dom'

function RouteEstimationPublic() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center w-full bg-[linear-gradient(#1F74AA,#052940)] h-1/3 p-5">
                <img
                    src="/img/logo/logo-dark-full.svg"
                    className="w-100"
                    alt="logo"
                />

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

            <div className="mx-auto">
                <RouteProvider>
                    <RouteEstimationScreen />
                </RouteProvider>
            </div>
        </div>
    )
}

export default RouteEstimationPublic
