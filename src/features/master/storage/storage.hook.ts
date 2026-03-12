import type { IStorageInput } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { storageService } from "./storage.service";
import { successAlert } from "../../../utils/sweetalert";

export const useGetStorages = (
  page: number,
  search: string,
  sortBy: string = "createdAt",
  order: string = "desc",
) => {
  return useQuery({
    queryKey: ["storages", page, search, sortBy, order],
    queryFn: async () => {
      const [data] = await Promise.all([
        storageService.getAll({ page, search, sortBy, order }),
        new Promise((resolve) => setTimeout(resolve, 600)),
      ]);

      return data;
    },

    staleTime: 5 * 60 * 1000,
  });
};

export const useGetStorageById = (id: string) => {
  return useQuery({
    queryKey: ["storages", id],
    queryFn: () => storageService.getById(id),
    enabled: !!id,
  });
};

export const useCreateStorage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IStorageInput) => storageService.create(payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["storages"],
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

export const useUpdateStorage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<IStorageInput>;
    }) => storageService.update(id, payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["storages"] });
      queryClient.invalidateQueries({
        queryKey: ["storages", response.data._id],
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

export const useDeleteStorage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => storageService.delete(id),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["storages"] });
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
