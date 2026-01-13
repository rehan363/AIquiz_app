'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, BrainCircuit, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={cn('inline-block', className)}
    >
      <Loader2 className={cn(sizeClasses[size], 'text-cosmic-primary')} />
    </motion.div>
  );
};

interface LoadingDotsProps {
  className?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({ className = '' }) => {
  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -8, 0]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1
          }}
          className="w-2 h-2 bg-cosmic-primary rounded-full"
        />
      ))}
    </div>
  );
};

interface LoadingPulseProps {
  className?: string;
}

export const LoadingPulse: React.FC<LoadingPulseProps> = ({ className = '' }) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={cn('w-12 h-12 bg-cosmic-primary rounded-full', className)}
    />
  );
};

interface QuizLoadingProps {
  message?: string;
  className?: string;
}

export const QuizLoading: React.FC<QuizLoadingProps> = ({ 
  message = 'Generating your personalized quiz...', 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('flex flex-col items-center justify-center p-12', className)}
    >
      {/* Animated Brain Icon */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative mb-6"
      >
        <BrainCircuit className="w-16 h-16 text-cosmic-primary" />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-2 -right-2"
        >
          <Sparkles className="w-6 h-6 text-cosmic-accent" />
        </motion.div>
      </motion.div>

      {/* Loading Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg font-medium text-center mb-4"
      >
        {message}
      </motion.p>

      {/* Loading Dots */}
      <LoadingDots />

      {/* Progress Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 3, repeat: Infinity }}
        className="w-48 h-1 bg-cosmic-primary/20 rounded-full mt-6 overflow-hidden"
      >
        <motion.div
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-full w-1/3 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary rounded-full"
        />
      </motion.div>
    </motion.div>
  );
};

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'rectangular' 
}) => {
  const baseClasses = 'animate-pulse bg-cosmic-surface-light';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded'
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  );
};

interface PageLoadingProps {
  title?: string;
  subtitle?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({
  title = 'Loading...',
  subtitle = 'Please wait while we prepare your content'
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <LoadingPulse className="mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-text-secondary">{subtitle}</p>
      </motion.div>
    </div>
  );
};