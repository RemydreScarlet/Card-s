'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Media } from '@/types/media';

interface ReelContainerProps {
  children: React.ReactNode;
  media: Media[];
  onActiveChange: (index: number) => void;
  onLoadMore: () => void;
}

export function ReelContainer({ children, media, onActiveChange, onLoadMore }: ReelContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe && activeIndex < media.length - 1) {
      // Swipe up - go to next
      scrollToIndex(activeIndex + 1);
    } else if (isDownSwipe && activeIndex > 0) {
      // Swipe down - go to previous
      scrollToIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const itemHeight = container.clientHeight;
      const newIndex = Math.round(scrollPosition / itemHeight);
      
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < media.length) {
        setActiveIndex(newIndex);
        onActiveChange(newIndex);
      }

      // Load more content when approaching the end
      if (newIndex >= media.length - 3) {
        onLoadMore();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, media.length, onActiveChange, onLoadMore]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    
    const itemHeight = container.clientHeight;
    container.scrollTo({
      top: index * itemHeight,
      behavior: 'smooth'
    });
  };

  // Handle wheel events for desktop
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    
    if (delta > 0 && activeIndex < media.length - 1) {
      // Scroll down - go to next
      scrollToIndex(activeIndex + 1);
    } else if (delta < 0 && activeIndex > 0) {
      // Scroll up - go to previous
      scrollToIndex(activeIndex - 1);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll scroll-smooth"
        style={{
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none' // IE/Edge
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={handleWheel}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
        
        <div className="relative h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
