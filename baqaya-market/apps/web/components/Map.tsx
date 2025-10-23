"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const moroccoCenter: [number, number] = [33.589886, -7.603869]; // Casablanca approx

export default function Map() {
  return (
    <div className="h-[70vh] w-full overflow-hidden rounded">
      <MapContainer center={moroccoCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={moroccoCenter}>
          <Popup>Casablanca</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
