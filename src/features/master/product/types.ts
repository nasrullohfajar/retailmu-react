import type { IPagination } from "../../../types/pagination";

interface ICategory {
  _id: string;
  name: string;
}

interface IStorage {
  _id: string;
  code: string;
}

export interface IProduct {
  _id: string;
  code: string;
  name: string;
  category: ICategory;
  price: number;
  storage: IStorage;
  [key: string]: unknown;
}

export interface IProductInput {
  code: string;
  name: string;
  category: string;
  price: number;
  storage: string;
}

export interface IProductResponse {
  success: boolean;
  message: string;
}

export interface IProductResponseAll extends IProductResponse {
  data: IProduct[];
  total: number;
  pagination: IPagination;
}

export interface IProductResponseDetail extends IProductResponse {
  data: IProduct;
}
