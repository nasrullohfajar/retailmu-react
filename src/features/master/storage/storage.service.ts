import type {
  IStorageInput,
  ISupplierResponseAll,
  ISupplierResponseDetail,
} from "./types";
import axiosInstance from "../../../api/axiosInstance";

export const storageService = {
  create: async (payload: IStorageInput): Promise<ISupplierResponseDetail> => {
    return await axiosInstance.post("/storages", payload);
  },

  getAll: async (params: {
    page?: number;
    search?: string;
    sortBy?: string;
    order?: string;
  }): Promise<ISupplierResponseAll> => {
    const response = await axiosInstance.get("/storages", { params });
    return {
      ...response,
      ...response.data,
    };
  },

  getById: async (id: string): Promise<ISupplierResponseDetail> => {
    return await axiosInstance.get(`/storages/${id}`);
  },

  update: async (
    id: string,
    payload: Partial<IStorageInput>,
  ): Promise<ISupplierResponseDetail> => {
    return await axiosInstance.put(`/storages/${id}`, payload);
  },

  delete: async (id: string): Promise<ISupplierResponseDetail> => {
    return await axiosInstance.delete(`/storages/${id}`);
  },
};
