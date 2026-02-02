"use client";

import React, { useRef } from "react";
import { LandingPage, ProjectsPage, useThreeScene } from "./components";

const Page: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  // Initialize Three.js scene with custom hook
  useThreeScene(containerRef, card1Ref, card2Ref);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-transparent relative overflow-hidden"
    >
      {/* Hidden container for React components that will be used as CSS3D objects */}
      <div
        className="absolute opacity-0 pointer-events-none"
        style={{ left: "-9999px" }}
      >
        <div ref={card1Ref}>
          <LandingPage />
        </div>
        <div ref={card2Ref}>
          <ProjectsPage />
        </div>
      </div>
    </div>
  );
};

export default Page;
