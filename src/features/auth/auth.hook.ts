import type { IAuth } from "./types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "./auth.service";
import { successAlert, errorAlert } from "../../utils/sweetalert";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IAuth) => authService.login(payload),

    onSuccess: (response) => {
      queryClient.setQueryData(["auth"], response);
      navigate("/dashboard");
      successAlert(response.message);
    },

    onError: (error: string) => {
      errorAlert("Login gagal", error);
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
      errorAlert("Logout gagal", error);
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
