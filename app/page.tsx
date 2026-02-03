"use client";

import React, { useRef, useMemo } from "react";
import { LandingPage, ProjectsPage, useThreeScene } from "./components";
import type { PageRef } from "./components";
import { PAGE_CONFIGS } from "./config/pages";

const Page: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Create refs for each page in the registry
  const landingRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);

  // Map page IDs to their refs
  const pageRefs: PageRef[] = useMemo(
    () => [
      { id: "landing", ref: landingRef },
      { id: "projects", ref: projectsRef },
    ],
    [],
  );

  // Initialize Three.js scene with dynamic pages
  useThreeScene(containerRef, pageRefs, PAGE_CONFIGS);

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
        <div ref={landingRef}>
          <LandingPage />
        </div>
        <div ref={projectsRef}>
          <ProjectsPage />
        </div>
      </div>
    </div>
  );
};

export default Page;
