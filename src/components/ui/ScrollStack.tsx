"use client";
import React, { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div className={`w-full h-full relative ${itemClassName}`.trim()}>{children}</div>
);
ScrollStackItem.displayName = 'ScrollStackItem';

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  stackPosition?: string; // e.g. "220px"
  baseScale?: number;
  itemScale?: number;
  // Kept for backwards compatibility with page.tsx
  useWindowScroll?: boolean; 
  scaleEndPosition?: string;
}

interface ScrollStackNodeProps {
  child: ReactNode;
  index: number;
  total: number;
  baseScale: number;
  itemScale: number;
  itemDistance: number;
  parsedStackPosition: number;
  scrollYProgress: import("framer-motion").MotionValue<number>;
}

const ScrollStackNode: React.FC<ScrollStackNodeProps> = ({
  child,
  index,
  total,
  baseScale,
  itemScale,
  itemDistance,
  parsedStackPosition,
  scrollYProgress
}) => {
  const startShrink = index / total;
  const endShrink = 1;
  // mathematically ensure the back card is baseScale and front card is 1.0
  const calculatedItemScale = total > 1 ? (1 - baseScale) / (total - 1) : itemScale;
  const targetScale = baseScale + index * calculatedItemScale;

  const scale = useTransform(
    scrollYProgress,
    [startShrink, endShrink],
    [1, targetScale]
  );

  const topPosition = parsedStackPosition + (index * itemDistance);

  return (
    <motion.div
      className="sticky w-full origin-top"
      style={{
        top: `${topPosition}px`,
        marginTop: index === 0 ? '0' : '30vh',
        scale,
        zIndex: index + 10,
      }}
    >
      {child}
    </motion.div>
  );
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 30,
  stackPosition = "220px",
  baseScale = 0.85,
  itemScale = 0.03,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = React.Children.toArray(children);
  const total = items.length;

  const { scrollYProgress } = useScroll({
    container: containerRef
  });

  const parsedStackPosition = parseInt(stackPosition) || 40;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[500px] sm:h-[600px] overflow-y-auto scrollbar-hide rounded-[3rem] bg-gray-50/50 border border-white/60 shadow-inner ${className}`.trim()}
      style={{
        overscrollBehaviorY: 'contain'
      }}
    >
      <div 
        className="w-full relative px-2 sm:px-6"
        style={{
          paddingTop: '20px',
          paddingBottom: `${total * 40}vh` 
        }}
      >
        {items.map((child, index) => (
          <ScrollStackNode
            key={index}
            child={child}
            index={index}
            total={total}
            baseScale={baseScale}
            itemScale={itemScale}
            itemDistance={itemDistance}
            parsedStackPosition={parsedStackPosition}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollStack;
