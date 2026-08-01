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
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const parsedStackPosition = parseInt(stackPosition) || 220;

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${className}`.trim()}
      style={{
        // Give enough scroll space for all items to stack. 
        // 50vh per item gives a nice pacing.
        height: `${total * 60}vh`,
        paddingBottom: '30vh' // Space after all items have stacked
      }}
    >
      {items.map((child, index) => {
        // Calculate when this specific card should start shrinking
        // If there are 5 cards, card 0 starts shrinking at 0, card 1 at 0.25, etc.
        const startShrink = index / total;
        const endShrink = 1;

        // Target scale for this specific card when fully stacked
        const targetScale = baseScale + index * itemScale;

        // Framer motion transforms
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scale = useTransform(
          scrollYProgress,
          [startShrink, endShrink],
          [1, targetScale]
        );

        // Calculate sticky top position for native CSS pinning
        const topPosition = parsedStackPosition + (index * itemDistance);

        return (
          <motion.div
            key={index}
            className="sticky w-full origin-top"
            style={{
              top: `${topPosition}px`,
              // Initial spacing before they stick (only apply to items after the first one)
              marginTop: index === 0 ? '0' : '60vh',
              scale,
              // z-index ensures later cards stack on top of earlier ones
              zIndex: index + 10,
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ScrollStack;
