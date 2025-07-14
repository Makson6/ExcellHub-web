import { create } from "zustand";

export const useAdminStore = create((set, get) => ({
  users: [],
  courses: [],
  tickets: [],

  // 📌 ----- USERS -----

  setUsers: (users) => set({ users }),

  addUser: (newUser) =>
    set((state) => ({
      users: [...state.users, newUser],
    })),

  updateUser: (id, updatedData) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedData } : user
      ),
    })),

  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),

  getUserById: (id) => get().users.find((user) => user.id === id),

  // 📌 ----- COURSES -----

  setCourses: (courses) => set({ courses }),

  updateCourseStatus: (id, status) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === id ? { ...course, status } : course
      ),
    })),

  removeCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    })),

  getCourseById: (id) => get().courses.find((course) => course.id === id),

  // 📌 ----- SUPPORT TICKETS -----

  setTickets: (tickets) => set({ tickets }),

  updateTicketStatus: (id, newStatus) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      ),
    })),

  getTicketById: (id) => get().tickets.find((ticket) => ticket.id === id),
}));
