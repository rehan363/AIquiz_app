'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TechBadgeProps {
  icon: LucideIcon;
  name: string;
  description: string;
  variant?: 'default' | 'featured' | 'minimal';
  delay?: number;
  className?: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({
  icon: Icon,
  name,
  description,
  variant = 'default',
  delay = 0,
  className = ''
}) => {
  const variants = {
    default: 'glass-card p-6 rounded-xl text-center hover:scale-105 transition-all duration-300',
    featured: 'glass-card p-8 rounded-2xl text-center hover:scale-105 transition-all duration-300 border border-cosmic-primary/20',
    minimal: 'glass-panel p-4 rounded-lg text-center hover:bg-white/10 transition-all duration-300'
  };

  const iconSizes = {
    default: 'w-10 h-10',
    featured: 'w-12 h-12',
    minimal: 'w-8 h-8'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay, 
        duration: 0.5, 
        ease: [0.25, 0.25, 0, 1],
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className={cn(variants[variant], className)}
    >
      {/* Icon with Glow Effect */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: delay + 0.2, duration: 0.6, type: "spring" }}
        className="relative mx-auto mb-4"
      >
        <div className="absolute inset-0 bg-cosmic-primary/20 rounded-full blur-lg" />
        <Icon className={cn(iconSizes[variant], 'text-cosmic-primary relative z-10')} />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.4 }}
      >
        <h3 className="font-bold mb-2 text-white">{name}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
      </motion.div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cosmic-primary/10 to-cosmic-secondary/10 rounded-xl opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default TechBadge;