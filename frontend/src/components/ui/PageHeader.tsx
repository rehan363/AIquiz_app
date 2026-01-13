'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  breadcrumbs,
  className = '',
  children
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
      className={cn('text-center mb-16', className)}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center justify-center mb-8"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-text-muted hover:text-cosmic-primary transition-colors flex items-center"
              >
                <Home className="w-4 h-4" />
              </Link>
            </li>
            {breadcrumbs.map((item, index) => (
              <li key={item.href} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-text-muted mx-2" />
                {item.current ? (
                  <span className="text-cosmic-primary font-medium">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-text-muted hover:text-cosmic-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>
      )}

      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-cosmic-accent text-sm font-bold"
        >
          {badge.icon}
          {badge.text}
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight"
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Additional Content */}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PageHeader;