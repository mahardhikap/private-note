import React, { useState } from "react";
import Admin from "@/containers/admin.container";
import { PostArticleI } from "@/interfaces/articles.interface";
import { deleteFiles, uploadFiles } from "@/api/upload-file.api";
import { toast } from "react-toastify";
import Image from "next/image";
import { createArticle } from "@/api/articles.api";
import { extractFilename } from "@/utils/extract-file-name";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { quilFormats, quilModules } from "@/data/quill.data";

const Post: React.FC = () => {
  const router = useRouter();
  const [dataArticle, setDataArticle] = useState<PostArticleI>({
    image: "",
    title: "",
    article: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDataArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const handlePostArticle = async () => {
    let imagePaths: string[] = [];
    try {
      if (files.length > 0) {
        const uploadResult = await uploadFiles(files);
        if (uploadResult) {
          imagePaths = uploadResult.filePaths;
          setDataArticle((prevData) => ({
            ...prevData,
            image: imagePaths[0],
          }));
        }
      }
      const result = await createArticle({
        ...dataArticle,
        image: imagePaths[0],
      });
      if (result?.code === 201) {
        toast.success(result?.message);
        router.replace("/dashboard");
      } else {
        toast.warning(result?.message);
        const filenamesToDelete = imagePaths
          .map(extractFilename)
          .filter((filename): filename is string => filename !== null);
        await deleteFiles(filenamesToDelete);
      }
    } catch (error: any) {
      toast.error(error?.message);
      if (imagePaths.length > 0) {
        const filenamesToDelete = imagePaths
          .map(extractFilename)
          .filter((filename): filename is string => filename !== null);
        await deleteFiles(filenamesToDelete);
      }
    }
  };

  return (
    <Admin>
      <div className="flex flex-col gap-2">
        <input
          type="file"
          onChange={handleUploadImage}
          className="hidden"
          id="fileUpload"
          accept="image/jpeg, image/png"
        />
        <label
          htmlFor="fileUpload"
          className="aspect-video bg-gray-400 rounded-xl flex justify-center items-center overflow-hidden"
        >
          {files.length > 0 ? (
            <Image
              src={URL.createObjectURL(files[0])}
              alt={files[0].name}
              className="object-cover h-full w-full rounded-xl"
              width={700}
              height={700}
            />
          ) : (
            <p className="text-xl text-gray-100">Upload Gambar</p>
          )}
        </label>
        <div>Judul Post</div>
        <input
          name="title"
          type="text"
          className="p-3 border-2 border-black rounded"
          placeholder="Isi judul post"
          value={dataArticle.title}
          onChange={handleChange}
          autoComplete="off"
        />
        <div>Artikel Post</div>
        <ReactQuill
          value={dataArticle.article}
          onChange={(value) =>
            setDataArticle({ ...dataArticle, article: value })
          }
          className="border-2 border-black rounded"
          modules={quilModules}
          formats={quilFormats}
        />
        <button
          className="bg-gray-400 text-gray-100 p-3 rounded font-semibold"
          onClick={handlePostArticle}
        >
          SUBMIT
        </button>
      </div>
    </Admin>
  );
};

export default Post;
