// Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
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

export interface Meta {
  page: number;
  page_size: number;
  total: number;
  total_page: number;
}

export interface UsersListResponse {
  success: boolean;
  message: string;
  data: UserResponse[];
  meta: Meta;
}

export interface LoginData {
  token: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}

export interface CreateUserRequest {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  is_active: boolean;
  is_verified: boolean;
  role_name: string;
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  data: UserResponse;
}

export interface UpdateUserStatusRequest {
  is_active: boolean;
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: UserResponse;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}

// Base URL
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:3000/user-service/api/v1";

// Build default headers
function buildHeaders(customHeaders?: HeadersInit): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(customHeaders as Record<string, string>),
  };

  if (typeof window !== "undefined") {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

// Handle 401 globally
function handleUnauthorized(status: number) {
  if (status === 401 && typeof window !== "undefined") {
    document.cookie = "auth_token=; path=/; Max-Age=0";
    window.location.href = "/auth/login";
  }
}

// Core fetch wrapper
async function fetchBaseQuery<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options.headers),
  });

  handleUnauthorized(response.status);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json?.message || json?.error || `Request failed with status ${response.status}`);
  }

  return json as T;
}

// HTTP method helpers
const apiClient = {
  get: <T>(path: string, options?: RequestInit) =>
    fetchBaseQuery<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body: unknown, options?: RequestInit) =>
    fetchBaseQuery<T>(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(path: string, body: unknown, options?: RequestInit) =>
    fetchBaseQuery<T>(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(path: string, body: unknown, options?: RequestInit) =>
    fetchBaseQuery<T>(path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string, options?: RequestInit) =>
    fetchBaseQuery<T>(path, { ...options, method: "DELETE" }),
};

export default apiClient;
