import type { IAuth, IAuthResponse, IAuthResponseLogin } from "./types";
import axiosInstance from "../../api/axiosInstance";

export const authService = {
  login: async (payload: IAuth): Promise<IAuthResponseLogin> => {
    return await axiosInstance.post("/auth/login", payload);
  },

  logout: async (): Promise<IAuthResponse> => {
    return await axiosInstance.post("auth/logout");
  },

  me: async (): Promise<IAuthResponseLogin> => {
    return await axiosInstance.get("users/me");
  },
};
