import React, { useState, useEffect } from "react";
import Admin from "@/containers/admin.container";
import {
  listArticlesFilter,
  deleteArticle,
  detailArticle,
} from "@/api/articles.api";
import { ArticlesParamsI, ListArticleI } from "@/interfaces/articles.interface";
import { toast } from "react-toastify";
import CardComponent from "@/components/index/card";
import { formatDateToIndonesian } from "@/utils/convert-date";
import { truncateText } from "@/utils/truncate-text";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useRouter } from "next/router";
import { extractFilename } from "@/utils/extract-file-name";
import { deleteFiles } from "@/api/upload-file.api";
import Swal from "sweetalert2";
import CardSkeleton from "@/components/index/card-skeleton";
import PaginationSkeleton from "@/components/index/pagination-skeleton";
import Pagination from "@/components/index/pagination";

interface CustomJwtPayload extends JwtPayload {
  username?: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<CustomJwtPayload | null>(null);
  const [params, setParams] = useState<ArticlesParamsI>({
    limit: 4,
    page: (router.query.page as unknown as number) ?? 1,
    search: "",
    searchby: "username",
    sort: "DESC",
    sortby: "created_at",
  });
  const [articles, setArticles] = useState<ListArticleI>();

  const getListArticles = async () => {
    try {
      const result = await listArticlesFilter(params);
      setArticles(result);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = (totalPages: number) => {
    if (params.page < totalPages) {
      const nextPage = Number(params?.page) + 1;
      setParams((prevParams) => ({ ...prevParams, page: nextPage }));
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: nextPage },
      });
    }
  };

  const handlePrevPage = () => {
    if (params.page > 1) {
      const prevPage = Number(params?.page) - 1;
      setParams((prevParams) => ({ ...prevParams, page: prevPage }));
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: prevPage },
      });
    }
  };

  const handleDeleteArticle = async (id: string) => {
    Swal.fire({
      title: "Mau delete artikel ini, yakin?🤔",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dd3333",
      cancelButtonColor: "#a5dc86",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Dihapus!👌",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(async () => {
          try {
            const detail = await detailArticle(id);
            if (detail?.code === 200) {
              const imagesToDelete = extractFilename(detail?.data?.image || "");
              if (imagesToDelete) {
                await deleteFiles([imagesToDelete]);
              }
              const response = await deleteArticle(id);
              if (response?.code === 204) {
                toast.success(response?.message);
                getListArticles();
              } else {
                toast.warning(response?.message);
              }
            }
          } catch (error: any) {
            toast.error(error?.message);
          }
        });
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded);
      } catch (error: any) {
        console.error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (user?.username) {
      setParams((prevParams) => ({
        ...prevParams,
        search: user.username,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (user?.username) {
      getListArticles();
    }
  }, [params]);

  return (
    <Admin>
      <div className="flex flex-col gap-5">
        {loading
          ? Array(4)
              .fill(null)
              .map((_, index) => <CardSkeleton key={index} />)
          : articles?.data?.list?.map((item, i) => {
              return (
                <div key={i} className="relative">
                  <div className="flex absolute top-0 p-2 gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/edit/${item.id}`)}
                    >
                      📝
                    </button>
                    <button onClick={() => handleDeleteArticle(item.id)}>
                      🚫
                    </button>
                  </div>
                  <CardComponent
                    id={item?.id}
                    image={item?.image}
                    title={truncateText(item?.title, 50)}
                    date={formatDateToIndonesian(item?.created_at)}
                    content={truncateText(item?.article, 200)}
                  />
                </div>
              );
            })}
        {loading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={params.page}
            totalPages={articles?.data?.pagination?.totalPage || 1}
            onPrevPage={handlePrevPage}
            onNextPage={() =>
              handleNextPage(articles?.data?.pagination?.totalPage as number)
            }
          />
        )}
      </div>
    </Admin>
  );
};

export default Dashboard;
