import React, { useState, useEffect } from "react";
import Admin from "@/containers/admin.container";
import { detailArticle } from "@/api/articles.api";
import { DetailArticleI } from "@/interfaces/articles.interface";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { formatDateToIndonesian } from "@/utils/convert-date";
import Image from "next/image";

const DashboardDetail: React.FC = () => {
  const [article, setArticle] = useState<DetailArticleI>();
  const router = useRouter();
  const { id } = router.query;

  const getDetailArticle = async () => {
    try {
      const result = await detailArticle(id as string);
      setArticle(result);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDetailArticle();
  }, [id]);

  return (
    <Admin>
      <button onClick={() => router.back()} className="mb-4">
        &larr; kembali ke halaman
      </button>
      <div>
        {article?.data?.image === null || article?.data?.image === "" ? (
          <div className="aspect-video rounded-xl bg-gray-400 flex items-center justify-center">
            <div className="font-light text-gray-200">Image Not Uploaded</div>
          </div>
        ) : (
          <Image
            src={
              article?.data?.image !== null
                ? (article?.data?.image as string)
                : ""
            }
            alt="image-preview"
            height={1000}
            width={1000}
            className="aspect-video rounded-xl object-cover"
          />
        )}
        <h1 className="text-center text-lg font-semibold mt-3">
          {article?.data?.title}
        </h1>
        <p className="mb-3 text-center font-extralight text-sm">
          {formatDateToIndonesian(article?.data?.created_at as string)} -{" "}
          {article?.data?.username}
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: article?.data?.article as string }}
        ></div>
      </div>
    </Admin>
  );
};

export default DashboardDetail;
