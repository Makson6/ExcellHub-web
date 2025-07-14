import { create } from "zustand";
import api from "../api/Axios";

export const useProgressStore = create((set, get) => ({
  completedChapters: {}, // { [courseId]: [chapterId, ...] }

  // ⚙️ Appelle le backend pour marquer comme terminé
  markChapterAsComplete: async (courseId, chapterId) => {
    try {
      await api.post(`/api/lesson-progress/${chapterId}/complete`);

      const current = get().completedChapters;
      const updated = {
        ...current,
        [courseId]: [...new Set([...(current[courseId] || []), chapterId])],
      };
      set({ completedChapters: updated });
    } catch (error) {
      console.error("Erreur progression backend:", error);
    }
  },

  // ⚙️ Vérifie en cache local puis fallback backend
  isChapterCompleted: async (courseId, chapterId) => {
    const local = get().completedChapters[courseId] || [];

    // Si déjà chargé localement
    if (local.includes(chapterId)) return true;

    try {
      const res = await api.get(`/api/lesson-progress/${chapterId}/status`);
      const { completed } = res.data;
      console.log(completed, "response:", res);

      if (completed) {
        // mettre à jour le store
        const current = get().completedChapters;
        const updated = {
          ...current,
          [courseId]: [...new Set([...(current[courseId] || []), chapterId])],
        };
        set({ completedChapters: updated });
      }

      return completed;
    } catch (error) {
      console.error("Erreur vérification progression:", error);
      return false;
    }
  },

  getCoursesWithProgress: () => {
    const all = get().completedChapters;
    return Object.entries(all).map(([courseId, chapters]) => ({
      courseId,
      completed: chapters.length,
    }));
  },
}));
