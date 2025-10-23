export type LatLng = { lat: number; lng: number };

export const MOROCCO_BOUNDS: [LatLng, LatLng] = [
  { lat: 21.4207, lng: -17.0644 },
  { lat: 36.0505, lng: -0.9986 }
];

export function isWithinMorocco({ lat, lng }: LatLng): boolean {
  return (
    lat >= MOROCCO_BOUNDS[0].lat &&
    lat <= MOROCCO_BOUNDS[1].lat &&
    lng >= MOROCCO_BOUNDS[0].lng &&
    lng <= MOROCCO_BOUNDS[1].lng
  );
}
