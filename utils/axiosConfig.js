import axios from "axios";

// Global error handler reference
let globalErrorHandler = null;

// Function to set the global error handler
export const setGlobalErrorHandler = (errorHandler) => {
  globalErrorHandler = errorHandler;
};

// Create axios instance
const api = axios.create({
  baseURL: "https://api.abroadium.com",
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add token to requests if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 403 errors globally
    if (error?.response?.status === 403 && globalErrorHandler) {
      globalErrorHandler.handle403Error();
      // Don't reject the promise to prevent further error handling
      return Promise.resolve({ data: null, handled: true });
    }

    // For other errors, let them be handled by individual components
    return Promise.reject(error);
  }
);

export default api;
