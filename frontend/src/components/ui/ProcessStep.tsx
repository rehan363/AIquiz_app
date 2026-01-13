'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessStepProps {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  details?: string[];
  color?: string;
  isLast?: boolean;
  delay?: number;
  className?: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  number,
  icon: Icon,
  title,
  description,
  details = [],
  color = 'from-cosmic-primary to-cosmic-primary-light',
  isLast = false,
  delay = 0,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
      className={cn('relative', className)}
    >
      {/* Connection Line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-20 left-full w-12 h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" />
      )}

      <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 relative z-10">
        {/* Step Number */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.4, type: "spring" }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center mb-6 mx-auto`}
        >
          <span className="text-2xl font-black text-white">{number}</span>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.4, duration: 0.5, type: "spring" }}
          className="flex justify-center mb-4"
        >
          <Icon className="w-12 h-12 text-cosmic-primary" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.6, duration: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-3 text-center">{title}</h3>
          <p className="text-text-secondary text-center mb-6 leading-relaxed">
            {description}
          </p>

          {/* Details */}
          {details.length > 0 && (
            <ul className="space-y-2">
              {details.map((detail, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.8 + index * 0.1, duration: 0.3 }}
                  className="flex items-center text-sm text-text-secondary"
                >
                  <div className="w-2 h-2 bg-cosmic-primary rounded-full mr-3 flex-shrink-0" />
                  {detail}
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProcessStep;