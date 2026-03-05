import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL:  import.meta.env.VITE_URL_BACKEND,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

    api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    api.interceptors.response.use(
      (response) => {
        console.log(
          `${response.config.method?.toUpperCase()} ${response.config.url}`,
          response.data
        );
        return response;
      },
      (error) => {
        if(error?.response?.status === 403) {
          toast.error(error.response?.data?.message || "Une erreur est survenue");
        }
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
    
export default api;