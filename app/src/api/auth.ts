import request from "@/utils/axios";
import type { IUser } from "@/types/auth";

export const loginApi = (data: IUser) => request.post("/auth/login", data);

export const registerApi = (data: IUser) =>
  request.post("/auth/register", data);
