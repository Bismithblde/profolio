import React from "react";
import githubLogo from "../public/github.png";
import * as THREE from "three";
export default function page() {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-10">
      <div className="w-auto h-auto  rounded-4xl border-4 drop-shadow-2xl drop-shadow-amber-50 hover:drop-shadow-2xl hover:drop-shadow-amber-200 transition-all duration-300 ease-in-out">
        <h1 className="text-6xl roboto-mono p-10">Ryan Chen</h1>
      </div>

      <h2 className="text-2xl roboto-mono w-1/2 text-center">
        {" "}
        Hello! I'm a computer science student at Stony Brook University based in
        New York City. I specialize in web development with agentic integration.
      </h2>
      <div className="flex  w-1/2 h-20 flex-row justify-around">
        <div className="w-auto h-auto bg-zinc-300 rounded-3xl">
          <a href="https://github.com/Bismithblde" target="_blank">
            <img
              src={githubLogo.src}
              alt="GitHub Logo"
              className="h-16 w-16 m-2 inline-block filter brightness-1"
            />
          </a>
        </div>
        <div className="w-auto h-auto bg-zinc-300 rounded-3xl">
          <a href="https://github.com/Bismithblde" target="_blank">
            <img
              src={githubLogo.src}
              alt="GitHub Logo"
              className="h-16 w-16 m-2 inline-block filter brightness-1"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
