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

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  });
  const words = content.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[120vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-screen max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
        }
      >
        <p
          className={
            "w-full p-5 text-2xl font-black text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl leading-tight text-justify"
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
      <span className="absolute left-0 top-0 opacity-30 select-none" aria-hidden="true">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className="text-gray-900 inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextReveal;
