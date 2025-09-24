/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import type { LatLngBoundsExpression, LatLngExpression, Map as LeafletMap } from 'leaflet'

interface Props {
  coord: number[][];
  line: number[][];
}

interface MarkerProps {
  item: number[];
}

interface PolyLineProps {
  line: number[][];
  color: string;
  weight: number;
  opacity: number;
  autoFit?: boolean;
}

const LineStringPolyline = (props: PolyLineProps) => {
  const { line, color = "red", weight = 4, opacity = 0.8, autoFit = true } = props
  const map = useMapEvents({});

  const reorderCoordItem = useCallback((coord: number[][]) => {
    if (Array.isArray(coord[0])) {
      // It's an array of coordinate pairs
      return coord.map(coord => [coord[1], coord[0]]);
    } else {
      // It's a single coordinate pair
      return [coord[1], coord[0]];
    }
  }, [])

  // Calculate bounds and fit map to polyline
  useEffect(() => {
    if (!autoFit || !line.length || !map) return;

    try {
      // Calculate bounds
      const lats = reorderCoordItem(line).map(coord => coord[0]);
      const lngs = reorderCoordItem(line).map(coord => coord[1]);

      const bounds = [
        [Math.min(...lats), Math.min(...lngs)], // Southwest
        [Math.max(...lats), Math.max(...lngs)]  // Northeast
      ];

      // Fit map to bounds with padding
      map.fitBounds(bounds as LatLngBoundsExpression, {
        padding: [20, 20], // Add padding around the polyline
        maxZoom: 16 // Prevent zooming too close
      });
    } catch (error) {
      console.error('Error fitting bounds:', error);
    }
  }, [line, map, autoFit, reorderCoordItem]);

  return (
    <Polyline
      positions={reorderCoordItem(line) as LatLngExpression[]}
      color={color}
      weight={weight}
      opacity={opacity}
      smoothFactor={1.0}
    />
  )
}

const LocationMarker = (props: MarkerProps) => {
  const { item } = props

  return (
    <Marker position={[item[1], item[0]]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  )
}

const Map: React.FC<Props> = (props) => {
  const { coord, line } = props
  const mapRef = useRef<LeafletMap | null>(null)

  const renderLocationMarker = useMemo(() => {
    if (typeof coord !== 'undefined') {
      return coord.map((item, index) => {
        return (
          <LocationMarker
            key={index}
            item={item}
          />
        )
      })
    }
  }, [coord])

  const renderPolyLine = useMemo(() => {
    if (typeof line !== 'undefined') {
      return (
        <LineStringPolyline
          line={line}
          color="red"
          weight={4}
          opacity={0.8}
        />
      )
    }
  }, [line])

  return (
    <div className='w-full h-full'>
      <MapContainer
        ref={mapRef}
        center={[13.736717, 100.523186]}
        zoom={5}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderLocationMarker}
        {renderPolyLine}
      </MapContainer>
    </div>
  )
}

export default React.memo<Props>(Map)
