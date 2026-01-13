'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'solid' | 'border';
  hover?: boolean;
  gradient?: 'primary' | 'secondary' | 'accent' | 'surface';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const GradientCard: React.FC<GradientCardProps> = ({
  children,
  className = '',
  variant = 'glass',
  hover = true,
  gradient = 'primary',
  padding = 'lg',
  rounded = 'xl'
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-cosmic-surface border border-white/10',
    glass: 'glass-card',
    solid: 'bg-cosmic-surface',
    border: 'border-gradient bg-cosmic-bg'
  };

  const gradientClasses = {
    primary: 'bg-gradient-to-br from-cosmic-primary/10 to-cosmic-secondary/10',
    secondary: 'bg-gradient-to-br from-cosmic-secondary/10 to-cosmic-accent/10',
    accent: 'bg-gradient-to-br from-cosmic-accent/10 to-cosmic-primary/10',
    surface: 'bg-gradient-to-br from-cosmic-surface to-cosmic-surface-light'
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  };

  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-cosmic cursor-pointer' : '';

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      className={cn(
        baseClasses,
        variantClasses[variant],
        gradientClasses[gradient],
        paddingClasses[padding],
        roundedClasses[rounded],
        hoverClasses,
        className
      )}
    >
      {/* Gradient Overlay */}
      {variant === 'glass' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GradientCard;