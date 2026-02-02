import * as THREE from "three";

/**
 * Creates a circular star texture with glow effect
 */
export const createStarTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  // Create radial gradient for glow effect
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.1, "rgba(255, 255, 255, 0.8)");
  gradient.addColorStop(0.25, "rgba(200, 220, 255, 0.4)");
  gradient.addColorStop(0.5, "rgba(150, 180, 255, 0.1)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
};

export interface StarfieldConfig {
  starCount?: number;
  spread?: number;
  size?: number;
}

/**
 * Creates a starfield with realistic circular stars and subtle color variations
 */
export const createStarfield = (config: StarfieldConfig = {}): THREE.Points => {
  const { starCount = 2500, spread = 5000, size = 4 } = config;

  const starTexture = createStarTexture();
  const starsGeometry = new THREE.BufferGeometry();

  const positions = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);
  const colors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * spread;
    positions[i3 + 1] = (Math.random() - 0.5) * spread;
    positions[i3 + 2] = (Math.random() - 0.5) * spread;

    // Vary star sizes for more realism
    sizes[i] = Math.random() * 3 + 1;

    // Subtle color variations (white to slight blue/yellow tints)
    const colorVariation = Math.random();
    if (colorVariation < 0.7) {
      // White stars
      colors[i3] = 1;
      colors[i3 + 1] = 1;
      colors[i3 + 2] = 1;
    } else if (colorVariation < 0.85) {
      // Slight blue tint
      colors[i3] = 0.8;
      colors[i3 + 1] = 0.9;
      colors[i3 + 2] = 1;
    } else {
      // Slight warm tint
      colors[i3] = 1;
      colors[i3 + 1] = 0.95;
      colors[i3 + 2] = 0.8;
    }
  }

  starsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  starsGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  starsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const starsMaterial = new THREE.PointsMaterial({
    size,
    sizeAttenuation: true,
    map: starTexture,
    transparent: true,
    alphaTest: 0.01,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(starsGeometry, starsMaterial);
};
