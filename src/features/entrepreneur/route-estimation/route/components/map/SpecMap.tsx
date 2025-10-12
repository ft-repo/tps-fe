import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import { useForm } from 'react-hook-form';
import { FaRoute, FaTimes, FaEdit } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

function MapClickHandler({ onMapClick, isSelecting }: MapClickHandlerProps) {
  useMapEvents({
    click: (e) => {
      if (isSelecting) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
}

// Function to decode OSRM polyline
const decodePolyline = (encoded: string): [number, number][] => {
  const points: [number, number][] = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b: number;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push([lat / 1e5, lng / 1e5]);
  }

  return points;
};

// Function to format distance
const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
};

// Function to format duration
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes} min`;
};

// Calculate route using OSRM API
const calculateRoute = async (start: LatLng, end: LatLng, waypoints: LatLng[] = []): Promise<RouteResponse> => {
  try {
    // Build coordinates string: start, waypoints, end
    const coordinates = [
      `${start.lng},${start.lat}`,
      ...waypoints.map(wp => `${wp.lng},${wp.lat}`),
      `${end.lng},${end.lat}`
    ].join(';');

    // Request main route
    const mainResponse = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&alternatives=false&steps=false`
    );
    const mainData = await mainResponse.json();

    if (mainData.code !== 'Ok' || !mainData.routes || mainData.routes.length === 0) {
      throw new Error('No route found');
    }

    // Request alternative routes (OSRM can provide up to 3 alternatives)
    const altResponse = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&alternatives=true&steps=false&alternatives=3`
    );
    const altData = await altResponse.json();

    const mainRoute = mainData.routes[0];
    const mainCoordinates = decodePolyline(mainRoute.geometry);

    // Get alternative route (if available)
    let alternativeRoute = null;
    if (altData.code === 'Ok' && altData.routes && altData.routes.length > 1) {
      // Use the second route as alternative
      alternativeRoute = altData.routes[1];
    }

    const result: RouteResponse = {
      main: {
        coordinates: mainCoordinates,
        distance: formatDistance(mainRoute.distance),
        duration: formatDuration(mainRoute.duration),
        rawDistance: mainRoute.distance,
        rawDuration: mainRoute.duration
      },
      alternative: null
    };

    if (alternativeRoute) {
      const altCoordinates = decodePolyline(alternativeRoute.geometry);
      result.alternative = {
        coordinates: altCoordinates,
        distance: formatDistance(alternativeRoute.distance),
        duration: formatDuration(alternativeRoute.duration),
        rawDistance: alternativeRoute.distance,
        rawDuration: alternativeRoute.duration
      };
    }

    return result;
  } catch (error) {
    console.error('Error calculating route:', error);
    throw error;
  }
};

// Geocode address using Nominatim (OpenStreetMap)
const geocodeAddress = async (address: string): Promise<LatLng> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};

export default function RouteMap() {
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [endPoint, setEndPoint] = useState<LatLng | null>(null);
  const [waypoints, setWaypoints] = useState<LatLng[]>([]);
  const [routes, setRoutes] = useState<RouteResponse | null>(null);
  const [isSelectingStart, setIsSelectingStart] = useState(false);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteType>('main');
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);

  const { setValue } = useForm();

  const handleMapClick = (latlng: LatLng) => {
    if (isSelectingStart) {
      setStartPoint(latlng);
      setStartInput(`${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`);
      setValue('startLat', latlng.lat.toFixed(6));
      setValue('startLng', latlng.lng.toFixed(6));
      setIsSelectingStart(false);
    } else if (isSelectingEnd) {
      setEndPoint(latlng);
      setEndInput(`${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`);
      setValue('endLat', latlng.lat.toFixed(6));
      setValue('endLng', latlng.lng.toFixed(6));
      setIsSelectingEnd(false);
    } else if (isEditMode && startPoint && endPoint) {
      // Add waypoint when in edit mode
      setWaypoints([...waypoints, latlng]);
    }
  };

  const handleStartInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startInput.trim()) return;

    setIsGeocoding(true);
    setError(null);
    try {
      const location = await geocodeAddress(startInput);
      setStartPoint(location);
      setValue('startLat', location.lat.toFixed(6));
      setValue('startLng', location.lng.toFixed(6));
    } catch (err) {
      setError('Could not find start location. Please try again.');
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleEndInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!endInput.trim()) return;

    setIsGeocoding(true);
    setError(null);
    try {
      const location = await geocodeAddress(endInput);
      setEndPoint(location);
      setValue('endLat', location.lat.toFixed(6));
      setValue('endLng', location.lng.toFixed(6));
    } catch (err) {
      setError('Could not find end location. Please try again.');
    } finally {
      setIsGeocoding(false);
    }
  };

  const calculateRoutes = async () => {
    if (!startPoint || !endPoint) return;

    setIsCalculating(true);
    setError(null);
    try {
      const calculatedRoutes = await calculateRoute(startPoint, endPoint, waypoints);
      setRoutes(calculatedRoutes);
      setIsEditMode(false);
    } catch (err) {
      setError('Failed to calculate route. Please try again.');
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetMap = () => {
    setStartPoint(null);
    setEndPoint(null);
    setWaypoints([]);
    setRoutes(null);
    setIsEditMode(false);
    setSelectedRoute('main');
    setError(null);
    setStartInput('');
    setEndInput('');
  };

  const removeWaypoint = (index: number) => {
    setWaypoints(waypoints.filter((_, i) => i !== index));
  };

  const handleEditRoute = () => {
    setIsEditMode(true);
    setRoutes(null);
  };

  useEffect(() => {
    if (startPoint && endPoint && waypoints.length > 0 && isEditMode) {
      // Auto-recalculate when waypoints change in edit mode
      const timer = setTimeout(() => {
        calculateRoutes();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [waypoints]);

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <FaRoute className="text-blue-600" />
          Route Planner
        </h1>

        {/* Point Selection */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Point
            </label>
            <form onSubmit={handleStartInputSubmit} className="mb-2">
              <input
                type="text"
                value={startInput}
                onChange={(e) => setStartInput(e.target.value)}
                placeholder="Enter address or place name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                disabled={isGeocoding}
              />
            </form>
            <button
              onClick={() => {
                setIsSelectingStart(true);
                setIsSelectingEnd(false);
              }}
              className={`w-full px-4 py-2 rounded-lg transition-colors ${isSelectingStart
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
            >
              {isSelectingStart ? 'Click on map...' : startPoint ? 'Change Start' : 'Or Click on Map'}
            </button>
            {startPoint && (
              <p className="text-xs text-gray-500 mt-1">
                {startPoint.lat.toFixed(4)}, {startPoint.lng.toFixed(4)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Point
            </label>
            <form onSubmit={handleEndInputSubmit} className="mb-2">
              <input
                type="text"
                value={endInput}
                onChange={(e) => setEndInput(e.target.value)}
                placeholder="Enter address or place name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                disabled={isGeocoding}
              />
            </form>
            <button
              onClick={() => {
                setIsSelectingEnd(true);
                setIsSelectingStart(false);
              }}
              className={`w-full px-4 py-2 rounded-lg transition-colors ${isSelectingEnd
                  ? 'bg-red-600 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
            >
              {isSelectingEnd ? 'Click on map...' : endPoint ? 'Change End' : 'Or Click on Map'}
            </button>
            {endPoint && (
              <p className="text-xs text-gray-500 mt-1">
                {endPoint.lat.toFixed(4)}, {endPoint.lng.toFixed(4)}
              </p>
            )}
          </div>
        </div>

        {/* Calculate Button */}
        {startPoint && endPoint && !routes && (
          <div>
            <button
              onClick={calculateRoutes}
              disabled={isCalculating}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 font-medium"
            >
              {isCalculating ? 'Calculating...' : 'Calculate Route'}
            </button>
            {error && (
              <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Route Results */}
        {routes && !isEditMode && (
          <div className="space-y-4">
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3 text-gray-800">Routes Found</h3>

              <div
                onClick={() => setSelectedRoute('main')}
                className={`p-3 rounded-lg cursor-pointer transition-all mb-2 ${selectedRoute === 'main'
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">Main Route</p>
                    <p className="text-sm text-gray-600">{routes.main.distance}</p>
                  </div>
                  <p className="text-sm font-medium text-blue-600">{routes.main.duration}</p>
                </div>
              </div>

              {routes.alternative && (
                <div
                  onClick={() => setSelectedRoute('alternative')}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${selectedRoute === 'alternative'
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">Alternative Route</p>
                      <p className="text-sm text-gray-600">{routes.alternative.distance}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-600">{routes.alternative.duration}</p>
                  </div>
                </div>
              )}

              {!routes.alternative && (
                <div className="p-2 bg-gray-100 rounded text-sm text-gray-600">
                  No alternative route available
                </div>
              )}
            </div>

            <button
              onClick={handleEditRoute}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              <FaEdit /> Modify Route
            </button>

            <button
              onClick={resetMap}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <FaTimes /> Clear All
            </button>
          </div>
        )}

        {/* Edit Mode */}
        {isEditMode && (
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
              <p className="text-sm text-orange-800 font-medium">
                Edit Mode Active
              </p>
              <p className="text-xs text-orange-600 mt-1">
                Click on map to add waypoints
              </p>
            </div>

            {waypoints.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Waypoints ({waypoints.length})
                </h4>
                <div className="space-y-2">
                  {waypoints.map((wp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-yellow-50 p-2 rounded"
                    >
                      <span className="text-sm text-gray-700">
                        {wp.lat.toFixed(4)}, {wp.lng.toFixed(4)}
                      </span>
                      <button
                        onClick={() => removeWaypoint(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={calculateRoutes}
              disabled={isCalculating}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isCalculating ? 'Recalculating...' : 'Apply Changes'}
            </button>

            <button
              onClick={() => setIsEditMode(false)}
              className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancel Edit
            </button>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler
            onMapClick={handleMapClick}
            isSelecting={isSelectingStart || isSelectingEnd || isEditMode}
          />

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

        {/* Map Instructions */}
        {(isSelectingStart || isSelectingEnd || isEditMode) && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg px-6 py-3 rounded-lg z-[1000]">
            <p className="text-sm font-medium text-gray-800">
              {isSelectingStart && '📍 Click on the map to set START point'}
              {isSelectingEnd && '📍 Click on the map to set END point'}
              {isEditMode && '📍 Click on the map to add waypoints'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}