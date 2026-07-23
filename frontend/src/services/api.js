import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// 1. Request Interceptor: Attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Format errors consistently for components
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returns structured JSON ({ success: false, errors: [...], message: "..." })
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    
    // Fallback for network issues or server down
    return Promise.reject({
      success: false,
      message: "Network or server error. Please try again.",
    });
  }
);

export default api;