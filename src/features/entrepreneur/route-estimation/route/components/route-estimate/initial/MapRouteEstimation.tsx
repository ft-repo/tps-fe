import { memo, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface Props {
  firstPoint?: [number, number] | null;
  secondPoint?: [number, number] | null;
}

const MapRouteEstimation: React.FC<Props> = (props: Props) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);
  const routingControlRef = useRef<any>(null);
  
  const validatePoint = (point: [number, number] | null) => {
    if (!point) return false;
    return point.every(value => value !== null && !isNaN(value) && value !== undefined);
  }

  useEffect(() => {
    if (mapRef.current && !mapInitialized.current) {
      mapInitialized.current = true;
      const mapInstance = L.map(mapRef.current).setView([13.7563, 100.5018], 7);
      setMap(mapInstance);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance);

      if (props.firstPoint && validatePoint(props.firstPoint)) {
        L.marker([props.firstPoint[0], props.firstPoint[1]]).addTo(mapInstance);
      }

      if (props.secondPoint && validatePoint(props.secondPoint)) {
        L.marker([props.secondPoint[0], props.secondPoint[1]]).addTo(mapInstance);
      }

      if (props.firstPoint && props.secondPoint && validatePoint(props.firstPoint) && validatePoint(props.secondPoint)) {
        routingControlRef.current = L.Routing.control({
          waypoints: [L.latLng(props.firstPoint[0], props.firstPoint[1]), L.latLng(props.secondPoint[0], props.secondPoint[1])],
          routeWhileDragging: false
        }).addTo(mapInstance);
      }

      // Force map to resize after a short delay to ensure proper rendering
      setTimeout(() => {
        mapInstance.invalidateSize();
      }, 100);
    }

    // Cleanup function
    return () => {
      if (map) {
        // Remove routing control if exists
        if (routingControlRef.current) {
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
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
      if (props.firstPoint && validatePoint(props.firstPoint)) {
        L.marker([props.firstPoint[0], props.firstPoint[1]]).addTo(map);
      }

      if (props.secondPoint && validatePoint(props.secondPoint)) {
        L.marker([props.secondPoint[0], props.secondPoint[1]]).addTo(map);
      }

      // Remove existing routing control
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }

      if (props.firstPoint && props.secondPoint && validatePoint(props.firstPoint) && validatePoint(props.secondPoint)) {
        routingControlRef.current = L.Routing.control({
          waypoints: [L.latLng(props.firstPoint[0], props.firstPoint[1]), L.latLng(props.secondPoint[0], props.secondPoint[1])],
          routeWhileDragging: false
        }).addTo(map);
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
    <div ref={mapRef} className='z-0 h-full w-full rounded-md' />
  )
}

export default memo<Props>(MapRouteEstimation);