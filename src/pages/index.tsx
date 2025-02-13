import React, { useState, useEffect } from "react";
import Container from "@/containers/page.container";
import { listArticlesFilter } from "@/api/articles.api";
import { ArticlesParamsI, ListArticleI } from "@/interfaces/articles.interface";
import { toast } from "react-toastify";
import CardComponent from "@/components/index/card";
import { formatDateToIndonesian } from "@/utils/convert-date";
import { truncateText } from "@/utils/truncate-text";
import { useRouter } from "next/router";
import CardSkeleton from "@/components/index/card-skeleton";
import Pagination from "@/components/index/pagination";
import PaginationSkeleton from "@/components/index/pagination-skeleton";

const Home: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [params, setParams] = useState<ArticlesParamsI>({
    limit: 4,
    page: (router.query.page as unknown as number) ?? 1,
    search: "",
    searchby: "title",
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

  useEffect(() => {
    getListArticles();
  }, [params]);

  return (
    <Container>
      <div className="flex flex-col gap-5">
        {loading
          ? Array(4)
              .fill(null)
              .map((_, index) => <CardSkeleton key={index} />)
          : articles?.data?.list?.map((item, i) => {
              return (
                <CardComponent
                  key={i}
                  id={item.id}
                  image={item.image}
                  title={truncateText(item.title, 50)}
                  date={formatDateToIndonesian(item.created_at)}
                  content={truncateText(item.article, 200)}
                />
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
    </Container>
  );
};

export default Home;
