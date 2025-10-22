import React, { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

// Animated dotted grid with soft neon glow
export const BackgroundFX: React.FC<{ className?: string }> = ({ className = '' }) => {
  const dots = useMemo(() => Array.from({ length: 80 }, (_, i) => i), []);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // ensure parent is relative
    const el = containerRef.current?.parentElement;
    if (el && getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }
  }, []);

  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_60%)]" />
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {dots.map((i) => (
          <motion.circle
            key={i}
            cx={(i % 16) * 80 + 20}
            cy={Math.floor(i / 16) * 80 + 20}
            r={2}
            fill="url(#dotGlow)"
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.6, 1] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: (i % 10) * 0.2 }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(245,158,11,0.12),transparent_40%,rgba(0,229,255,0.12))] mix-blend-screen" />
    </div>
  );
};
