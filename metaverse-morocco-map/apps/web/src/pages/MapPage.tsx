import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { MOROCCO_CITIES } from '@mmm/shared';
import { useNavigate } from 'react-router-dom';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

const MapPage: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-6.8326, 34.0209],
      zoom: 5.2,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    map.current.on('load', () => {
      // 3D buildings layer
      const layers = map.current!.getStyle().layers;
      const labelLayerId = layers?.find(
        (l) => l.type === 'symbol' && (l.layout as any)['text-field']
      )?.id;

      map.current!.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );

      // Add city markers
      for (const city of MOROCCO_CITIES) {
        const el = document.createElement('div');
        el.className = 'cursor-pointer bg-white/90 rounded px-2 py-1 text-sm shadow';
        el.textContent = city.nameEn;
        el.addEventListener('click', () => navigate(`/city/${city.id}`));

        new mapboxgl.Marker(el)
          .setLngLat(city.coordinates)
          .addTo(map.current!);
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [navigate]);

  return <div ref={mapContainer} className="map-container" />;
};

export default MapPage;
