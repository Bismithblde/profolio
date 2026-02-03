"use client";

import React from "react";
import { isChrome } from "@/app/utils/browserDetection";

interface CSS3DPageProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Reference resolution for full-size rendering
const REFERENCE_WIDTH = 1920;
const REFERENCE_HEIGHT = 1080;

/**
 * Wrapper component for pages rendered in CSS3D space
 * - On 1920x1080+ screens: renders at fixed 1920x1080 (scaled in Three.js)
 * - On smaller screens: responsive sizing
 * - Chrome: renders at native size (no CSS3D scaling)
 * - Firefox/Edge: renders at reference size, scaled down in Three.js
 */
const CSS3DPage: React.FC<CSS3DPageProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const chrome = isChrome();
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : REFERENCE_WIDTH;
  const screenHeight = typeof window !== "undefined" ? window.innerHeight : REFERENCE_HEIGHT;
  
  // Check if screen is at or above reference resolution
  const isLargeScreen = screenWidth >= REFERENCE_WIDTH && screenHeight >= REFERENCE_HEIGHT;
  
  let width: string;
  let height: string;
  
  if (chrome) {
    // Chrome: use viewport units, slightly smaller to fit
    width = isLargeScreen ? `${REFERENCE_WIDTH}px` : "90vw";
    height = isLargeScreen ? `${REFERENCE_HEIGHT}px` : "85vh";
  } else {
    // Firefox/Edge: render at reference size (will be scaled in Three.js)
    width = `${REFERENCE_WIDTH}px`;
    height = `${REFERENCE_HEIGHT}px`;
  }

  return (
    <div
      className={`css3d-text pointer-events-auto select-none ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default CSS3DPage;
