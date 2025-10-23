export const MOROCCO_BOUNDS = {
  north: 35.92,
  south: 27.66,
  west: -13.17,
  east: -1.01,
};

export function clampToMorocco(lat: number, lng: number): { lat: number; lng: number } {
  const clampedLat = Math.max(MOROCCO_BOUNDS.south, Math.min(MOROCCO_BOUNDS.north, lat));
  const clampedLng = Math.max(MOROCCO_BOUNDS.west, Math.min(MOROCCO_BOUNDS.east, lng));
  return { lat: clampedLat, lng: clampedLng };
}
