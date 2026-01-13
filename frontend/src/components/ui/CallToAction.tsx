'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CallToActionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
    icon?: LucideIcon;
  };
  secondaryButton?: {
    text: string;
    href: string;
    icon?: LucideIcon;
  };
  icon?: LucideIcon;
  variant?: 'default' | 'centered' | 'split';
  className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  icon: Icon,
  variant = 'centered',
  className = ''
}) => {
  const PrimaryIcon = primaryButton.icon || ArrowRight;
  const SecondaryIcon = secondaryButton?.icon || ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
      className={cn('text-center', className)}
    >
      <div className="glass-card p-12 rounded-2xl max-w-3xl mx-auto">
        {/* Icon */}
        {Icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="mx-auto mb-6"
          >
            <Icon className="w-16 h-16 text-cosmic-accent animate-pulse" />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {title}
          </h2>
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={cn(
            'flex gap-4 justify-center',
            variant === 'split' ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'
          )}
        >
          {/* Primary Button */}
          <Link
            href={primaryButton.href}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cosmic-primary/25 transition-all duration-300 hover:scale-105"
          >
            <span>{primaryButton.text}</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <PrimaryIcon className="w-5 h-5" />
            </motion.div>
          </Link>

          {/* Secondary Button */}
          {secondaryButton && (
            <Link
              href={secondaryButton.href}
              className="group inline-flex items-center gap-2 px-8 py-4 glass-panel text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <span>{secondaryButton.text}</span>
              <SecondaryIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-cosmic-primary/5 to-cosmic-secondary/5 rounded-2xl pointer-events-none" />
        <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-primary/20 to-cosmic-secondary/20 rounded-2xl blur opacity-20 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default CallToAction;