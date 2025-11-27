"use client";
import React, { useRef } from "react";
import Typed from "typed.js";
import { useEffect } from "react";
import Typing from "../components/home/typing";
import Link from "next/link";
function page() {
  const textRef = useRef<HTMLSpanElement>(null);

  return (
    <div className="flex justify-center items-center h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Subtle bloom/light source in top right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(147, 197, 253, 0.15) 0%, rgba(147, 197, 253, 0.08) 30%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(20%, -20%)",
        }}
      />
      {/* Additional softer glow layer */}
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(196, 181, 253, 0.12) 0%, transparent 60%)",
          filter: "blur(80px)",
          transform: "translate(10%, -10%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-purple-950/10 pointer-events-none" />
      <div className="flex flex-col gap-4 w-150 relative z-10">
        <div className="text-6xl font-roboto font-bold">
          <Typing
            strings={["Ryan Chen", "bysmt"]}
            typeSpeed={100}
            backSpeed={100}
            loop={true}
            size="6xl"
          />
        </div>
        <h2 className="text-xl font-roboto text-gray-400">
          Full-Stack Developer | Next.js | Tailwind CSS | TypeScript | React
        </h2>
        <p className="text-lg font-roboto">
          I am a computer science student at Stony Brook University interested
          in full stack development, embedded systems, and Machine Learning.
        </p>
        <Link
          href="/projects"
          className="text-lg font-roboto hover:text-blue-500 underline w-fit"
        >
          Projects
        </Link>
      </div>
    </div>
  );
}

export default page;
