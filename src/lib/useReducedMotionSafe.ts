"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * Whether the visitor has asked for reduced motion.
 *
 * framer-motion's own useReducedMotion reads the media query on the very first
 * client render, which disagrees with the server and tears the hydration tree
 * apart for anyone who has the setting on. useSyncExternalStore hands React the
 * server snapshot during hydration and only then swaps in the real value, so
 * the markup always matches and the preference still takes effect.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
