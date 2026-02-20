import React from "react";
import Lightlogo from "../../assets/images/logo/logo.svg";
const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 dark:bg-amber-50 backdrop-blur-sm">
      {/* Spinner Ring */}
      <div className="relative flex items-center justify-center">
        <div className="h-28 w-28 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500" />

        <img
          src={Lightlogo}
          alt="Loading"
          className="absolute h-18 w-18 animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loader;
