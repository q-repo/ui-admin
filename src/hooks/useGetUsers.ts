import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import type { UsersListResponse } from "@/lib/api-client";

export interface GetUsersParams {
  page?: number;
  page_size?: number;
  search?: string;
  is_active?: boolean;
  sort_by?: string;
  sort_dir?: "asc" | "desc";
}

async function fetchUsers(params: GetUsersParams): Promise<UsersListResponse> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.page_size) query.set("page_size", String(params.page_size));
  if (params.search && params.search.trim() !== "") query.set("search", params.search.trim());
  if (params.is_active !== undefined) query.set("is_active", String(params.is_active));
  if (params.sort_by) query.set("sort_by", params.sort_by);
  if (params.sort_dir) query.set("sort_dir", params.sort_dir);

  const qs = query.toString();
  return apiClient.get<UsersListResponse>(`/users${qs ? `?${qs}` : ""}`);
}

export function useGetUsers(params: GetUsersParams = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
  });
}
