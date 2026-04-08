import { useMutation } from "@tanstack/react-query";
import apiClient, { LoginRequest, LoginResponse } from "@/lib/api-client";

export function useLoginMutation() {
  return useMutation<
    LoginResponse,
    Error,
    LoginRequest
  >({
    mutationFn: async (credentials: LoginRequest) => {
      const result = await apiClient.post<LoginResponse>(
        "/users/login",
        credentials
      );

      if (!result.success || !result.data?.token) {
        throw new Error(result.message || "Invalid response from server");
      }

      if (typeof window !== "undefined") {
        const token = result.data.token;

        // Store in localStorage for client-side use
        localStorage.setItem("auth_token", token);

        // Store in cookie so middleware can read it (server-side auth guard)
        document.cookie = `auth_token=${token}; path=/; SameSite=Lax`;
      }

      return result;
    },
    onError: (error: Error) => {
      console.error("Login failed:", error);
    },
    onSuccess: (data: LoginResponse) => {
      console.log("Login successful - JWT stored:", data.data.token);
    },
  });
}
