"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const variants = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.97,
  },
  enter: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.99,
  },
};

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Skip animation on first page load for faster initial render
    const timer = setTimeout(() => setIsFirstLoad(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isFirstLoad) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationStart={() => {
          // Scroll to top when entering a new page
          window.scrollTo({ top: 0 });
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
