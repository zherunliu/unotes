import type { IProfile } from "@/types/user";
import request from "@/utils/axios";

export const getUserApi = () => request.get("/user");

export const updateUserApi = (data: IProfile) => request.patch("/user", data);

export const deleteUserApi = () => request.delete("/user");
