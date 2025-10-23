"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  center: { lat: number; lng: number };
}

export default function Map({ center }: MapProps) {
  return (
    <div className="h-[70vh] overflow-hidden rounded-lg border">
      <MapContainer center={[center.lat, center.lng]} zoom={12} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[center.lat, center.lng]}>
          <Popup>Casablanca</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
