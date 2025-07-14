import { create } from "zustand";
import api from "../api/Axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => {
  let storedUser = null;
  try {
    const storedUserRaw = localStorage.getItem("user");
    if (storedUserRaw && storedUserRaw !== "undefined") {
      storedUser = JSON.parse(storedUserRaw);
    }
  } catch {
    storedUser = null;
  }

  const isAuthenticated = !!storedUser;
  if (storedUser === null) {
    toast.error("User not conneted");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("cookieToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("cookieToken");
  }

  return {
    user: storedUser,
    isAuthenticated,

    setUser: (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user, isAuthenticated: true });
      } else {
        localStorage.removeItem("user");
        set({ user: null, isAuthenticated: false });
      }
    },

    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user");
      localStorage.removeItem("cookieToken");
      set({ user: null, isAuthenticated: false });
    },

    vraiUser: async () => {
      try {
        const { data } = await api.get("/api/auth/me");
        localStorage.setItem("user", JSON.stringify(data));
        set({ user: data, isAuthenticated: true });
        return data;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
        localStorage.removeItem("user");
        set({ user: null, isAuthenticated: false });
        return null;
      }
    },
  };
});
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import api from "../api/Axios";
// import toast from "react-hot-toast";

// export const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       isAuthenticated: false,

//       setUser: (user) => {
//         if (user) {
//           set({ user, isAuthenticated: true });
//         } else {
//           set({ user: null, isAuthenticated: false });
//         }
//       },

//       logout: () => {
//         localStorage.removeItem("accessToken");
//         sessionStorage.removeItem("accessToken");
//         sessionStorage.removeItem("user");
//         localStorage.removeItem("cookieToken");
//         set({ user: null, isAuthenticated: false });
//       },

//       vraiUser: async () => {
//         try {
//           const { data } = await api.get("/api/auth/me");
//           set({ user: data, isAuthenticated: true });
//           return data;
//         } catch (error) {
//           console.error(
//             "Erreur lors de la récupération de l'utilisateur :",
//             error
//           );
//           set({ user: null, isAuthenticated: false });
//           return null;
//         }
//       },
//     }),
//     {
//       name: "auth", // Clé locale dans localStorage
//       partialize: (state) => ({
//         user: state.user,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     }
//   )
// );
