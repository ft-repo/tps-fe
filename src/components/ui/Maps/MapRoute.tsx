import { GeoJSON, MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet'
import { getRouteDirectionAPI, useAppDispatch, useAppSelector } from '@/store'
import { useCallback, useEffect, useState } from 'react'
import { GeoJsonObject } from 'geojson'

/**
 * @param coordinates Points for drawing distance, coordinates [longitude, latitude] must have at least 2 points
 * @param radiuses Radius of points
 * @param geometry Shape of the distance, must be GeoJSON with LineString shape
 * @param max_speed Maximum speed
 * @param isRouteEstimate If true, will call API to fetch route distance. If false, must provide geometry
 */
export type MapRouteProps = {
  coordinates: [number, number][] | null,
  radiuses?: number[],
  geometry?: GeoJsonObject,
  max_speed?: number,
  isRouteEstimate?: boolean,
}

/**
 * @param coordinates Points for drawing distance, coordinates [longitude, latitude] must have at least 2 points
 * @param radiuses Radius of points
 * @param geometry Shape of the distance, must be GeoJSON with LineString shape
 * @param max_speed Maximum speed
 * @param isRouteEstimate If true, will call API to fetch route distance. If false, must provide geometry
 */
function MapRoute({ coordinates, geometry, isRouteEstimate = false }: MapRouteProps) {
  const dispatch = useAppDispatch()
  const { routeDirection } = useAppSelector((state) => state.routeDirection)
  const [geometryData, setGeometryData] = useState<GeoJsonObject | null>(null)

  const validateData = useCallback(() => {
    if (!coordinates) {
      return false
    }

    if (coordinates.length < 2) {
      return false
    }

    if (coordinates.some((coordinate) => coordinate.some((c) => c === null || c === undefined || c === 0))) {
      return false
    }

    if (!isRouteEstimate && (!geometry || geometry.type !== 'LineString')) {
      return false
    }

    return true
  }, [coordinates, isRouteEstimate, geometry])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isRouteEstimate && validateData()) {
        dispatch(getRouteDirectionAPI({ coordinates: coordinates as [number, number][] }))
      }
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [coordinates, isRouteEstimate, dispatch, validateData])

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
        {coordinates && coordinates.map((coordinate, index) => (
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