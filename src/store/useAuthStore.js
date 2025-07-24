import { create } from "zustand";
import api from "../api/Axios";

export const useAuthStore = create((set, get) => {
  let storedUser = null;
  try {
    const storedUserRaw = localStorage.getItem("user");
    if (storedUserRaw && storedUserRaw !== "undefined") {
      storedUser = JSON.parse(storedUserRaw);
    }
  } catch {
    storedUser = null;
  }

  return {
    user: storedUser,
    isAuthenticated: !!storedUser,
    isFetchingUser: false, // ✅ Protection ajoutée

    setUser: (nextUser) => {
      if (typeof nextUser === "function") {
        set((state) => {
          const computedUser = nextUser(state.user);
          if (
            typeof computedUser !== "object" ||
            Array.isArray(computedUser) ||
            computedUser === null
          ) {
            console.warn("setUser: résultat invalide", computedUser);
            localStorage.removeItem("user");
            return { user: null, isAuthenticated: false };
          }

          localStorage.setItem("user", JSON.stringify(computedUser));
          return { user: computedUser, isAuthenticated: true };
        });
      } else if (
        typeof nextUser === "object" &&
        !Array.isArray(nextUser) &&
        nextUser !== null
      ) {
        localStorage.setItem("user", JSON.stringify(nextUser));
        set({ user: nextUser, isAuthenticated: true });
      } else {
        console.warn("setUser: valeur invalide", nextUser);
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
      const { isFetchingUser } = get();
      if (isFetchingUser) return; // ✅ Ne pas rappeler si déjà en cours

      set({ isFetchingUser: true });
      try {
        const { data } = await api.get("/api/auth/me");
        localStorage.setItem("user", JSON.stringify(data));
        set({ user: data, isAuthenticated: true, isFetchingUser: false });
        return data;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
        localStorage.removeItem("user");
        set({ user: null, isAuthenticated: false, isFetchingUser: false });
        return null;
      }
    },
  };
});
