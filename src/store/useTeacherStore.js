import { create } from "zustand";

export const useTeacherStore = create((set, get) => ({
  courses: [],

  // 🟢 Initialise les cours depuis l'API
  setCourses: (courses) => {
    set({ courses });
  },

  // 🟢 Ajout d'un cours (utile après création côté backend)
  addCourse: (newCourse) =>
    set((state) => ({
      courses: [...state.courses, newCourse],
    })),

  // 🔍 Récupère un cours par ID
  getCourseById: (id) => {
    const courses = get().courses;
    return courses.find((course) => course.id === id);
  },

  // 🔄 Met à jour un cours (ex: modification du titre, etc.)
  updateCourse: (id, updatedData) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === id ? { ...course, ...updatedData } : course
      ),
    })),

  // ❌ Supprime un cours (utile dans le dashboard ou API delete)
  removeCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    })),
}));
