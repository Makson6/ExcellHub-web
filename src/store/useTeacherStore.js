import { create } from "zustand";

export const useTeacherStore = create((set, get) => ({
  courses: [],

  setCourses: (courses) => {
    set({ courses });
  },

  addCourse: (newCourse) =>
    set((state) => ({
      courses: [...state.courses, newCourse],
    })),

  getCourseById: (id) => {
    const courses = get().courses;
    return courses.find((course) => course.id === id);
  },

  updateCourse: (id, updatedData) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === id ? { ...course, ...updatedData } : course
      ),
    })),

  removeCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    })),
}));
