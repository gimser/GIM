export function suggestDiscountedPrice(params: {
  originalPrice: number;
  hoursLeft: number; // time until expiry
  demandScore?: number; // 0..1
}): number {
  const { originalPrice, hoursLeft, demandScore = 0.5 } = params;
  const timeFactor = Math.max(0.2, Math.min(1, hoursLeft / 24));
  const demandFactor = 0.5 + demandScore * 0.5; // 0.5..1
  const baseDiscount = 0.5; // target ~50%
  const dynamic = baseDiscount * (1 - timeFactor * 0.7) * (1 / demandFactor);
  const price = Math.max(5, originalPrice * (1 - Math.min(0.8, dynamic)));
  return Math.round(price * 2) / 2; // round to .5 DH
}
