import React from "react";
import { CSS3DPage } from "../three";

const ProjectsPage: React.FC = () => {
  return (
    <CSS3DPage className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex flex-col justify-center items-center p-6 sm:p-12 gap-4 sm:gap-6">
      <h2 className="m-0 text-white text-2xl sm:text-4xl font-semibold">
        Page 2
      </h2>
      <p className="mt-2 text-white/90 text-xs sm:text-sm text-center max-w-xs sm:max-w-md">
        You traveled here in 3D!
      </p>
      <button
        id="btn-to-page1"
        className="mt-2 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 cursor-pointer border-none rounded bg-white text-purple-600 text-xs sm:text-sm font-bold hover:bg-gray-100 transition-colors"
      >
        Go Back
      </button>
    </CSS3DPage>
  );
};

export default ProjectsPage;
