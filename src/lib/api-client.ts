import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

// Types
export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    page_size: number;
    total: number;
    total_page: number;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/user-service/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add token to headers if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError<ApiResponse>) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default apiClient;
