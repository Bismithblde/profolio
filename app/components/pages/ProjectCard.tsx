"use client";

import React, { useState } from "react";
import type { Project } from "@/app/data/projects";
import { ChevronIcon, ExternalLinkIcon, GitHubIcon } from "../icons";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () =>
    setCurrentImage((i) => (i === 0 ? project.images.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentImage((i) => (i === project.images.length - 1 ? 0 : i + 1));

  return (
    <div
      className="rounded-xl border overflow-hidden flex flex-col relative"
      style={{
        backgroundColor: "#252838",
        borderColor: "#2e3148",
        maxWidth: "560px",
        borderLeft: "3px solid #c9a8be22",
      }}
    >
      {/* Links — top-right corner */}
      <div className="absolute top-3 right-3 flex gap-1.5 z-10">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-md border flex items-center justify-center transition-colors"
            style={{
              borderColor: "rgba(201, 168, 190, 0.18)",
              backgroundColor: "rgba(37, 40, 56, 0.85)",
            }}
            title={link.label}
          >
            {link.label === "GitHub" ? (
              <GitHubIcon className="w-3.5 h-3.5 text-white/60" />
            ) : (
              <ExternalLinkIcon className="w-3.5 h-3.5 text-white/60" />
            )}
          </a>
        ))}
      </div>

      {/* 1. Name + Tagline — centered */}
      <div className="flex flex-col items-center px-5 pt-5 pb-3">
        <div className="text-center">
          <h3
            className="roboto-mono text-xl font-bold m-0 leading-tight"
            style={{ color: "#e8d5e0" }}
          >
            {project.name}
          </h3>
          <p
            className="roboto-mono text-xs m-0 mt-1"
            style={{ color: "#8a8daa" }}
          >
            {project.tagline}
          </p>
        </div>
      </div>

      {/* 2. Image Gallery — 16:9 ratio (1920×1080 scaled down) */}
      <div className="relative mx-5" style={{ marginTop: "8px", aspectRatio: "16 / 9", borderRadius: "8px", overflow: "hidden" }}>
        <div
          className="w-full h-full"
          style={{ backgroundColor: "#1a1c2a" }}
        >
          {project.images.length > 0 && (
            <img
              src={project.images[currentImage]}
              alt={`${project.name} screenshot ${currentImage + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          )}
        </div>

        {/* Gallery Controls */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center cursor-pointer border-none transition-colors"
              style={{ backgroundColor: "rgba(30, 33, 48, 0.85)" }}
            >
              <ChevronIcon direction="left" className="w-4 h-4 text-white/70" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center cursor-pointer border-none transition-colors"
              style={{ backgroundColor: "rgba(30, 33, 48, 0.85)" }}
            >
              <ChevronIcon direction="right" className="w-4 h-4 text-white/70" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className="w-1.5 h-1.5 rounded-full border-none cursor-pointer p-0 transition-colors"
                  style={{
                    backgroundColor:
                      idx === currentImage
                        ? "rgba(255,255,255,0.85)"
                        : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 3. Description — details for those who are interested */}
      <div className="px-5" style={{ paddingTop: "20px" }}>
        <p
          className="roboto-mono text-xs leading-relaxed m-0"
          style={{ color: "#c9cbe4" }}
        >
          {project.description}
        </p>
      </div>

      {/* 4. Tags — quick tech stack scan at the bottom */}
      <div className="flex flex-wrap gap-1.5 px-5" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="roboto-mono text-[10px] px-2 py-0.5 rounded-md"
            style={{
              backgroundColor: "rgba(201, 168, 190, 0.06)",
              color: "#a9a0b8",
              border: "1px solid rgba(201, 168, 190, 0.15)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
