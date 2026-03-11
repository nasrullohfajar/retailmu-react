import type { IPagination } from "../../../types/pagination";

export interface ICategory {
  _id: string;
  code: string;
  name: string;
  description: string;
  [key: string]: unknown;
}

export interface ICategoryInput {
  code: string;
  name: string;
  description?: string;
}

export interface ICategoryResponse {
  success: boolean;
  message: string;
}

export interface ICategoryResponseAll extends ICategoryResponse {
  data: ICategory[];
  total: number;
  pagination: IPagination;
}

export interface ICategoryResponseDetail extends ICategoryResponse {
  data: ICategory;
}
