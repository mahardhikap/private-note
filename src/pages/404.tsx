import React from "react";
import { useRouter } from "next/router";

const Error: React.FC = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-white text-black">
      <p className="text-xl font-semibold">404 - Not Found</p>
      <div className="cursor-pointer" onClick={() => router.replace("/")}>
        &larr; back to blog
      </div>
    </div>
  );
};

export default Error;
