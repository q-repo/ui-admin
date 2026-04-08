import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import type { UsersListResponse } from "@/lib/api-client";

export interface GetUsersParams {
  page?: number;
  page_size?: number;
}

async function fetchUsers(params: GetUsersParams): Promise<UsersListResponse> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.page_size) query.set("page_size", String(params.page_size));

  const qs = query.toString();
  return apiClient.get<UsersListResponse>(`/users${qs ? `?${qs}` : ""}`);
}

export function useGetUsers(params: GetUsersParams = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
  });
}
