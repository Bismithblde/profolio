import React from "react";
import { GitHubIcon, LinkedInIcon, LocationPinIcon } from "../icons";

const LandingPage: React.FC = () => (
  <div
    className="flex flex-col items-center justify-center gap-12 p-15 rounded-2xl border-2 pointer-events-auto select-none css3d-sharp"
    style={{
      width: "75vw",
      height: "75vh",
      background:
        "radial-gradient(ellipse at 30% 20%, #1a151c 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, #18131a 0%, transparent 45%), radial-gradient(ellipse at 60% 40%, #161218 0%, transparent 35%), #0d0e12",
      borderColor: "#0a0a0c",
    }}
  >
    {/* Location + Name Header */}
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-2">
        <LocationPinIcon className="w-4 h-4 text-red-500" />
        <p className="text-xl roboto-mono text-white m-0">N Y C</p>
      </div>

      <div className="text-center group cursor-default">
        <h1 className="text-7xl roboto-mono font-bold mb-0 tracking-tight m-0 transition-all duration-300 group-hover:tracking-widest group-hover:scale-105">
          <span style={{ color: "#f2e5ec" }}>R</span>
          <span style={{ color: "#e8d5e0" }}>y</span>
          <span style={{ color: "#dcc4d4" }}>a</span>
          <span style={{ color: "#e8d5e0" }}>n</span>
          <span style={{ color: "#f2e5ec" }}> </span>
          <span style={{ color: "#f2e5ec" }}>C</span>
          <span style={{ color: "#e8d5e0" }}>h</span>
          <span style={{ color: "#dcc4d4" }}>e</span>
          <span style={{ color: "#e8d5e0" }}>n</span>
        </h1>
      </div>
    </div>

    {/* Bio Section */}
    <div className="text-center max-w-md">
      <p
        className="text-lg roboto-mono leading-relaxed mb-6 m-0"
        style={{ color: "#d8daf0" }}
      >
        CS @ Stony Brook
      </p>
      <p className="text-base roboto-mono m-0" style={{ color: "#d8daf0" }}>
        Full Stack • AI Integration
      </p>
    </div>

    {/* Social Links */}
    <div className="flex gap-6 justify-center">
      <a
        id="link-github"
        href="https://github.com/Bismithblde"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
      >
        <div className="w-12 h-12 rounded-xl border-2 border-white/30 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/50 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 cursor-pointer">
          <GitHubIcon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
        </div>
      </a>

      <a
        id="link-linkedin"
        href="https://linkedin.com/in/ryanche"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
      >
        <div className="w-12 h-12 rounded-xl border-2 border-white/30 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/50 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 cursor-pointer">
          <LinkedInIcon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
        </div>
      </a>
    </div>

    {/* CTA Button */}
    <button
      id="btn-to-page2"
      className="mt-6 px-8 py-3 roboto-mono text-sm font-semibold text-white border-2 border-white/40 bg-transparent rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 cursor-pointer tracking-wider shadow-lg shadow-white/10"
    >
      View Projects →
    </button>
  </div>
);

export default LandingPage;
