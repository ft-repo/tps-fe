/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { JSX, useCallback, useEffect, useMemo, useRef } from 'react'
import { MapContainer, Marker, Polyline, TileLayer, useMapEvents } from 'react-leaflet'
import type { LatLngBoundsExpression, LatLngExpression, Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { TrackingDetail } from '@/store/slices/staff/trackingSlice';
import { useViewContext } from '../context';

interface Props {
  coord?: number[][]; // Make optional since we'll use API data
  line?: number[][];
  altLine?: number[][];
  apiData?: TrackingDetail; // Add API data prop
  projectId: number | null;
  setProjectId: (value: number | null) => void;
  isFirstClick: boolean;
}

interface MarkerProps {
  item: number[];
  index: number;
  vehicleInfo?: {
    plate: string;
    speed: number;
    timestamp: string;
    projectName: string;
    projectId: number;
  };
  setProjectId: (value: number | null) => void;
  isFirstClick: boolean;
}

interface PolyLineProps {
  line: number[][];
  color: string;
  weight: number;
  opacity: number;
  autoFit?: boolean;
}

// Custom icons for start and end markers
const activeIcon = new L.Icon({
  iconUrl: `/public/icon/green-truck.svg`,
  iconSize: [40, 33]
});

const inactiveIcon = new L.Icon({
  iconUrl: `/public/icon/yellow-truck.svg`,
  iconSize: [40, 33]
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
    if (!map) return;

    // Reset to default view if no line
    if (!line || line[0].length === 0) {
      map.setView([13.736717, 100.523186], 5);
      return;
    }

    if (!autoFit) return;

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
  const { item, vehicleInfo, setProjectId, isFirstClick } = props
  const map = useMapEvents({});
  const { } = useViewContext()

  // Validate item exists and has required coordinates
  if (!item || item.length < 2) {
    return null;
  }

  return (
    <Marker
      position={[item[1] || 0, item[0] || 0]}
      icon={vehicleInfo?.speed !== 0 ? activeIcon : inactiveIcon}
      eventHandlers={{
        click: () => {
          if (isFirstClick) {
            map.setView([item[1] || 0, item[0]], 8);
          }

          setProjectId(Number(vehicleInfo?.projectId))
        }
      }}
    >
    </Marker>
  )
}

const TrackingMap: React.FC<Props> = (props) => {
  const { coord, line, altLine, apiData, projectId, setProjectId, isFirstClick } = props
  const mapRef = useRef<LeafletMap | null>(null)

  const renderLocationMarker = useMemo(() => {
    if (coord && Array.isArray(coord) && coord.length > 0) {
      return coord.map((item, index) => {
        return (
          <LocationMarker
            key={index}
            item={item}
            index={index}
            setProjectId={setProjectId}
            isFirstClick={isFirstClick}
          />
        )
      })
    }
    return null;
  }, [coord, setProjectId, isFirstClick])

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

  // Render markers from API data (all vehicles from all projects)
  const renderVehicleMarkers = useMemo(() => {
    if (!apiData || !apiData.business || !apiData.business_detail) {
      return null;
    }

    const markers: JSX.Element[] = [];
    let markerIndex = 0;

    if (!projectId) {
      apiData.business.project.forEach((project) => {
        if (!project.vehicles || !Array.isArray(project.vehicles)) {
          return;
        }
        project.vehicles.forEach((vehicle) => {
          // Only show vehicles where is_show is true
          // if (!vehicle.is_show || !vehicle.geom || vehicle.geom.length < 2) {
          //   return;
          // }

          markers.push(
            <LocationMarker
              key={`vehicle-${project.project_id}-${vehicle.plate}-${markerIndex}`}
              item={vehicle.geom} // geom is [lng, lat]
              index={markerIndex}
              vehicleInfo={{
                plate: vehicle.plate,
                speed: vehicle.speed,
                timestamp: vehicle.timestamp,
                projectName: project.project_name,
                projectId: project.project_id
              }}
              setProjectId={setProjectId}
              isFirstClick={isFirstClick}
            />
          );
          markerIndex++;
        });
      });
    } else {
      apiData.business_detail.estimate.forEach((project) => {
        if (!project.gps.geom || !Array.isArray(project.gps.geom)) {
          return;
        }

        markers.push(
          <LocationMarker
            key={`vehicle-${project.id}-${project.gps.plate}-${markerIndex}`}
            item={project.gps.geom} // geom is [lng, lat]
            index={markerIndex}
            vehicleInfo={{
              plate: project.gps.plate,
              speed: project.gps.speed,
              timestamp: project.gps.timestamp,
              projectName: apiData.business_detail.road_details.project_name,
              projectId: projectId
            }}
            setProjectId={setProjectId}
            isFirstClick={isFirstClick}
          />
        );
        markerIndex++;
      });
    }



    return markers.length > 0 ? markers : null;
  }, [apiData, projectId, setProjectId, isFirstClick])

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
        {renderVehicleMarkers}
      </MapContainer>
    </div>
  )
}

export default React.memo<Props>(TrackingMap)