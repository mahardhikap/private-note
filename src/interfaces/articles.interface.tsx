export interface ListArticleI {
  code: number;
  message: string;
  data: DataArticleI;
}

export interface ArticlesParamsI {
  limit: number;
  page: number;
  search?: string;
  searchby?: string;
  sortby?: string;
  sort?: string;
}

export interface DataArticleI {
  list: List[];
  pagination: Pagination;
}

export interface List {
  id: string;
  image: string;
  title: string;
  article: string;
  created_at: string;
  user_id: string;
  username: string;
}

export interface Pagination {
  totalPage: number;
  totalData: number;
  pageNow: number;
}

export interface DetailArticleI {
  code: number;
  message: string;
  data: ArticleI;
}

export interface ArticleI {
  id: string;
  image: string;
  title: string;
  article: string;
  created_at: string;
  user_id: string;
  username: string;
}

export interface PostArticleI {
  image: string;
  title: string;
  article: string;
}
