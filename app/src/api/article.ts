import type { IArticle } from "@/types/article";
import request from "@/utils/axios";

export const postArticleApi = (data: IArticle) =>
  request.post("/article", data);

export const getArticleListApi = () => request.get("/article");

export const getArticleApi = (id: number) => request.get(`/article/${id}`);

export const updateArticleApi = (id: number, data: IArticle) =>
  request.patch(`/article/${id}`, data);

export const deleteArticleApi = (id: number) =>
  request.delete(`/article/${id}`);
