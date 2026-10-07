/**
 * Network Information API (Chromium only) — not in TypeScript's DOM lib.
 * Optional on Navigator, so code must handle browsers that don't expose it.
 */
interface NetworkInformationLike extends EventTarget {
  readonly saveData?: boolean;
  /** "slow-2g" | "2g" | "3g" | "4g" */
  readonly effectiveType?: string;
}

interface Navigator {
  readonly connection?: NetworkInformationLike;
}
