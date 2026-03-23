/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Props {
  // STATE
  isSelectingStart: boolean;
  isSelectingEnd: boolean;
  isEditMode: boolean;
  startPoint: LatLng | null;
  endPoint: LatLng | null;
  waypoints: LatLng[];
  routes: RouteResponse | null;
  selectedRoute: RouteType;
  // SET STATE
  setStartPoint: (value: LatLng | null) => void;
  setIsSelectingStart: (value: boolean) => void;
  setEndPoint: (value: LatLng | null) => void;
  setIsSelectingEnd: (value: boolean) => void;
  setWaypoints: (value: LatLng[]) => void;
  setError: (value: string | null) => void;
  setIsCalculating: (value: boolean) => void;
  setRoutes: (value: RouteResponse) => void;
  setIsEditMode: (value: boolean) => void;
  setSelectedRoute: (value: RouteType) => void;
  handleMapClick: (value: LatLng) => void;
  resetViewTrigger: number;
}

// Types
interface LatLng {
  lat: number;
  lng: number;
}

interface Route {
  coordinates: [number, number][];
  distance: string;
  duration: string;
  rawDistance: number;
  rawDuration: number;
}

interface RouteResponse {
  main: Route;
  alternative: Route | null;
}

interface FitBoundsProps {
  coordinates: [number, number][];
}

type RouteType = 'main' | 'alternative';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for start and end markers
const startIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const endIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const waypointIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map clicks
interface MapClickHandlerProps {
  onMapClick: (latlng: LatLng) => void;
  isSelecting: boolean;
}

const MapClickHandler = ({ onMapClick, isSelecting }: MapClickHandlerProps) => {
  useMapEvents({
    click: (e) => {
      if (isSelecting) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
}

const FitBounds = ({ coordinates }: FitBoundsProps) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coordinates, map]);

  return null;
}

// ADD after FitBounds component
const ResetView = ({ trigger }: { trigger: number }) => {
  const map = useMap();
  useEffect(() => {
    if (trigger > 0) {
      map.setView([13.736717, 100.523186], 5);
    }
  }, [trigger, map]);
  return null;
}

const Map: React.FC<Props> = (props) => {
  const {
    // STATE
    isSelectingStart,
    isSelectingEnd,
    isEditMode,
    startPoint,
    endPoint,
    waypoints,
    routes,
    selectedRoute,
    // SET STATE
    setSelectedRoute,
    // REACT HOOK FORM
    handleMapClick,
    resetViewTrigger
  } = props
  const mapRef = useRef<any>(null)

  return (
    <div className='w-full h-full flex-1 relative'>
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
        <MapClickHandler
          isSelecting={isSelectingStart || isSelectingEnd || isEditMode}
          onMapClick={handleMapClick}
        />
        <ResetView trigger={resetViewTrigger} />
        {/* Fit bounds to route when routes are calculated */}
        {routes && !isEditMode && (
          <FitBounds
            coordinates={selectedRoute === 'main' ? routes.main.coordinates : routes.alternative?.coordinates || routes.main.coordinates}
          />
        )}

        {startPoint && (
          <Marker position={startPoint} icon={startIcon}>
            <Popup>Start Point</Popup>
          </Marker>
        )}

        {endPoint && (
          <Marker position={endPoint} icon={endIcon}>
            <Popup>End Point</Popup>
          </Marker>
        )}

        {waypoints.map((wp, idx) => (
          <Marker key={idx} position={wp} icon={waypointIcon}>
            <Popup>Waypoint {idx + 1}</Popup>
          </Marker>
        ))}

        {routes && !isEditMode && (
          <>
            {/* Main/Selected Route - always blue and prominent */}
            <Polyline
              positions={selectedRoute === 'main' ? routes.main.coordinates : routes.alternative?.coordinates || routes.main.coordinates}
              color="blue"
              weight={6}
              opacity={0.8}
            />

            {/* Alternative/Unselected Route - gray and clickable */}
            {routes.alternative && (
              <Polyline
                positions={selectedRoute === 'main' ? routes.alternative.coordinates : routes.main.coordinates}
                color="gray"
                weight={5}
                opacity={0.5}
                eventHandlers={{
                  click: () => {
                    setSelectedRoute(selectedRoute === 'main' ? 'alternative' : 'main');
                  },
                  mouseover: (e) => {
                    e.target.setStyle({ color: 'purple', weight: 6, opacity: 0.7 });
                  },
                  mouseout: (e) => {
                    e.target.setStyle({ color: 'gray', weight: 5, opacity: 0.5 });
                  }
                }}
              />
            )}
          </>
        )}
      </MapContainer>
      {(isSelectingStart || isSelectingEnd || isEditMode) && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg px-6 py-3 rounded-lg z-[1000]">
          <p className="text-sm font-medium text-gray-800">
            {isSelectingStart && '📍 กดบนแผนที่เพื่อเลือกต้นทาง'}
            {isSelectingEnd && '📍 กดบนแผนที่เพื่อเลือกปลายทาง'}
            {isEditMode && '📍 กดบนแผนที่เพื่อแก้ไขเส้นทาง'}
          </p>
        </div>
      )}
    </div>
  )
}

export default React.memo<Props>(Map)
