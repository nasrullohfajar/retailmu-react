import type { IPagination } from "../../../types/pagination";

export interface IStorage {
  _id: string;
  code: string;
  description: string;
  [key: string]: unknown;
}

export interface IStorageInput {
  code: string;
  description: string;
}

export interface IStorageResponse {
  success: boolean;
  message: string;
}

export interface ISupplierResponseAll extends IStorageResponse {
  data: IStorage[];
  total: number;
  pagination: IPagination;
}

export interface ISupplierResponseDetail extends IStorageResponse {
  data: IStorage;
}
