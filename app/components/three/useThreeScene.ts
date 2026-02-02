import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer";
import { createStarfield } from "./Starfield";

export interface CardPosition {
  x: number;
  y: number;
  z: number;
}

export interface SceneConfig {
  card1Position?: CardPosition;
  card2Position?: CardPosition;
  initialCameraZ?: number;
  animationDuration?: number;
}

const DEFAULT_CONFIG: Required<SceneConfig> = {
  card1Position: { x: 0, y: 0, z: 0 },
  card2Position: { x: -3500, y: 0, z: -2000 },
  initialCameraZ: 750,
  animationDuration: 3,
};

export const useThreeScene = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  card1Ref: React.RefObject<HTMLDivElement | null>,
  card2Ref: React.RefObject<HTMLDivElement | null>,
  config: SceneConfig = {},
) => {
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    goToPage1: () => void;
    goToPage2: () => void;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    if (!container || !card1 || !card2) return;

    const mergedConfig = { ...DEFAULT_CONFIG, ...config };

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      8000,
    );
    camera.position.set(0, 0, mergedConfig.initialCameraZ);
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
    webglRenderer.setClearColor(0x000000, 0);
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

    // Create CSS3D Objects from React-rendered elements
    const card1Object = new CSS3DObject(card1);
    card1Object.position.set(
      mergedConfig.card1Position.x,
      mergedConfig.card1Position.y,
      mergedConfig.card1Position.z,
    );
    scene.add(card1Object);

    const card2Object = new CSS3DObject(card2);
    card2Object.position.set(
      mergedConfig.card2Position.x,
      mergedConfig.card2Position.y,
      mergedConfig.card2Position.z,
    );
    scene.add(card2Object);

    // Navigation functions
    const goToPage2 = () => {
      console.log("Going to Page 2!");
      controls.enabled = false;

      gsap.to(camera.position, {
        x: mergedConfig.card2Position.x,
        y: 0,
        z: mergedConfig.card2Position.z + 500,
        duration: mergedConfig.animationDuration,
        ease: "power2.inOut",
        onComplete: () => {
          controls.enabled = true;
        },
      });

      gsap.to(controls.target, {
        x: mergedConfig.card2Position.x,
        y: 0,
        z: mergedConfig.card2Position.z - 500,
        duration: mergedConfig.animationDuration,
        ease: "power2.inOut",
      });
    };

    const goToPage1 = () => {
      console.log("Going back to Page 1!");
      controls.enabled = false;

      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: mergedConfig.initialCameraZ,
        duration: mergedConfig.animationDuration,
        ease: "power2.inOut",
        onComplete: () => {
          controls.enabled = true;
        },
      });

      gsap.to(controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: mergedConfig.animationDuration,
        ease: "power2.inOut",
      });
    };

    // Store refs for external access
    sceneRef.current = {
      scene,
      camera,
      controls,
      goToPage1,
      goToPage2,
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
      sceneRef.current = null;
    };
  }, [containerRef, card1Ref, card2Ref, config]);

  return sceneRef;
};
