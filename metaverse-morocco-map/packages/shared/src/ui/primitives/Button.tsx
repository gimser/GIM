import React from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', glow = true, ...rest }) => {
  const base = 'relative inline-flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-colors';
  const styles = {
    primary: 'bg-mmm-gold text-black hover:bg-mmm-gold/90',
    secondary: 'bg-mmm-emerald text-white hover:bg-mmm-emerald/90',
    ghost: 'bg-transparent text-current hover:bg-white/10',
  }[variant];

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      {glow && (
        <span className="pointer-events-none absolute inset-0 rounded-md shadow-[0_0_20px_2px_#00E5FF] opacity-40 mix-blend-screen" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
