import type { IPagination } from "../../../types/pagination";

export interface ISupplier {
  _id: string;
  code: string;
  name: string;
  pic: string;
  phone: string;
  address: string;
  [key: string]: unknown;
}

export interface ISupplierInput {
  code: string;
  name: string;
  pic: string;
  phone: string;
  address: string;
}

export interface ISuplierResponse {
  success: boolean;
  message: string;
}

export interface ISupplierResponseAll extends ISuplierResponse {
  data: ISupplier[];
  total: number;
  pagination: IPagination;
}

export interface ISupplierResponseDetail extends ISuplierResponse {
  data: ISupplier;
}
