import axios from "axios";

const api = axios.create({
  baseURL:  import.meta.env.VITE_URL_BACKEND,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
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
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
    
export default api;