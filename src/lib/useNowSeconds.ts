"use client";

import { useSyncExternalStore } from "react";

/**
 * Seconds since the epoch, ticking once a second — or `null` on the server and
 * during the first render, so markup matches across hydration.
 *
 * Wired through useSyncExternalStore rather than useState + useEffect: the
 * clock is an external system, and this keeps the value out of the render
 * cascade entirely.
 */
function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => null;

export function useNowSeconds(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
