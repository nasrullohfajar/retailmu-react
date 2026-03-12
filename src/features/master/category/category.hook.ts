import type { ICategoryInput } from "./types";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "./category.service";
import { successAlert } from "../../../utils/sweetalert";

export const useGetCategories = (
  page: number,
  search: string,
  sortBy: string = "createdAt",
  order: string = "desc",
) => {
  return useQuery({
    queryKey: ["categories", page, search, sortBy, order],
    queryFn: async () => {
      const [data] = await Promise.all([
        categoryService.getAll({ page, search, sortBy, order }),
        new Promise((resolve) => setTimeout(resolve, 600)),
      ]);
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id, //Query hanya berjalan jika ID tersedia
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICategoryInput) => categoryService.create(payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
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

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<ICategoryInput>;
    }) => categoryService.update(id, payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({
        queryKey: ["categories", response.data._id],
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

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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
