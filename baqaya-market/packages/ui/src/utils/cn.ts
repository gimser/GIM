import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  // @ts-expect-error twMerge supports mixed inputs at runtime
  return twMerge(clsx(inputs));
}
