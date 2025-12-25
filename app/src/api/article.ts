import type { IArticle } from "@/types/article";
import request from "@/utils/axios";

export const postArticle = (data: IArticle) => request.post("/article", data);
