import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import type { DeleteUserResponse } from "@/lib/api-client";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<DeleteUserResponse, Error, number>({
    mutationFn: (userId: number) =>
      apiClient.delete<DeleteUserResponse>(`/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
