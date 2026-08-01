"use client";

import { ReactLenis } from "lenis/react";
import React, { useEffect, useState } from "react";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices — disable Lenis on mobile to prevent conflicts
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  // On touch devices, skip Lenis entirely — native scroll works perfectly
  if (isTouchDevice) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
