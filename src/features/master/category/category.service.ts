import type {
  ICategoryInput,
  ICategoryResponseAll,
  ICategoryResponseDetail,
} from "./types";
import axiosInstance from "../../../api/axiosInstance";

export const categoryService = {
  create: async (payload: ICategoryInput): Promise<ICategoryResponseDetail> => {
    return await axiosInstance.post("/categories", payload);
  },

  getAll: async (params: {
    page?: number;
    search?: string;
    sortBy?: string;
    order?: string;
  }): Promise<ICategoryResponseAll> => {
    const response = await axiosInstance.get("/categories", { params });
    return {
      ...response,
      ...response.data,
    };
  },

  getById: async (id: string): Promise<ICategoryResponseDetail> => {
    return await axiosInstance.get(`/categories/${id}`);
  },

  update: async (
    id: string,
    payload: Partial<ICategoryInput>,
  ): Promise<ICategoryResponseDetail> => {
    return await axiosInstance.put(`/categories/${id}`, payload);
  },

  delete: async (id: string): Promise<ICategoryResponseDetail> => {
    return await axiosInstance.delete(`/categories/${id}`);
  },
};
