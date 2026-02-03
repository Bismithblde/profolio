/**
 * Browser detection utilities for CSS3D rendering optimization
 */

export type Browser = "firefox" | "chrome" | "edge" | "safari" | "unknown";

export const detectBrowser = (): Browser => {
  if (typeof window === "undefined") return "unknown";

  const userAgent = window.navigator.userAgent.toLowerCase();

  // Firefox
  if (userAgent.includes("firefox")) {
    return "firefox";
  }

  // Edge (Chromium-based)
  if (userAgent.includes("edg/")) {
    return "edge";
  }

  // Chrome (must check after Edge since Edge contains 'chrome')
  if (userAgent.includes("chrome")) {
    return "chrome";
  }

  // Safari
  if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
    return "safari";
  }

  return "unknown";
};

export const isFirefox = (): boolean => detectBrowser() === "firefox";
export const isChrome = (): boolean => detectBrowser() === "chrome";
export const isEdge = (): boolean => detectBrowser() === "edge";
export const isChromium = (): boolean => {
  const browser = detectBrowser();
  return browser === "chrome" || browser === "edge";
};
