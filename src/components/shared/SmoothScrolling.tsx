"use client";

import { ReactLenis } from "lenis/react";
import React from "react";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, wheelMultiplier: 0.8, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
