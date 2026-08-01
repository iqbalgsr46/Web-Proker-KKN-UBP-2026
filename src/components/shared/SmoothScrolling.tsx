"use client";

import { ReactLenis } from "lenis/react";
import React, { useEffect, useState } from "react";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.05, 
      wheelMultiplier: 1, 
      smoothWheel: true, 
      smoothTouch: true,
      touchMultiplier: 2 
    }}>
      {children}
    </ReactLenis>
  );
}
