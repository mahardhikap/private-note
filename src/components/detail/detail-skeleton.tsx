import React from "react";
import Container from "@/containers/page.container";
import { useRouter } from "next/router";

const DetailSkeleton: React.FC = () => {
  const router = useRouter();

  return (
    <Container>
      <button onClick={() => router.back()} className="mb-4">
        &larr; kembali ke halaman
      </button>
      <div>
        <div className="aspect-video rounded-xl bg-gray-300 animate-pulse flex items-center justify-center"></div>
        <h1 className="h-5 animate-pulse bg-gray-300 rounded-full mt-3"></h1>
        <div className="flex mt-2 mb-5 h-full w-full justify-center items-center gap-2">
          <p className=" h-3 rounded-full bg-gray-300 animate-pulse w-1/5"></p>
          <p className=" h-3 rounded-full bg-gray-300 animate-pulse w-1/5"></p>
        </div>
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className=" h-4 rounded-full bg-gray-300 animate-pulse w-full mb-2"
            ></div>
          ))}
      </div>
    </Container>
  );
};

export default DetailSkeleton;
