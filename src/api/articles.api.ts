import { apiClient } from "@/utils/axios-setup";
import { toast } from "react-toastify";
import { ArticlesParamsI, PostArticleI } from "@/interfaces/articles.interface";

export const listArticlesFilter = async (params: ArticlesParamsI) => {
  try {
    const response = await apiClient.get("/articles/filtered", { params });
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const detailArticle = async (id: string) => {
  try {
    const response = await apiClient.get(`/article/${id}/detail`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const createArticle = async (data:PostArticleI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.post("/article/post", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const editArticle = async (id:string, data:PostArticleI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.put(`/article/${id}/edit`, data);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const deleteArticle = async (id:string) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await apiClient.delete(`/article/${id}/delete`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
