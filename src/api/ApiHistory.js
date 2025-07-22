// import api from "./Axios";

// export const baseURL =
//   import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// const createEndpoint = ({ url, method }) => {
//   return async (data = {}, config = {}) => {
//     try {
//       const lowerMethod = method.toLowerCase();

//       if (["get", "delete"].includes(lowerMethod)) {
//         const response = await api[lowerMethod](url, {
//           params: data,
//           ...config,
//         });
//         return response;
//       }
//       const response = await api[lowerMethod](url, data, config);
//       return response.data; //je retourne directement data
//     } catch (error) {
//       console.error(`Erreur API [${method.toUpperCase()} ${url}]`, error);
//       throw error;
//     }
//   };
// };

// const ApiHistory = {
//   register: createEndpoint({ url: "/api/auth/register", method: "post" }),
//   login: createEndpoint({ url: "/api/auth/login", method: "post" }),
//   logout: createEndpoint({ url: "/api/auth/logout", method: "post" }),
//   home: createEndpoint({ url: "/api/courses/featcher", method: "get" }),
//   adminDel: createEndpoint({
//     url: "/api/admin/user",
//     method: "delete",
//   }),
// };

// export default ApiHistory;
// ApiHistory.js
import api from "./Axios";

const createEndpoint = ({ url, method }) => {
  return async (data = {}, config = {}) => {
    try {
      const lowerMethod = method.toLowerCase();
      const isGetLike = ["get", "delete"].includes(lowerMethod);

      const response = isGetLike
        ? await api[lowerMethod](url, { params: data, ...config })
        : await api[lowerMethod](url, data, config);

      return response.data;
    } catch (error) {
      console.error(`Erreur API [${method.toUpperCase()} ${url}]`, error);
      throw error;
    }
  };
};

const ApiHistory = {
  register: createEndpoint({ url: "/api/auth/register", method: "post" }),
  login: createEndpoint({ url: "/api/auth/login", method: "post" }),
  logout: createEndpoint({ url: "/api/auth/logout", method: "post" }),
  home: createEndpoint({ url: "/api/courses/featcher", method: "get" }),
  adminDel: createEndpoint({ url: "/api/admin/user", method: "delete" }),
};

export default ApiHistory;
