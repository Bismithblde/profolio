import React from "react";
import { CSS3DPage } from "../three";
import { GitHubIcon, LinkedInIcon, LocationPinIcon } from "../icons";

const LandingPage: React.FC = () => {
  return (
    <CSS3DPage
      className="flex flex-col items-center justify-center gap-8 sm:gap-12 p-6 sm:p-15 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
      style={{
        backgroundColor: "#1e2130",
        borderColor: "#1a1c24",
      }}
    >
      {/* Location + Name Header */}
      <div className="flex flex-col items-center gap-2 sm:gap-4">
        <div className="flex items-center justify-center gap-2">
          <LocationPinIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
          <p className="text-sm sm:text-xl roboto-mono text-white m-0">N Y C</p>
        </div>

        <div className="text-center group cursor-default">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl roboto-mono font-bold mb-0 tracking-tight m-0 transition-all duration-300 group-hover:tracking-widest group-hover:scale-105">
            <span style={{ color: "#e8d5e0" }}>R</span>
            <span style={{ color: "#d9c0d0" }}>y</span>
            <span style={{ color: "#c9a8be" }}>a</span>
            <span style={{ color: "#d9c0d0" }}>n</span>
            <span style={{ color: "#e8d5e0" }}> </span>
            <span style={{ color: "#e8d5e0" }}>C</span>
            <span style={{ color: "#d9c0d0" }}>h</span>
            <span style={{ color: "#c9a8be" }}>e</span>
            <span style={{ color: "#d9c0d0" }}>n</span>
          </h1>
        </div>
      </div>

      {/* Bio Section */}
      <div className="text-center max-w-md px-4">
        <p
          className="text-sm sm:text-lg roboto-mono leading-relaxed mb-4 sm:mb-6 m-0"
          style={{ color: "#c9cbe4" }}
        >
          CS @ Stony Brook
        </p>
        <p
          className="text-xs sm:text-base roboto-mono m-0"
          style={{ color: "#c9cbe4" }}
        >
          Full Stack • AI Integration
        </p>
      </div>

      {/* Social Links */}
      <div className="flex gap-4 sm:gap-6 justify-center">
        <a
          href="https://github.com/Bismithblde"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/30 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/50 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 cursor-pointer">
            <GitHubIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 group-hover:text-white transition-colors" />
          </div>
        </a>

        <a
          href="https://linkedin.com/in/ryanche"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/30 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/50 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 cursor-pointer">
            <LinkedInIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 group-hover:text-white transition-colors" />
          </div>
        </a>
      </div>

      {/* CTA Button */}
      <button
        id="btn-to-page2"
        className="mt-4 sm:mt-6 px-6 sm:px-8 py-2 sm:py-3 roboto-mono text-xs sm:text-sm font-semibold text-white border-2 border-white/40 bg-transparent rounded-lg hover:bg-white/10 hover:border-white/60 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 cursor-pointer tracking-wider"
      >
        View Projects →
      </button>
    </CSS3DPage>
  );
};

export default LandingPage;
