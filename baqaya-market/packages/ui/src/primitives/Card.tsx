import * as React from 'react';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, ...props }: CardProps) {
  return (
    <div className="rounded border p-4 shadow-sm" {...props}>
      {children}
    </div>
  );
}
