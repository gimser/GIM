"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

type Offer = {
  id: string;
  title: string;
  lat: number;
  lng: number;
  discounted_price: number;
};

const moroccoBounds = L.latLngBounds([
  [21.4207, -17.0644], // south-west
  [36.0505, -0.9986] // north-east
]);

export default function LeafletMap({
  center,
  zoom
}: {
  center: { lat: number; lng: number };
  zoom?: number;
}) {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    fetch('/api/offers')
      .then((r) => r.json())
      .then((data) => setOffers(data.offers ?? []))
      .catch(() => setOffers([]));
  }, []);

  return (
    <MapContainer
      className="h-full w-full rounded-md border"
      center={[center.lat, center.lng]}
      zoom={zoom ?? 12}
      minZoom={5}
      maxBounds={moroccoBounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {offers.map((ofr) => (
        <Marker key={ofr.id} position={[ofr.lat, ofr.lng]}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">{ofr.title}</div>
              <div className="text-emerald-700">{ofr.discounted_price} MAD</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
