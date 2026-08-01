"use client";

import { ReactLenis } from "lenis/react";
import React, { useEffect, useState } from "react";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1.2, smoothWheel: true, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}
