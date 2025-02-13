import React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
      <div className="aspect-video col-span-1 rounded-xl bg-gray-300 flex items-center justify-center animate-pulse"></div>
      <div className="col-span-2 flex flex-col gap-2">
        <h2 className="font-bold text-lg bg-gray-300 h-5 rounded-full animate-pulse"></h2>
        <p className="h-3 bg-gray-300 animate-pulse rounded-full w-1/4"></p>
        <div className="h-3 bg-gray-300 animate-pulse rounded-full"></div>
        <div className="h-3 bg-gray-300 animate-pulse rounded-full"></div>
        <div className="h-3 bg-gray-300 animate-pulse rounded-full"></div>
        <div className="h-3 bg-gray-300 animate-pulse rounded-full w-1/6"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
