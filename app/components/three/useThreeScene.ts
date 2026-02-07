import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";
import { createStarfield } from "./Starfield";
import { isFirefox, isChrome } from "@/app/utils/browserDetection";
import { PageConfig } from "@/app/config/pages";

export interface CardPosition {
  x: number;
  y: number;
  z: number;
}

export interface SceneConfig {
  initialCameraZ?: number;
  animationDuration?: number;
  zoomDuration?: number;
}

const DEFAULT_CONFIG: Required<SceneConfig> = {
  initialCameraZ: 750,
  animationDuration: 3,
  zoomDuration: 1,
};

export interface PageRef {
  id: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

export interface SceneAPI {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  navigateTo: (pageId: string) => void;
}

/**
 * Dynamic Three.js scene hook that supports any number of pages
 * @param containerRef - Reference to the container element
 * @param pageRefs - Array of page refs with their IDs
 * @param pageConfigs - Array of page configurations with positions
 * @param config - Optional scene configuration
 */
export const useThreeScene = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  pageRefs: PageRef[],
  pageConfigs: PageConfig[],
  config: SceneConfig = {},
) => {
  const sceneRef = useRef<SceneAPI | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    // Validate all refs are available
    const allRefs = pageRefs.map((p) => p.ref.current);
    if (!container || allRefs.some((ref) => ref === null)) return;

    const mergedConfig = { ...DEFAULT_CONFIG, ...config };

    // Scene
    const scene = new THREE.Scene();

    // Check browsers for rendering optimization
    const firefox = isFirefox();
    const chrome = isChrome();

    // Reference resolution
    const REFERENCE_WIDTH = 1920;
    const REFERENCE_HEIGHT = 1080;
    
    // Screen dimensions
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Check if screen is at or above reference resolution
    const isLargeScreen = screenWidth >= REFERENCE_WIDTH && screenHeight >= REFERENCE_HEIGHT;
    const isMobile = screenWidth < 768;

    // Calculate fullscreen camera distance using trigonometry
    // distance = (height / 2) / tan(fov / 2)
    const fov = 60;
    const fovRadians = (fov * Math.PI) / 180;
    
    // Card height depends on screen size and browser
    let cardHeight: number;
    if (chrome) {
      cardHeight = isLargeScreen ? REFERENCE_HEIGHT : screenHeight * 0.85;
    } else {
      // Firefox/Edge always render at reference size
      cardHeight = REFERENCE_HEIGHT;
    }

    // Base distance calculation
    let fullscreenDistance = cardHeight / 2 / Math.tan(fovRadians / 2);

    // Apply consistent zoom behavior across all browsers
    if (isMobile) {
      fullscreenDistance = fullscreenDistance * 1.3;
    } else if (firefox) {
      // Firefox: move camera further back to fit scaled content
      fullscreenDistance = fullscreenDistance * 1.35;
    } else if (chrome && isLargeScreen) {
      // Chrome on large screens: slight adjustment for fixed-size cards
      fullscreenDistance = fullscreenDistance * 1.2;
    } else {
      // Edge and other browsers: also move camera further back
      fullscreenDistance = fullscreenDistance * 1.35;
    }

    // normalDistance should always be farther than fullscreenDistance for zoom-out effect
    const normalDistance = Math.max(
      mergedConfig.initialCameraZ,
      fullscreenDistance * 1.3,
    );

    // Camera - start at fullscreen distance, position at first page
    const firstPageConfig = pageConfigs[0];
    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      1,
      15000, // Increased for larger scenes
    );
    camera.position.set(
      firstPageConfig?.position.x || 0,
      firstPageConfig?.position.y || 0,
      (firstPageConfig?.position.z || 0) + fullscreenDistance,
    );
    camera.lookAt(
      firstPageConfig?.position.x || 0,
      firstPageConfig?.position.y || 0,
      firstPageConfig?.position.z || 0,
    );

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
      alpha: false,
    });
    webglRenderer.setClearColor(0x000000, 1);
    webglRenderer.setSize(window.innerWidth, window.innerHeight);
    webglRenderer.setPixelRatio(window.devicePixelRatio);
    webglRenderer.domElement.style.position = "absolute";
    webglRenderer.domElement.style.top = "0";
    webglRenderer.domElement.style.left = "0";
    webglRenderer.domElement.style.zIndex = "1";
    container.appendChild(webglRenderer.domElement);

    // Create starfield
    const webglScene = new THREE.Scene();
    const stars = createStarfield();
    webglScene.add(stars);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.target.set(
      firstPageConfig?.position.x || 0,
      firstPageConfig?.position.y || 0,
      firstPageConfig?.position.z || 0,
    );

    // CSS3D scaling to fix blur (full-width rendering approach)
    // Chrome: no scaling needed when rendering at reference or viewport size
    // Firefox/Edge: scale to fit reference-sized content to screen
    let scale: number;
    if (chrome) {
      // Chrome renders at actual size, camera distance handles fitting
      scale = 1;
    } else {
      // Firefox/Edge: scale reference-sized (1920px) content to fit screen
      // This maintains sharp text by rendering at full resolution then scaling
      scale = screenWidth / REFERENCE_WIDTH;
    }

    // Create CSS3D Objects from refs based on page configs
    const css3dObjects: Map<string, CSS3DObject> = new Map();

    pageRefs.forEach((pageRef) => {
      const element = pageRef.ref.current;
      const pageConfig = pageConfigs.find((c) => c.id === pageRef.id);

      if (element && pageConfig) {
        const css3dObject = new CSS3DObject(element);
        css3dObject.scale.set(scale, scale, scale);
        css3dObject.position.set(
          pageConfig.position.x,
          pageConfig.position.y,
          pageConfig.position.z,
        );
        scene.add(css3dObject);
        css3dObjects.set(pageRef.id, css3dObject);
      }
    });

    // Track current page for navigation
    let currentPageId = pageConfigs[0]?.id || "";

    // Generic navigation function
    const navigateTo = (targetPageId: string) => {
      const targetConfig = pageConfigs.find((c) => c.id === targetPageId);
      if (!targetConfig) {
        console.warn(`Page "${targetPageId}" not found`);
        return;
      }

      console.log(`Navigating from "${currentPageId}" to "${targetPageId}"`);
      controls.enabled = false;

      const timeline = gsap.timeline();

      // Step 1: Zoom out to normal distance
      timeline.to(camera.position, {
        z: camera.position.z + (normalDistance - fullscreenDistance),
        duration: mergedConfig.zoomDuration,
        ease: "power2.inOut",
      });

      // Step 2: Navigate to target page
      timeline.to(camera.position, {
        x: targetConfig.position.x,
        y: targetConfig.position.y,
        z: targetConfig.position.z + fullscreenDistance,
        duration: mergedConfig.animationDuration,
        ease: "power2.inOut",
        onComplete: () => {
          controls.enabled = true;
          currentPageId = targetPageId;
        },
      });

      timeline.to(
        controls.target,
        {
          x: targetConfig.position.x,
          y: targetConfig.position.y,
          z: targetConfig.position.z,
          duration: mergedConfig.animationDuration,
          ease: "power2.inOut",
        },
        "<",
      );
    };

    // Store refs for external access
    sceneRef.current = {
      scene,
      camera,
      controls,
      navigateTo,
    };

    // Setup navigation button handlers dynamically
    pageConfigs.forEach((pageConfig) => {
      if (pageConfig.navButton) {
        const pageRef = pageRefs.find((p) => p.id === pageConfig.id);
        if (pageRef?.ref.current) {
          const button = pageRef.ref.current.querySelector(
            `#${pageConfig.navButton.buttonId}`,
          ) as HTMLButtonElement;

          if (button) {
            button.onclick = (e) => {
              e.preventDefault();
              e.stopPropagation();
              navigateTo(pageConfig.navButton!.targetPageId);
            };
            button.onmouseenter = () => {
              controls.enabled = false;
            };
            button.onmouseleave = () => {
              controls.enabled = true;
            };
          }
        }
      }
    });

    // Setup link handlers for all pages
    const setupLinkHandler = (link: HTMLAnchorElement | null) => {
      if (!link) return;
      link.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const href = link.getAttribute("href");
        if (href) {
          window.open(href, "_blank", "noopener,noreferrer");
        }
      };
      link.onmouseenter = () => {
        controls.enabled = false;
      };
      link.onmouseleave = () => {
        controls.enabled = true;
      };
    };

    // Find and setup all external links across all pages
    pageRefs.forEach((pageRef) => {
      if (pageRef.ref.current) {
        const links = pageRef.ref.current.querySelectorAll(
          'a[target="_blank"]',
        ) as NodeListOf<HTMLAnchorElement>;
        links.forEach(setupLinkHandler);
      }
    });

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
      sceneRef.current = null;
    };
  }, [containerRef, pageRefs, pageConfigs, config]);

  return sceneRef;
};
