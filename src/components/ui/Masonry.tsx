"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './Masonry.css';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  categoryName?: string;
  childName?: string;
  submitterName?: string;
  pageTitle?: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  selectable?: boolean;
  selectedIds?: string[];
  onItemClick?: (id: string) => void;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  selectable = false,
  selectedIds = [],
  onItemClick
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1200px)', '(min-width:900px)', '(min-width:600px)', '(min-width:400px)'],
    [6, 5, 4, 3, 2],
    2
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    // Images preload is optional since heights are provided.
    // We don't block rendering on it.
    preloadImages(items.map(i => i.img));
    setImagesReady(true);
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' })
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e: React.MouseEvent, item: GridItem) => {
    const element = e.currentTarget as HTMLElement;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3
        });
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent, item: GridItem) => {
    const element = e.currentTarget as HTMLElement;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="list relative" style={{ minHeight: `${Math.max(...(grid.length > 0 ? grid.map(i => i.y + i.h) : [0]))}px` }}>
      {grid.map(item => {
        const isSelected = selectedIds.includes(item.id);
        
        return (
          <div
            key={item.id}
            data-key={item.id}
            className={`item-wrapper ${selectable ? 'cursor-pointer' : ''}`}
            style={{ width: item.w, height: item.h, transform: `translate(${item.x}px, ${item.y}px)` }}
            onMouseEnter={e => handleMouseEnter(e, item)}
            onMouseLeave={e => handleMouseLeave(e, item)}
            onClick={() => {
              if (selectable && onItemClick) {
                onItemClick(item.id);
              }
            }}
          >
            <div className={`item-img group ${isSelected ? 'ring-4 ring-google-blue rounded-[1.25rem]' : ''} transition-all duration-300 relative overflow-hidden`} style={{ backgroundImage: `url(${item.img})` }}>
              
              {/* Info Overlay (Name & Submitter) */}
              {(item.childName || item.submitterName) && (
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
                  {item.childName && <h4 className="text-white font-bold text-sm sm:text-lg truncate drop-shadow-md leading-tight">{item.childName}</h4>}
                  {item.submitterName && <p className="text-white/90 text-[10px] sm:text-xs font-medium truncate drop-shadow-sm mt-0.5">oleh {item.submitterName}</p>}
                  {item.pageTitle && <p className="text-white/70 text-[9px] sm:text-[10px] mt-1 truncate drop-shadow-sm">{item.pageTitle}</p>}
                </div>
              )}

              {/* Checkmark Overlay */}
              {isSelected && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-google-blue border-2 border-[#202124] text-white rounded-full p-1 shadow-[2px_2px_0px_#202124] z-20 flex items-center justify-center animate-in zoom-in spin-in-[10deg] duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}

              {/* Category Badge */}
              {item.categoryName && (
                <div className={`absolute bottom-2 left-2 sm:bottom-4 sm:left-4 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-white rounded-full shadow z-20 ${
                  item.categoryName.toLowerCase() === 'organik' ? 'bg-google-green' :
                  item.categoryName.toLowerCase() === 'anorganik' ? 'bg-google-yellow text-gray-900' :
                  item.categoryName.toLowerCase() === 'b3' ? 'bg-google-red' :
                  'bg-gray-800'
                }`}>
                  {item.categoryName}
                </div>
              )}
              
              {/* Dim Overlay when selected */}
              {isSelected && (
                <div className="absolute inset-0 bg-white/20 rounded-xl z-10 pointer-events-none" />
              )}
              {colorShiftOnHover && (
                <div
                  className="color-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
                    opacity: 0,
                    pointerEvents: 'none',
                    borderRadius: '8px'
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;
