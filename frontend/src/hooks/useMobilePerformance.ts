'use client';

import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  // Core Web Vitals
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  
  // Mobile-specific metrics
  memoryUsage?: number;
  connectionType?: string;
  batteryLevel?: number;
  isLowEndDevice?: boolean;
  
  // Custom metrics
  pageLoadTime?: number;
  jsExecutionTime?: number;
  renderTime?: number;
}

export const useMobilePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent;
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
    }
  }, []);

  // Detect low-end devices
  const detectLowEndDevice = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 1;
    
    // Check memory (if available)
    const memory = (navigator as any).deviceMemory || 4;
    
    // Check connection type
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && 
      (connection.effectiveType === 'slow-2g' || 
       connection.effectiveType === '2g' ||
       connection.effectiveType === '3g');
    
    return cores <= 2 || memory <= 2 || isSlowConnection;
  }, []);

  // Measure Core Web Vitals
  const measureWebVitals = useCallback(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.processingStart && entry.startTime) {
          const fid = entry.processingStart - entry.startTime;
          setMetrics(prev => ({ ...prev, fid }));
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        }
      });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  // Measure memory usage
  const measureMemoryUsage = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const memory = (performance as any).memory;
    if (memory) {
      const memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      setMetrics(prev => ({ ...prev, memoryUsage }));
    }
  }, []);

  // Get connection information
  const getConnectionInfo = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const connection = (navigator as any).connection;
    if (connection) {
      setMetrics(prev => ({ 
        ...prev, 
        connectionType: connection.effectiveType 
      }));
    }
  }, []);

  // Get battery information
  const getBatteryInfo = useCallback(async () => {
    if (typeof window === 'undefined' || !('getBattery' in navigator)) return;
    
    try {
      const battery = await (navigator as any).getBattery();
      setMetrics(prev => ({ 
        ...prev, 
        batteryLevel: battery.level * 100 
      }));
    } catch (error) {
      console.log('Battery API not available');
    }
  }, []);

  // Measure page load time
  const measurePageLoadTime = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        setMetrics(prev => ({ ...prev, pageLoadTime }));
      }
    });
  }, []);

  // Performance optimization recommendations
  const getOptimizationRecommendations = useCallback(() => {
    const recommendations: string[] = [];
    
    if (metrics.fcp && metrics.fcp > 2500) {
      recommendations.push('Optimize First Contentful Paint - consider reducing bundle size');
    }
    
    if (metrics.lcp && metrics.lcp > 4000) {
      recommendations.push('Optimize Largest Contentful Paint - optimize images and critical resources');
    }
    
    if (metrics.fid && metrics.fid > 300) {
      recommendations.push('Reduce First Input Delay - minimize JavaScript execution time');
    }
    
    if (metrics.cls && metrics.cls > 0.25) {
      recommendations.push('Improve Cumulative Layout Shift - reserve space for dynamic content');
    }
    
    if (metrics.memoryUsage && metrics.memoryUsage > 80) {
      recommendations.push('High memory usage detected - consider reducing component complexity');
    }
    
    if (isLowPerformance) {
      recommendations.push('Low-end device detected - enable performance mode');
    }
    
    return recommendations;
  }, [metrics, isLowPerformance]);

  // Enable performance mode for low-end devices
  const enablePerformanceMode = useCallback(() => {
    if (typeof document === 'undefined') return;
    
    // Reduce animations
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
    
    // Disable non-essential effects
    const style = document.createElement('style');
    style.textContent = `
      .performance-mode * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
      }
      .performance-mode .glass-card {
        backdrop-filter: none !important;
        background: rgba(255, 255, 255, 0.1) !important;
      }
    `;
    document.head.appendChild(style);
    document.body.classList.add('performance-mode');
  }, []);

  // Initialize performance monitoring
  useEffect(() => {
    const isLowEnd = detectLowEndDevice();
    setIsLowPerformance(isLowEnd);
    setMetrics(prev => ({ ...prev, isLowEndDevice: isLowEnd }));
    
    if (isLowEnd) {
      enablePerformanceMode();
    }
    
    const cleanup = measureWebVitals();
    measureMemoryUsage();
    getConnectionInfo();
    getBatteryInfo();
    measurePageLoadTime();
    
    // Set up periodic memory monitoring
    const memoryInterval = setInterval(measureMemoryUsage, 10000); // Every 10 seconds
    
    return () => {
      cleanup?.();
      clearInterval(memoryInterval);
    };
  }, [
    detectLowEndDevice,
    enablePerformanceMode,
    measureWebVitals,
    measureMemoryUsage,
    getConnectionInfo,
    getBatteryInfo,
    measurePageLoadTime
  ]);

  return {
    metrics,
    isLowPerformance,
    recommendations: getOptimizationRecommendations(),
    enablePerformanceMode
  };
};

// Hook for monitoring component render performance
export const useRenderPerformance = (componentName: string) => {
  const [renderTime, setRenderTime] = useState<number>(0);
  
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      setRenderTime(duration);
      
      if (duration > 16) { // More than one frame (60fps)
        console.warn(`Slow render detected in ${componentName}: ${duration.toFixed(2)}ms`);
      }
    };
  });
  
  return { renderTime };
};

// Hook for lazy loading optimization
export const useLazyLoading = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { isLowPerformance } = useMobilePerformance();
  
  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: isLowPerformance ? '50px' : '100px', // Smaller margin for low-end devices
        threshold: 0.1
      }
    );
    
    observer.observe(node);
    
    return () => observer.disconnect();
  }, [isLowPerformance]);
  
  return { ref, isIntersecting };
};