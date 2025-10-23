export function suggestPrice(originalPrice: number, timeLeftHours: number): number {
  const discountFactor = Math.min(0.7, Math.max(0.2, (12 - timeLeftHours) / 12));
  return Math.max(1, Math.round(originalPrice * (1 - discountFactor)));
}
