"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  glowIntensity: number;
}

export function Stars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate sparse stars (not too many)
    const starCount = 8; // Small number for subtlety
    const newStars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const baseOpacity = Math.random() * 0.25 + 0.2; // Opacity between 0.2-0.45
      newStars.push({
        id: i,
        x: Math.random() * 100, // Random X position (0-100%)
        y: Math.random() * 100, // Random Y position (0-100%)
        size: Math.random() * 1.5 + 1, // Size between 1-2.5px
        opacity: baseOpacity,
        delay: Math.random() * 2, // Random animation delay
        duration: 2 + Math.random() * 1, // Random duration between 2-3s for glow pulse
        glowIntensity: Math.random() * 0.3 + 0.4, // Glow intensity variation
      });
    }

    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `star-glow-pulse ${star.duration}s ease-in-out infinite, star-fade-out 5s ease-out forwards`,
              animationDelay: `${star.delay}s`,
              boxShadow: `
              0 0 ${star.size * 3}px rgba(255, 255, 255, ${
                star.opacity * star.glowIntensity
              }),
              0 0 ${star.size * 6}px rgba(147, 197, 253, ${
                star.opacity * star.glowIntensity * 0.5
              }),
              0 0 ${star.size * 9}px rgba(147, 197, 253, ${
                star.opacity * star.glowIntensity * 0.25
              })
            `,
              filter: `blur(0.5px)`,
              "--initial-opacity": star.opacity.toString(),
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
