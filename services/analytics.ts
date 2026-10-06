"use client";

import { SITE_CONFIG } from "@/constants/site";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

/**
 * Fires a GA4 event. No-ops when the measurement ID isn't configured, or
 * outside the browser, so it's always safe to call from a form handler.
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || !SITE_CONFIG.ga4MeasurementId) return;
  window.gtag?.("event", eventName, params);
}

export function trackEnquirySubmitted(type: string, source: string): void {
  trackEvent("enquiry_submit", { enquiry_type: type, source });
}
