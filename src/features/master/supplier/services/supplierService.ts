import type {
  ISupplierInput,
  ISupplierResponseAll,
  ISupplierResponseDetail,
} from "../types/supplier";
import axiosInstance from "../../../../api/axiosInstance";

export const supplierService = {
  create: async (payload: ISupplierInput): Promise<ISupplierResponseDetail> => {
    return await axiosInstance.post("/suppliers", payload);
  },

  getAll: async (params: {
    page?: number;
    search?: string;
    sortBy?: string;
    order?: string;
  }): Promise<ISupplierResponseAll> => {
    const response = await axiosInstance.get("/suppliers", { params });
    return {
      ...response,
      ...response.data,
    };
  },

  getById: async (id: string): Promise<ISupplierResponseDetail> => {
    return await axiosInstance.get(`/suppliers/${id}`);
  },

  update: async (
    id: string,
    payload: Partial<ISupplierInput>,
  ): Promise<ISupplierResponseDetail> => {
    return await axiosInstance.put(`/suppliers/${id}`, payload);
  },

  delete: async (id: string): Promise<ISupplierResponseDetail> => {
    return await axiosInstance.delete(`/suppliers/${id}`);
  },
};
