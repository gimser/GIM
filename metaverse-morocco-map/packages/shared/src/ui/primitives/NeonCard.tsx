import React from 'react';
import { motion } from 'framer-motion';

export const NeonCard: React.FC<{ className?: string; onClick?: () => void } & React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, onClick, ...rest }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-xl border border-white/15 bg-white/5 backdrop-blur-md p-4 ${className}`}
      {...rest}
    >
      <span className="pointer-events-none absolute -inset-px rounded-xl bg-[conic-gradient(from_180deg_at_50%_50%,#00E5FF_0deg,#7C3AED_120deg,#F59E0B_240deg,#00E5FF_360deg)] opacity-20 blur-xl" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
