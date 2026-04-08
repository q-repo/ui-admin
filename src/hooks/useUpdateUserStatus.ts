import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import type { UpdateUserStatusRequest, UpdateUserResponse } from "@/lib/api-client";

interface UpdateStatusVariables {
  userId: number;
  payload: UpdateUserStatusRequest;
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation<UpdateUserResponse, Error, UpdateStatusVariables>({
    mutationFn: ({ userId, payload }) =>
      apiClient.put<UpdateUserResponse>(`/users/${userId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
