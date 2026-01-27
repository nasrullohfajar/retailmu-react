import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "applicateion/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error?.response?.data?.message || "Terjadi kesalahan pada server";
    return Promise.reject(message);
  },
);

export default axiosInstance;
