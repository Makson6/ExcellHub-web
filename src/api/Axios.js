import axios from "axios";
import { baseURL } from "../config/config.js";

// Création de l'instance Axios
const api = axios.create({
  baseURL,
  withCredentials: false, // On n'utilise pas les cookies
});

// Intercepteur de requête : ajout du token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de réponse : gestion des erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Token invalide ou expiré
        localStorage.removeItem("accessToken");
        // Redirection vers la page de connexion
        window.location.href = "/login";
      }

      // Gère d'autres statuts si besoin, ex :
      // if (status === 403) { ... }
    }

    return Promise.reject(error);
  }
);

export default api;
