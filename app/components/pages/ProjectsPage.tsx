import React from "react";
import { CSS3DPage } from "../three";
import ProjectCard from "./ProjectCard";
import { SAMPLE_PROJECTS } from "@/app/data/projects";

const ProjectsPage: React.FC = () => {
  return (
    <CSS3DPage
      className="flex flex-col rounded-2xl border-2 overflow-hidden"
      style={{
        backgroundColor: "#1e2130",
        borderColor: "#1a1c24",
      }}
    >
      {/* ---- Header Bar ---- */}
      <div
        className="shrink-0 flex items-center justify-between px-8 py-5 border-b"
        style={{ borderColor: "#2e3148" }}
      >
        <div>
          <h2
            className="roboto-mono text-2xl font-bold m-0 tracking-tight"
            style={{ color: "#e8d5e0" }}
          >
            Projects
            <span
              className="inline-block w-2 h-2 rounded-full ml-2 align-middle"
              style={{ backgroundColor: "#c9a8be" }}
            />
          </h2>
          <p
            className="roboto-mono text-xs m-0 mt-1"
            style={{ color: "#8a8daa" }}
          >
            {SAMPLE_PROJECTS.length} project
            {SAMPLE_PROJECTS.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          id="btn-to-page1"
          className="roboto-mono text-xs font-semibold px-5 py-2 rounded-lg border-2 cursor-pointer transition-colors tracking-wider"
          style={{
            color: "#e8d5e0",
            borderColor: "rgba(255,255,255,0.25)",
            backgroundColor: "transparent",
          }}
        >
          ← Back
        </button>
      </div>

      {/* ---- Project Cards (wrap, centered) ---- */}
      <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col items-center justify-center">
        <div className="flex flex-wrap justify-center gap-5 content-start">
          {SAMPLE_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </CSS3DPage>
  );
};

export default ProjectsPage;
