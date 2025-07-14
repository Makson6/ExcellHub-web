import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_URL || "http://192.168.186.163:3000",
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  withCredentials: true,
});
// console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.clear();
      // toast.error("User not connected");
    }
    // console.log(token?.valueOf);le status(403)
    //trouver comment renvoyer un msg au user si token non valide ou expirer
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
