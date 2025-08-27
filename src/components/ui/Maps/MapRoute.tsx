import { GeoJSON, MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet'
import { getRouteDirectionAPI, useAppDispatch, useAppSelector } from '@/store'
import { useEffect, useState } from 'react'
import { GeoJsonObject } from 'geojson'

export type MapRouteProps = {
  coordinates: number[][],
  radiuses?: number[],
  geometry?: GeoJsonObject,
  max_speed?: number,
  isRouteEstimate?: boolean,
}

function MapRoute({ coordinates, radiuses, geometry, max_speed, isRouteEstimate }: MapRouteProps) {
  const dispatch = useAppDispatch()
  const { routeDirection } = useAppSelector((state) => state.routeDirection)
  const [geometryData, setGeometryData] = useState<GeoJsonObject | null>(null)

  useEffect(() => {
    if (isRouteEstimate) {
      dispatch(getRouteDirectionAPI({ coordinates, radiuses }))
    }
  }, [coordinates, radiuses, geometry, max_speed, isRouteEstimate, dispatch])

  useEffect(() => {
    if (isRouteEstimate && routeDirection) {
      console.log(routeDirection)

      setGeometryData(routeDirection.features[0].geometry as GeoJsonObject)
    } else {
      setGeometryData(geometry as GeoJsonObject)
    }
  }, [routeDirection, isRouteEstimate, geometry])

  return (
    <div className="h-full w-full">
      <MapContainer className="h-full w-full" center={[13.7563, 100.5018]} zoom={6} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates.map((coordinate, index) => (
          <Marker key={index} position={[coordinate[1], coordinate[0]]} />
        ))}
        {geometryData && (
          <GeoJSON data={geometryData} style={{ color: 'red', weight: 3 }} />
        )}
      </MapContainer>
    </div>
  )
}

export default MapRoute