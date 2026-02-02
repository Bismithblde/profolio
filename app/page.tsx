"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer";

// GitHub Icon Component
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="black"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// Landing Page Component (Card 1)
const LandingPage = () => (
  <div className="w-200 min-h-125 bg-transparent flex flex-col justify-center items-center gap-10 pointer-events-auto select-none">
    {/* Name Container */}
    <div className="p-10 rounded-4xl border-4 border-white/80 shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/30 transition-all duration-300 ease-in-out">
      <h1 className="text-6xl roboto-mono text-white m-0">Ryan Chen</h1>
    </div>

    {/* Bio Text */}
    <h2 className="text-2xl roboto-mono text-white text-center w-1/2 min-w-100 m-0 leading-relaxed">
      Hello! I&apos;m a computer science student at Stony Brook University based
      in New York City. I specialize in web development with agentic
      integration.
    </h2>

    {/* Social Links */}
    <div className="flex flex-row justify-center gap-10 w-1/2">
      <a
        href="https://github.com/Bismithblde"
        target="_blank"
        rel="noopener noreferrer"
        className="w-20 h-20 bg-zinc-300 rounded-3xl flex justify-center items-center cursor-pointer hover:bg-zinc-200 transition-colors"
      >
        <GitHubIcon />
      </a>
      <a
        href="https://github.com/Bismithblde"
        target="_blank"
        rel="noopener noreferrer"
        className="w-20 h-20 bg-zinc-300 rounded-3xl flex justify-center items-center cursor-pointer hover:bg-zinc-200 transition-colors"
      >
        <GitHubIcon />
      </a>
    </div>

    {/* Navigation Button */}
    <button
      id="btn-to-page2"
      className="mt-5 px-8 py-4 cursor-pointer border-2 border-white/50 rounded-xl bg-transparent text-white text-lg roboto-mono transition-all duration-300 ease-in-out hover:bg-white/10 hover:border-white/80"
    >
      View Projects →
    </button>
  </div>
);

// Projects Page Component (Card 2)
const ProjectsPage = () => (
  <div className="w-75 h-45 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl shadow-2xl shadow-indigo-500/40 flex flex-col justify-center items-center pointer-events-auto select-none">
    <h2 className="m-0 text-white text-xl font-semibold">Page 2</h2>
    <p className="mt-2 text-white/90 text-sm">You traveled here in 3D!</p>
    <button
      id="btn-to-page1"
      className="mt-3 px-4 py-2 cursor-pointer border-none rounded bg-white text-purple-600 text-sm font-bold hover:bg-gray-100 transition-colors"
    >
      Go Back
    </button>
  </div>
);

const Page: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    if (!container || !card1 || !card2) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      8000,
    );
    camera.position.set(0, 0, 750); // Zoomed out from the first component
    camera.lookAt(0, 0, 0);

    // CSS3D Renderer
    const renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "2";
    container.appendChild(renderer.domElement);

    // WebGL Renderer for stars background
    const webglRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    webglRenderer.setSize(window.innerWidth, window.innerHeight);
    webglRenderer.setPixelRatio(window.devicePixelRatio);
    webglRenderer.domElement.style.position = "absolute";
    webglRenderer.domElement.style.top = "0";
    webglRenderer.domElement.style.left = "0";
    webglRenderer.domElement.style.zIndex = "1";
    container.appendChild(webglRenderer.domElement);

    // Create starfield
    const webglScene = new THREE.Scene();
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4000;
      positions[i + 1] = (Math.random() - 0.5) * 4000;
      positions[i + 2] = (Math.random() - 0.5) * 4000;
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    webglScene.add(stars);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Create CSS3D Objects from React-rendered elements
    const card1Object = new CSS3DObject(card1);
    card1Object.position.set(0, 0, 0);
    scene.add(card1Object);

    const card2Object = new CSS3DObject(card2);
    card2Object.position.set(-3500, 0, -2000); // Much further left and back
    scene.add(card2Object);

    // Navigation functions
    const goToPage2 = () => {
      console.log("Going to Page 2!");
      controls.enabled = false;

      gsap.to(camera.position, {
        x: -3500,
        y: 0,
        z: -1500, // 450 units in front of card2
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
          controls.enabled = true;
        },
      });

      gsap.to(controls.target, {
        x: -3500,
        y: 0,
        z: -2500,
        duration: 3,
        ease: "power2.inOut",
      });
    };

    const goToPage1 = () => {
      console.log("Going back to Page 1!");
      controls.enabled = false;

      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 750, // Zoomed out from card1
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
          controls.enabled = true;
        },
      });

      gsap.to(controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 3,
        ease: "power2.inOut",
      });
    };

    // Attach click handlers to buttons using native DOM
    const btnToPage2 = card1.querySelector(
      "#btn-to-page2",
    ) as HTMLButtonElement;
    const btnToPage1 = card2.querySelector(
      "#btn-to-page1",
    ) as HTMLButtonElement;

    if (btnToPage2) {
      btnToPage2.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToPage2();
      };
      btnToPage2.onmouseenter = () => {
        controls.enabled = false;
      };
      btnToPage2.onmouseleave = () => {
        controls.enabled = true;
      };
    }

    if (btnToPage1) {
      btnToPage1.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToPage1();
      };
      btnToPage1.onmouseenter = () => {
        controls.enabled = false;
      };
      btnToPage1.onmouseleave = () => {
        controls.enabled = true;
      };
    }

    // Render function
    const render = () => {
      controls.update();
      stars.rotation.x += 0.0001;
      stars.rotation.y += 0.0002;
      webglRenderer.render(webglScene, camera);
      renderer.render(scene, camera);
    };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      render();
    };
    animate();

    // Handle resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      webglRenderer.setSize(window.innerWidth, window.innerHeight);
      render();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);
      container.removeChild(webglRenderer.domElement);
      webglRenderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-[#0a0a0a] relative overflow-hidden"
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
