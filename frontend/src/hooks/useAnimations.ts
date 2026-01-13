'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Custom hook for scroll-triggered animations
export const useScrollAnimation = (options?: {
  threshold?: number;
  once?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
  });

  return { ref, isInView };
};

// Animation variants
export const animationVariants = {
  // Fade animations
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 }
  },
  
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
  },
  
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
  },

  // Scale animations
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  
  scaleInSpring: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  },

  // Slide animations
  slideInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  },
  
  slideInDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 }
  },

  // Rotation animations
  rotateIn: {
    hidden: { opacity: 0, rotate: -180 },
    visible: { opacity: 1, rotate: 0 }
  },

  // Stagger container
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // Stagger items
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },

  // Hover animations
  hoverScale: {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  },
  
  hoverLift: {
    hover: { 
      y: -5,
      transition: { duration: 0.2 }
    }
  },

  // Button animations
  buttonPress: {
    tap: { scale: 0.95 }
  },

  // Card animations
  cardHover: {
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3 }
    }
  }
};

// Transition presets
export const transitionPresets = {
  default: {
    duration: 0.6,
    ease: [0.25, 0.25, 0, 1]
  },
  
  fast: {
    duration: 0.3,
    ease: [0.25, 0.25, 0, 1]
  },
  
  slow: {
    duration: 1.0,
    ease: [0.25, 0.25, 0, 1]
  },
  
  spring: {
    type: "spring",
    stiffness: 100,
    damping: 15
  },
  
  bouncy: {
    type: "spring",
    stiffness: 400,
    damping: 10
  },
  
  smooth: {
    duration: 0.8,
    ease: [0.4, 0, 0.2, 1]
  }
};

// Custom hook for staggered animations
export const useStaggerAnimation = (itemCount: number, delay: number = 0.1) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return { containerVariants, itemVariants };
};

// Custom hook for page transitions
export const usePageTransition = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    duration: 0.5,
    ease: [0.25, 0.25, 0, 1]
  };

  return { pageVariants, pageTransition };
};

// Custom hook for loading animations
export const useLoadingAnimation = () => {
  const spinVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const dotsVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return { spinVariants, pulseVariants, dotsVariants, dotVariants };
};