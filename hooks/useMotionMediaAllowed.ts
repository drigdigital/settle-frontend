"use client";

import { useSyncExternalStore } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const SLOW_CONNECTIONS = new Set(["slow-2g", "2g", "3g"]);

function subscribeConnection(onChange: () => void) {
  const connection = navigator.connection;
  connection?.addEventListener("change", onChange);
  return () => connection?.removeEventListener("change", onChange);
}

function isConstrainedConnection(): boolean {
  const connection = navigator.connection;
  if (!connection) return false;
  return Boolean(connection.saveData) || SLOW_CONNECTIONS.has(connection.effectiveType ?? "");
}

/**
 * Whether decorative background media (video, autoplaying galleries) may
 * play: a tablet-or-wider viewport, no reduced-motion preference, and no
 * Data Saver / 3G-or-slower connection. False on the server and the first
 * client render, so the static poster is what hydrates.
 */
export function useMotionMediaAllowed(): boolean {
  const isWide = useMediaQuery("(min-width: 768px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isConstrained = useSyncExternalStore(
    subscribeConnection,
    isConstrainedConnection,
    () => true,
  );
  return isWide && !prefersReducedMotion && !isConstrained;
}
