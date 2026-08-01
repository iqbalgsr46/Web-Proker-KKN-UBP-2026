"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockProps {
  className?: string;
  children: React.ReactNode;
  direction?: "top" | "middle" | "bottom";
}

export function Dock({ className, children, direction = "middle" }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onPointerMove={(e) => e.pointerType === "mouse" && mouseX.set(e.pageX)}
      onPointerLeave={(e) => e.pointerType === "mouse" && mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-[58px] items-center gap-2 rounded-2xl bg-white/70 backdrop-blur-md px-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/60",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (typeof child.type === "string") {
            return child;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return React.cloneElement(child as any, { mouseX });
        }
        return child;
      })}
    </motion.div>
  );
}

export interface DockIconProps {
  className?: string;
  children: React.ReactNode;
  mouseX?: import("framer-motion").MotionValue<number>;
}

export function DockIcon({ className, children, mouseX }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const defaultMouseX = useMotionValue(Infinity);

  const distance = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-full bg-white/40 lg:hover:bg-white/80 transition-colors shadow-sm relative group border border-white/60",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
