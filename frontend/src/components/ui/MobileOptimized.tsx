'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mobile-optimized button component
interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export const MobileButton: React.FC<MobileButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 active:scale-95 select-none';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cosmic-primary to-cosmic-secondary text-white hover:shadow-lg hover:shadow-cosmic-primary/25',
    secondary: 'glass-panel text-white hover:bg-white/10',
    ghost: 'text-cosmic-primary hover:bg-cosmic-primary/10'
  };

  const sizeClasses = {
    sm: 'px-4 py-3 text-sm min-h-[44px] sm:px-4 sm:py-2 sm:min-h-0',
    md: 'px-6 py-4 text-base min-h-[48px] sm:px-6 sm:py-3 sm:min-h-0',
    lg: 'px-8 py-5 text-lg min-h-[52px] sm:px-8 sm:py-4 sm:min-h-0'
  };

  const widthClasses = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClasses,
        disabledClasses,
        className
      )}
    >
      {children}
    </motion.button>
  );
};

// Mobile-optimized input component
interface MobileInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const MobileInput: React.FC<MobileInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error,
  className = ''
}) => {
  const baseClasses = 'w-full bg-cosmic-surface/50 border border-white/10 rounded-xl focus:outline-none focus:border-cosmic-primary/50 transition-all';
  const sizeClasses = 'px-4 py-4 text-base min-h-[48px] sm:px-4 sm:py-3 sm:min-h-0';
  const errorClasses = error ? 'border-red-500/50 focus:border-red-500' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        className={cn(baseClasses, sizeClasses, errorClasses, disabledClasses, className)}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// Mobile-optimized card component
interface MobileCardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const MobileCard: React.FC<MobileCardProps> = ({
  children,
  padding = 'md',
  className = '',
  onClick
}) => {
  const baseClasses = 'glass-card rounded-xl transition-all duration-200';
  const paddingClasses = {
    sm: 'p-4 sm:p-3',
    md: 'p-6 sm:p-4',
    lg: 'p-8 sm:p-6'
  };
  const interactiveClasses = onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : '';

  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={cn(baseClasses, paddingClasses[padding], interactiveClasses, className)}
    >
      {children}
    </motion.div>
  );
};

// Mobile-optimized modal/drawer
interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showFromBottom?: boolean;
}

export const MobileModal: React.FC<MobileModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showFromBottom = true
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <motion.div
        initial={{ 
          y: showFromBottom ? '100%' : 0, 
          scale: showFromBottom ? 1 : 0.9 
        }}
        animate={{ 
          y: 0, 
          scale: 1 
        }}
        exit={{ 
          y: showFromBottom ? '100%' : 0, 
          scale: showFromBottom ? 1 : 0.9 
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={cn(
          'relative w-full max-w-md glass-card rounded-t-2xl max-h-[90vh] sm:max-h-[80vh] sm:rounded-2xl'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar for mobile */}
        <div className="flex justify-center pt-3 pb-2 sm:hidden">
          <div className="w-10 h-1 bg-white/30 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Mobile-optimized navigation tabs
interface MobileTabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const MobileTabs: React.FC<MobileTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}) => {
  return (
    <div className={cn('flex bg-cosmic-surface/30 rounded-xl p-1', className)}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 rounded-lg transition-all duration-200',
            'px-3 py-3 text-sm min-h-[44px] sm:px-4 sm:py-2 sm:min-h-0',
            activeTab === tab.id
              ? 'bg-cosmic-primary text-white shadow-lg'
              : 'text-text-secondary hover:text-white hover:bg-white/5'
          )}
        >
          {tab.icon}
          <span className={cn(tab.icon ? 'hidden sm:inline' : '')}>{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

// Mobile-optimized floating action button
interface MobileFABProps {
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  className?: string;
}

export const MobileFAB: React.FC<MobileFABProps> = ({
  onClick,
  icon,
  label,
  position = 'bottom-right',
  className = ''
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'fixed z-40 flex items-center gap-2 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary text-white font-semibold rounded-full shadow-lg hover:shadow-cosmic-primary/25 transition-all duration-300',
        label ? 'px-6 py-4' : 'w-14 h-14 justify-center',
        positionClasses[position],
        className
      )}
    >
      {icon}
      {label && <span className="whitespace-nowrap">{label}</span>}
    </motion.button>
  );
};