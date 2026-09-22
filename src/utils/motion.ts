import { type Transition, type Variants } from 'motion/react';

/**
 * JUPITER TECHNOLOGIES // UNIFIED SYSTEM MOTION UTILITY
 * 
 * Provides calibrated transition curves, duration tokens, and framer-motion variants
 * ensuring deliberate, authoritative, and frictionless interactions across all UI components.
 */

// 1. Precise Calibrated System Easings
// The primary system-transition cubic-bezier: fast responsive initial impulse with a smooth, asymptotic settling curve.
export const SYSTEM_EASING = [0.16, 1, 0.3, 1] as const;
export const SYSTEM_EASING_DECEL = [0.05, 0.9, 0.1, 1.0] as const;
export const SYSTEM_EASING_ACCEL = [0.4, 0, 1, 1] as const;
export const SYSTEM_EASING_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const SYSTEM_EASING_SHARP = [0.25, 0.1, 0.25, 1] as const;

// CSS cubic-bezier string representations
export const CSS_EASE_SYSTEM = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const CSS_EASE_DECEL = 'cubic-bezier(0.05, 0.9, 0.1, 1.0)';
export const CSS_EASE_ACCEL = 'cubic-bezier(0.4, 0, 1, 1)';
export const CSS_EASE_IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)';

// 2. System Duration Tokens (seconds for motion/react)
export const DURATION = {
  instant: 0.1,      // 100ms - imperceptible state adjustments
  micro: 0.16,       // 160ms - micro-hover, toggle icons, focus rings
  fast: 0.24,        // 240ms - tab switches, dropdown items, pill selection
  normal: 0.34,      // 340ms - standard card reveals, drawers, modal presentations
  deliberate: 0.48,  // 480ms - page sections, workflow step progressions, architecture changes
  cinematic: 0.72,   // 720ms - hero sequences, entry scenes
} as const;

// 3. Preconfigured Framer Motion Transitions
export const transitionSystem: Transition = {
  duration: DURATION.normal,
  ease: SYSTEM_EASING,
};

export const transitionFast: Transition = {
  duration: DURATION.fast,
  ease: SYSTEM_EASING,
};

export const transitionDeliberate: Transition = {
  duration: DURATION.deliberate,
  ease: SYSTEM_EASING,
};

export const transitionModal: Transition = {
  duration: 0.32,
  ease: SYSTEM_EASING,
};

export const transitionSpring: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
  mass: 0.8,
};

export const transitionSpringGentle: Transition = {
  type: 'spring',
  stiffness: 280,
  damping: 26,
};

// 4. Stagger Generation Helper
export const createStaggerTransition = (
  staggerChildren = 0.06,
  delayChildren = 0.04
): Transition => ({
  staggerChildren,
  delayChildren,
});

// 5. System Variants for UI Elements
export const subtleUpwardFadeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const createSubtleUpwardVariants = (yOffset: number = 20, duration: number = 0.42, delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const fastScrollUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const calmScrollVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: SYSTEM_EASING,
    },
  },
};

export const calmFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: SYSTEM_EASING,
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionSystem,
  },
  exit: {
    opacity: 0,
    transition: transitionFast,
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSystem,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: transitionFast,
  },
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSystem,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: transitionFast,
  },
};

export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.14, ease: 'easeIn' },
  },
};

export const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 6,
    transition: {
      duration: 0.14,
      ease: 'easeIn',
    },
  },
};

export const tabContentVariants: Variants = {
  hidden: { opacity: 0, x: 14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.28,
      ease: SYSTEM_EASING,
    },
  },
  exit: {
    opacity: 0,
    x: -12,
    transition: {
      duration: 0.18,
      ease: SYSTEM_EASING_ACCEL,
    },
  },
};

export const verticalStepVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: SYSTEM_EASING,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.2,
      ease: SYSTEM_EASING_ACCEL,
    },
  },
};

export const drawerVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.12,
      ease: 'easeIn',
    },
  },
};

export const containerStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const cardHoverTransition = {
  duration: 0.28,
  ease: SYSTEM_EASING,
};

// High-frequency hover transition calibrated for responsive, tactile micro-interactions (1.02x scale)
export const highFreqHoverTransition: Transition = {
  duration: DURATION.fast,
  ease: SYSTEM_EASING,
};

// Subtle 1.02x scaling target for high-frequency tactile hover states
export const subtleScaleHover = {
  scale: 1.02,
} as const;

export const cardHoverScale = {
  scale: 1.02,
} as const;

// Orchestrated staggered container for Capability Card content
export const cardContentContainerVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: SYSTEM_EASING,
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: DURATION.fast,
      ease: SYSTEM_EASING,
    },
  },
};

// Section children inside the card that smoothly fade and slide in with the system curve
export const cardSectionItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: SYSTEM_EASING,
    },
  },
};

// Staggered reveal variants for card items
export const pillarsStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const chipsStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.08,
    },
  },
};

export const staggeredCardItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: SYSTEM_EASING,
    },
  },
};
