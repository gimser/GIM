import { z } from 'zod';

export const priceInputSchema = z.object({
  originalPrice: z.number().positive(),
  timeToExpireMinutes: z.number().nonnegative(),
  demandScore: z.number().min(0).max(1),
});

export type PriceInput = z.infer<typeof priceInputSchema>;

export function suggestDiscountedPrice(input: PriceInput): number {
  const { originalPrice, timeToExpireMinutes, demandScore } = input;
  const timeFactor = Math.max(0.2, Math.min(1, timeToExpireMinutes / 480));
  const demandFactor = 0.5 + 0.5 * demandScore; // 0.5..1.0
  const base = originalPrice * 0.7 * timeFactor * demandFactor;
  const suggested = Math.max(originalPrice * 0.2, Math.min(base, originalPrice * 0.9));
  return Math.round(suggested);
}
