import type { IProductInput } from "./types";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "./product.service";
import { successAlert } from "../../../utils/sweetalert";

export const useGetProducts = (
  page: number,
  search: string,
  sortBy: string = "createdAt",
  order: string = "desc",
) => {
  return useQuery({
    queryKey: ["products", page, search, sortBy, order],
    queryFn: async () => {
      const [data] = await Promise.all([
        productService.getAll({ page, search, sortBy, order }),
        new Promise((resolve) => setTimeout(resolve, 600)),
      ]);
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productService.getById(id),
    enabled: !!id, //Query hanya berjalan jika ID tersedia
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IProductInput) => productService.create(payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: false,
      }); // refresh query

      successAlert(response.message);
    },

    onError: (error: string) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<IProductInput>;
    }) => productService.update(id, payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["products", response.data._id],
      });

      successAlert(response.message);
    },

    onError: (error: string) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      successAlert(response.message);
    },

    onError: (error: string) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    },
  });
};
