import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface FadeInViewProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

/**
 * Lightweight, hardware-accelerated scroll reveal component.
 * Triggers a subtle upward fade-in animation as the section or element
 * enters the viewport.
 */
export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 0.42,
  yOffset = 20,
  threshold = 0.12,
  className = '',
  once = true,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
