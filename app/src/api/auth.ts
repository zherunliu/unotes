import request from "@/utils/axios";
import type { IUser } from "@/types/auth";
import type { IAuth } from "@/types/auth";

export const loginApi = (data: IUser) =>
  request.post<{
    token: string;
  }>("/auth/login", data);

export const registerApi = (data: IUser) =>
  request.post("/auth/register", data);

export const updatePasswordApi = (data: IAuth) => request.patch("/auth", data);
