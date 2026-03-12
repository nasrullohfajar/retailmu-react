import type { ISupplierInput } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { supplierService } from "./supplier.service";
import { successAlert } from "../../../utils/sweetalert";

export const useGetSuppliers = (
  page: number,
  search: string,
  sortBy: string = "createdAt",
  order: string = "desc",
) => {
  return useQuery({
    queryKey: ["suppliers", page, search, sortBy, order],
    queryFn: async () => {
      const [data] = await Promise.all([
        supplierService.getAll({ page, search, sortBy, order }),
        new Promise((resolve) => setTimeout(resolve, 600)),
      ]);

      return data;
    },

    staleTime: 5 * 60 * 1000,
  });
};

export const useGetSupplierById = (id: string) => {
  return useQuery({
    queryKey: ["suppliers", id],
    queryFn: () => supplierService.getById(id),
    enabled: !!id,
  });
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ISupplierInput) => supplierService.create(payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
        exact: false,
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

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<ISupplierInput>;
    }) => supplierService.update(id, payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({
        queryKey: ["suppliers", response.data._id],
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

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => supplierService.delete(id),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
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
