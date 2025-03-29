import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          className="shadow rounded-md p-2 max-w-xl w-full mt-8 h-40"
          key={index}
        >
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-md bg-slate-300 h-50 w-[220px] h-[120px]"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingPage;
