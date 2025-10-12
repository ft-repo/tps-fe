export interface LatLng {
  lat: number;
  lng: number;
}

export interface Route {
  coordinates: [number, number][];
  distance: string;
  duration: string;
  rawDistance: number;
  rawDuration: number;
}


export interface RouteResponse {
  main: Route;
  alternative: Route | null;
}

export type Coordinate = [number, number];

// Function to decode OSRM polyline
export const decodePolyline = (encoded: string): [number, number][] => {
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
export const formatDistance = (meters: number): string => {
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
export const calculateRoute = async (start: LatLng, end: LatLng, waypoints: LatLng[] = []): Promise<RouteResponse> => {
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
export const geocodeAddress = async (address: string): Promise<LatLng> => {
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

// Function to swap a single coordinate pair from [lat, lng] to [lng, lat]
export const swapCoordinates = (coord: Coordinate | any): Coordinate => {
  if (!Array.isArray(coord) || coord.length !== 2) {
    throw new Error('Invalid coordinate format. Expected [lat, lng] array.');
  }
  return [coord[1], coord[0]];
};

// Type guard to check if array is a coordinate pair
export const isCoordinate = (data: unknown): data is Coordinate => {
  return (
    Array.isArray(data) &&
    data.length === 2 &&
    typeof data[0] === 'number' &&
    typeof data[1] === 'number'
  );
};

// Function to recursively swap coordinates in nested structures
export const swapCoordinatesDeep = <T,>(data: T): T => {
  if (isCoordinate(data)) {
    return [data[1], data[0]] as T;
  } else if (Array.isArray(data)) {
    return data.map(item => swapCoordinatesDeep(item)) as T;
  } else if (typeof data === 'object' && data !== null) {
    const result: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result[key] = swapCoordinatesDeep(data[key]);
      }
    }
    return result as T;
  }
  return data;
};
