import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
interface CardI {
  id: string;
  image: string;
  title: string;
  date: string;
  content: string;
}

const CardComponent: React.FC<CardI> = ({
  id,
  image,
  title,
  date,
  content,
}) => {
  const router = useRouter();
  const path = router.pathname;
  console.log("ini lokasi", path);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
      {image === "" || image === null ? (
        <div className="aspect-video col-span-1 rounded-xl bg-gray-400 flex items-center justify-center">
          <div className="font-light text-gray-200">Image Not Uploaded</div>
        </div>
      ) : (
        <Image
          src={image !== null ? image : ""}
          alt="image-preview"
          height={1000}
          width={1000}
          className="aspect-video col-span-1 rounded-xl object-cover"
        />
      )}
      <div className="col-span-2">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-xs font-extralight">{date}</p>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        <button
          className="underline"
          onClick={() =>
            path === "/dashboard"
              ? router.push(`/dashboard/${id}`)
              : router.push(`/detail/${id}`)
          }
        >
          read more
        </button>
      </div>
    </div>
  );
};

export default CardComponent;
