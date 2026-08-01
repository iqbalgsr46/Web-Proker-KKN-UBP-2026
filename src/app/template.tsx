"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.98 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Expo ease-out for a cinematic smooth stop
      }}
    >
      {children}
    </motion.div>
  );
}
