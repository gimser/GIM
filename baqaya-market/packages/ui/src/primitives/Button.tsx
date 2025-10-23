import * as React from 'react';
import clsx from 'clsx';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors',
        variant === 'primary' && 'bg-brand text-white hover:opacity-90',
        variant === 'secondary' && 'bg-gray-100 hover:bg-gray-200',
        variant === 'ghost' && 'hover:bg-gray-100',
        className
      )}
      {...props}
    />
  );
}
