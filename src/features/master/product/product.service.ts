import type {
  IProductInput,
  IProductResponseAll,
  IProductResponseDetail,
} from "./types";
import axiosInstance from "../../../api/axiosInstance";

export const productService = {
  create: async (payload: IProductInput): Promise<IProductResponseDetail> => {
    return await axiosInstance.post("/products", payload);
  },

  getAll: async (params: {
    page?: number;
    search?: string;
    sortBy?: string;
    order?: string;
  }): Promise<IProductResponseAll> => {
    const response = await axiosInstance.get("/products", { params });
    return {
      ...response,
      ...response.data,
    };
  },

  getById: async (id: string): Promise<IProductResponseDetail> => {
    return await axiosInstance.get(`/products/${id}`);
  },

  update: async (
    id: string,
    payload: Partial<IProductInput>,
  ): Promise<IProductResponseDetail> => {
    return await axiosInstance.put(`/products/${id}`, payload);
  },

  delete: async (id: string): Promise<IProductResponseDetail> => {
    return await axiosInstance.delete(`/products/${id}`);
  },
};
