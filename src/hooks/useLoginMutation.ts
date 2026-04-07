import { useMutation } from "@tanstack/react-query";
import apiClient, { LoginRequest, LoginResponse, ApiResponse } from "@/lib/api-client";

export function useLoginMutation() {
  return useMutation<
    LoginResponse,
    Error,
    LoginRequest
  >({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        "/users/login",
        credentials
      );

      if (!response.data) {
        throw new Error("Invalid response from server");
      }

      // Save token to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", response.data.token);
      }

      return response.data;
    },
    onError: (error: Error) => {
      console.error("Login failed:", error);
    },
    onSuccess: (data: LoginResponse) => {
      console.log("Login successful:", data.user);
      // You can add additional logic here, like redirecting to dashboard
    },
  });
}
