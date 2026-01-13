'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Hook for swipe gestures
export const useSwipe = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  threshold: number = 50
) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > threshold;
    const isRightSwipe = distanceX < -threshold;
    const isUpSwipe = distanceY > threshold;
    const isDownSwipe = distanceY < -threshold;

    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Horizontal swipe
      if (isLeftSwipe) onSwipeLeft?.();
      if (isRightSwipe) onSwipeRight?.();
    } else {
      // Vertical swipe
      if (isUpSwipe) onSwipeUp?.();
      if (isDownSwipe) onSwipeDown?.();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
};

// Hook for long press
export const useLongPress = (
  onLongPress: () => void,
  delay: number = 500
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const target = useRef<EventTarget | undefined>(undefined);

  const start = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    if (event.target !== target.current) {
      target.current = event.target;
    }
    timeout.current = setTimeout(() => {
      onLongPress();
      setLongPressTriggered(true);
    }, delay);
  }, [onLongPress, delay]);

  const clear = useCallback((event: React.TouchEvent | React.MouseEvent, shouldTriggerClick = true) => {
    timeout.current && clearTimeout(timeout.current);
    shouldTriggerClick && !longPressTriggered && target.current === event.target;
    setLongPressTriggered(false);
  }, [longPressTriggered]);

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent) => clear(e)
  };
};

// Hook for pinch zoom
export const usePinchZoom = (
  onZoom?: (scale: number) => void,
  minScale: number = 0.5,
  maxScale: number = 3
) => {
  const [scale, setScale] = useState(1);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);

  const getDistance = (touches: React.TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setInitialDistance(getDistance(e.touches));
      setInitialScale(scale);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance > 0) {
      const currentDistance = getDistance(e.touches);
      const newScale = Math.min(
        Math.max(initialScale * (currentDistance / initialDistance), minScale),
        maxScale
      );
      setScale(newScale);
      onZoom?.(newScale);
    }
  };

  const onTouchEnd = () => {
    setInitialDistance(0);
  };

  return {
    scale,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    resetScale: () => setScale(1)
  };
};

// Hook for pull to refresh
export const usePullToRefresh = (
  onRefresh: () => Promise<void>,
  threshold: number = 100
) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);

  const onTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isPulling) return;

    currentY.current = e.touches[0].clientY;
    const distance = Math.max(0, currentY.current - startY.current);
    
    if (distance > 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance, threshold * 1.5));
    }
  };

  const onTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setIsPulling(false);
    setPullDistance(0);
  };

  const shouldRefresh = pullDistance >= threshold;
  const pullProgress = Math.min(pullDistance / threshold, 1);

  return {
    isPulling,
    pullDistance,
    isRefreshing,
    shouldRefresh,
    pullProgress,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
};

// Hook for haptic feedback
export const useHaptic = () => {
  const vibrate = useCallback((pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  const lightImpact = useCallback(() => {
    vibrate(10);
  }, [vibrate]);

  const mediumImpact = useCallback(() => {
    vibrate(20);
  }, [vibrate]);

  const heavyImpact = useCallback(() => {
    vibrate(30);
  }, [vibrate]);

  const success = useCallback(() => {
    vibrate([10, 50, 10]);
  }, [vibrate]);

  const error = useCallback(() => {
    vibrate([50, 50, 50]);
  }, [vibrate]);

  const warning = useCallback(() => {
    vibrate([20, 100, 20]);
  }, [vibrate]);

  return {
    vibrate,
    lightImpact,
    mediumImpact,
    heavyImpact,
    success,
    error,
    warning
  };
};