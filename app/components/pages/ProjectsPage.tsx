import React from "react";
import { isFirefox } from "@/app/utils/browserDetection";

const ProjectsPage: React.FC = () => {
  const firefox = isFirefox();

  return (
    <div
      className="h-45 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl shadow-2xl shadow-indigo-500/40 flex flex-col justify-center items-center pointer-events-auto select-none"
      style={{ width: firefox ? "100vw" : "75vw", height: "75vh" }}
    >
      <h2 className="m-0 text-white text-xl font-semibold">Page 2</h2>
      <p className="mt-2 text-white/90 text-sm">You traveled here in 3D!</p>
      <button
        id="btn-to-page1"
        className="mt-3 px-4 py-2 cursor-pointer border-none rounded bg-white text-purple-600 text-sm font-bold hover:bg-gray-100 transition-colors"
      >
        Go Back
      </button>
    </div>
  );
};

export default ProjectsPage;
