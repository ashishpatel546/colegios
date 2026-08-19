"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger position within a group, in items. Each step adds 60ms. */
  index?: number;
  /** Distance travelled on entry, in px. */
  travel?: number;
  direction?: "up" | "left" | "right";
  className?: string;
};

/**
 * Scroll reveal. Travel and delay collapse to zero when the visitor has asked
 * for reduced motion — the content still fades, so nothing appears broken.
 */
export default function Reveal({
  children,
  index = 0,
  travel = 16,
  direction = "up",
  className,
}: Props) {
  const reduced = useReducedMotionSafe();

  const offset = reduced
    ? {}
    : direction === "up"
      ? { y: travel }
      : { x: direction === "left" ? -travel : travel };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduced ? 0.2 : 0.55,
        delay: reduced ? 0 : Math.min(index * 0.06, 0.42),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
