"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text?: string;
  children?: string;
  className?: string;
}

export const TextReveal: FC<TextRevealByWordProps> = ({
  text,
  children,
  className,
}) => {
  const content = text || children || "";
  const targetRef = useRef<HTMLDivElement | null>(null);

  // Offset "start 80%" to "end 20%" ensures the animation happens naturally 
  // as the text block scrolls into the view, without needing extra sticky height.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 90%", "end 30%"],
  });

  const words = content.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 w-full max-w-4xl mx-auto py-10", className)}>
      <p
        className={
          "w-full text-xl font-black text-black/20 md:text-2xl lg:text-3xl xl:text-4xl leading-tight text-center md:text-justify"
        }
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <span key={i}>
              <Word progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
              {i < words.length - 1 && " "}
            </span>
          );
        })}
      </p>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block">
      <span className="absolute left-0 top-0 opacity-30 select-none" aria-hidden="true">
        {children}
      </span>
      <motion.span
        style={{ opacity }}
        className="text-gray-900 inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextReveal;
