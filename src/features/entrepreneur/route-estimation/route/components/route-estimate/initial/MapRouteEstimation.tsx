import { memo, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface Props {
  firstPoint?: [number, number];
  secondPoint?: [number, number];
}

const MapRouteEstimation: React.FC<Props> = (props: Props) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);

  useEffect(() => {
    if (mapRef.current && !mapInitialized.current) {
      mapInitialized.current = true;
      const mapInstance = L.map(mapRef.current).setView([13.7563, 100.5018], 7);
      setMap(mapInstance);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance);

      if (props.firstPoint) {
        L.marker(props.firstPoint).addTo(mapInstance);
      }

      if (props.secondPoint) {
        L.marker(props.secondPoint).addTo(mapInstance);
      }

      // Force map to resize after a short delay to ensure proper rendering
      setTimeout(() => {
        mapInstance.invalidateSize();
      }, 100);
    }

    // Cleanup function
    return () => {
      if (map) {
        map.remove();
        setMap(null);
        mapInitialized.current = false;
      }
    };
  }, []); // Empty dependency array to run only once

  // Handle markers separately
  useEffect(() => {
    if (map) {
      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add new markers
      if (props.firstPoint) {
        L.marker(props.firstPoint).addTo(map);
      }

      if (props.secondPoint) {
        L.marker(props.secondPoint).addTo(map);
      }
    }
  }, [map, props.firstPoint, props.secondPoint]);

  // Handle map resize when container changes
  useEffect(() => {
    if (map) {
      const handleResize = () => {
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [map]);

  return (
    <div ref={mapRef} className='h-full w-full rounded-md' />
  )
}

export default memo<Props>(MapRouteEstimation);