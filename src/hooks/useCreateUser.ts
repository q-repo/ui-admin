import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import type { CreateUserRequest, CreateUserResponse } from "@/lib/api-client";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation<CreateUserResponse, Error, CreateUserRequest>({
    mutationFn: (payload: CreateUserRequest) =>
      apiClient.post<CreateUserResponse>("/users", payload),
    onSuccess: () => {
      // Invalidate the users list so the table re-fetches automatically
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
