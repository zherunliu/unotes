import type { IArticle } from "@/types/article";
import request from "@/utils/axios";

export const postArticleApi = (data: IArticle) =>
  request.post("/article", data);

export const getArticleListApi = () => request.get("/article");
