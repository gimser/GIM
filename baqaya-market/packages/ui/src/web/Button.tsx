import * as React from 'react';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors';
  const variants = {
    primary: 'bg-brand text-white hover:bg-emerald-600',
    outline: 'border border-gray-300 hover:bg-gray-50',
  } as const;
  return <button className={cn(base, variants[variant], className)} {...props} />;
}
