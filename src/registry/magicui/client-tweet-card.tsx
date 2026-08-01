"use client";

import { Tweet } from "react-tweet";
import { cn } from "@/lib/utils";

interface ClientTweetCardProps {
  id: string;
  className?: string;
}

export function ClientTweetCard({ id, className }: ClientTweetCardProps) {
  return (
    <div className={cn("w-full max-w-lg overflow-hidden", className)}>
      <Tweet id={id} />
    </div>
  );
}
