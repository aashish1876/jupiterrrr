import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  innerStrength?: number;
  className?: string;
  glow?: boolean;
}

/**
 * Premium Magnetic Button with physical spring-damped tracking,
 * layered parallax shift for inner content, and optional specular sheen.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.35,
  innerStrength = 0.2,
  className = '',
  glow = false,
  onClick,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth non-re-rendering 60+ FPS physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Calibrated spring parameters for tactile, zero-slop responsiveness
  const springConfig = { damping: 14, stiffness: 200, mass: 0.12 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle interior parallax layer
  const innerX = useTransform(smoothX, (val) => val * (innerStrength / strength));
  const innerY = useTransform(smoothY, (val) => val * (innerStrength / strength));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex items-center justify-center p-2 -m-2"
    >
      <motion.button
        style={{
          x: smoothX,
          y: smoothY,
        }}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        className={`relative overflow-hidden cursor-pointer select-none ${className}`}
        {...(props as any)}
      >
        {/* Optional subtle ambient sheen */}
        {glow && (
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />
        )}

        {/* Content with subtle parallax depth */}
        <motion.span
          style={{
            x: innerX,
            y: innerY,
          }}
          className="relative z-10 inline-flex items-center justify-center w-full h-full gap-2 pointer-events-none"
        >
          {children}
        </motion.span>
      </motion.button>
    </div>
  );
};
