import * as React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="relative w-32 h-32">
          <div
            className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-primary border-b-secondary animate-spin"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-primary animate-spin"
            style={{ animationDuration: "2s", animationDirection: "reverse" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[primary]/5 animate-pulse rounded-full blur-sm" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
