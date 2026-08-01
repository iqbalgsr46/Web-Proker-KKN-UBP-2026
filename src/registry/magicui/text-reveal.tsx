"use client";

import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
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
  const words = content.split(" ");

  return (
    <div className={cn("relative z-0 w-full max-w-4xl mx-auto py-10", className)}>
      <p
        className={
          "w-full text-xl font-black text-black/20 md:text-2xl lg:text-3xl xl:text-4xl leading-tight text-center md:text-justify"
        }
      >
        {words.map((word, i) => (
          <span key={i}>
            <Word index={i} total={words.length}>{word}</Word>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </p>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  index: number;
  total: number;
}

const Word: FC<WordProps> = ({ children, index, total }) => {
  // Stagger delay: words appear in groups to avoid excessive delays
  const groupSize = Math.max(3, Math.floor(total / 15));
  const groupIndex = Math.floor(index / groupSize);
  const delay = groupIndex * 0.08;

  return (
    <span className="relative inline-block">
      <span className="absolute left-0 top-0 opacity-30 select-none" aria-hidden="true">
        {children}
      </span>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-2%" }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className="text-gray-900 inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextReveal;
