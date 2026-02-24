import type { ICategoryInput } from "../types/category";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { categoryService } from "../services/categoryService";

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

      Swal.fire({
        icon: "success",
        text: response.message,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-right",
        width: "auto",
        customClass: {
          htmlContainer: "text-xs lg:text-sm whitespace-nowrap px-4",
          popup: "flex items-center",
        },
      });
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

      Swal.fire({
        icon: "success",
        text: response.message,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-right",
      });
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

      Swal.fire({
        icon: "success",
        text: response.message,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-right",
      });
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
