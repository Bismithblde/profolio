"use client";
import React, { useRef } from "react";
import Typed from "typed.js";
import { useEffect } from "react";
import Typing from "../components/home/typing";
import Link from "next/link";
function page() {
  const textRef = useRef<HTMLSpanElement>(null);

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col gap-4 w-150">
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
