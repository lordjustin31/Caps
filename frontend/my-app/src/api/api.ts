// src/api/api.ts
import axios from "axios";

// Use environment variable for backend URL
const BASE_URL: string = import.meta.env.VITE_API_URL; // TypeScript safe

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers!["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
