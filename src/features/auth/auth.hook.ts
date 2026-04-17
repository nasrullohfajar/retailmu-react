import type { IAuth } from "./types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authService } from "./auth.service";
import { successAlert } from "../../utils/sweetalert";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IAuth) => authService.login(payload),

    onSuccess: (response) => {
      queryClient.setQueryData(["auth"], response.data);
      successAlert(response.message);
      navigate("/dashboard");
    },

    onError: (error: string) => {
      Swal.fire({
        icon: "error",
        title: "Login gagal",
        text: error,
      });
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),

    onSuccess: () => {
      queryClient.clear();
      navigate("/login");
    },

    onError: (error: string) => {
      Swal.fire({
        icon: "error",
        title: "Logout gagal",
        text: error,
      });
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => authService.me(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
