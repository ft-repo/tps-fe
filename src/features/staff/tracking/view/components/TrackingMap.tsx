/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import type { LatLngBoundsExpression, LatLngExpression, Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Props {
  coord: number[][];
  line: number[][];
  altLine?: number[][];
}

interface MarkerProps {
  item: number[];
  index: number;
}

interface PolyLineProps {
  line: number[][];
  color: string;
  weight: number;
  opacity: number;
  autoFit?: boolean;
}

// Custom icons for start and end markers
const startIcon = new L.Icon({
  iconUrl: `/public/icon/green-truck.svg`,
  iconSize: [40, 33]
  // iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  // iconSize: [25, 41],
  // iconAnchor: [12, 41],
  // popupAnchor: [1, -34],
  // shadowSize: [41, 41]
});

const endIcon = new L.Icon({
  iconUrl: `/public/icon/green-truck.svg`,
  iconSize: [40, 33]
  // iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  // iconSize: [25, 41],
  // iconAnchor: [12, 41],
  // popupAnchor: [1, -34],
  // shadowSize: [41, 41]
});

const LineStringPolyline = (props: PolyLineProps) => {
  const { line, color = "red", weight = 4, opacity = 0.8, autoFit = true } = props
  const map = useMapEvents({});

  const reorderCoordItem = useCallback((coord: number[][]) => {
    // Check if coord is empty or undefined
    if (!coord || coord.length === 0) {
      return [];
    }

    // Check if first element exists and is an array (coordinate pairs)
    if (coord[0] && Array.isArray(coord[0]) && coord[0].length >= 2) {
      // It's an array of coordinate pairs - swap lat/lng
      return coord.map(c => [c[1], c[0]]);
    }

    // Invalid format
    return [];
  }, [])

  // Calculate bounds and fit map to polyline
  useEffect(() => {
    if (!autoFit || !line || !line.length || !map) return;

    try {
      const reorderedLine = reorderCoordItem(line);

      // Check if we have valid coordinates
      if (reorderedLine.length === 0) return;

      // Calculate bounds
      const lats = reorderedLine.map(coord => coord[0]);
      const lngs = reorderedLine.map(coord => coord[1]);

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

  // Don't render if line is empty
  if (!line || line.length === 0) {
    return null;
  }

  const positions = reorderCoordItem(line);

  // Don't render if positions are invalid
  if (positions.length === 0) {
    return null;
  }

  return (
    <Polyline
      positions={positions as LatLngExpression[]}
      color={color}
      weight={weight}
      opacity={opacity}
      smoothFactor={1.0}
    />
  )
}

const LocationMarker = (props: MarkerProps) => {
  const { item, index } = props

  // Validate item exists and has required coordinates
  if (!item || item.length < 2) {
    return null;
  }
  console.log(item)
  return (
    <Marker
      position={[item[1] || 0, item[0] || 0]}
      icon={index === 0 ? startIcon : endIcon}
      eventHandlers={{
      }}
    >
      <Popup>
        {index === 0 ? `ต้นทาง: ${item}` : `ปลายทาง: ${item}`}
      </Popup>
    </Marker>
  )
}

const TrackingMap: React.FC<Props> = (props) => {
  const { coord, line, altLine } = props
  const mapRef = useRef<LeafletMap | null>(null)
  console.log('cc', coord)
  const renderLocationMarker = useMemo(() => {
    if (coord && Array.isArray(coord) && coord.length > 0) {
      return coord.map((item, index) => {
        return (
          <LocationMarker
            key={index}
            item={item}
            index={index}
          />
        )
      })
    }
    return null;
  }, [coord])

  const renderPolyLine = useMemo(() => {
    if (line && Array.isArray(line) && line.length > 0) {
      return (
        <LineStringPolyline
          line={line}
          color="red"
          weight={6}
          opacity={0.8}
        />
      )
    }
    return null;
  }, [line])

  const renderAltPolyLine = useMemo(() => {
    if (altLine && Array.isArray(altLine) && altLine.length > 0) {
      return (
        <LineStringPolyline
          line={altLine}
          color="purple"
          weight={6}
          opacity={0.7}
        />
      )
    }
    return null;
  }, [altLine])

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
        {renderAltPolyLine}
      </MapContainer>
    </div>
  )
}

export default React.memo<Props>(TrackingMap)