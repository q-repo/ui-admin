"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import UsersTableToolbar from "./components/UsersTableToolbar";
import CreateUserModal from "./components/CreateUserModal";
import { useGetUsers } from "@/hooks/useGetUsers";

export default function Users() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Inactive" | "Pending">("All");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const PAGE_SIZE = 10;

  const { data, isLoading, isError, error } = useGetUsers({ page, page_size: PAGE_SIZE });

  function handleCreateUser() {
    setIsModalOpen(true);
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark">
          {/* Toolbar: search, filter, create */}
          <UsersTableToolbar
            search={search}
            onSearchChange={(v) => { setSearch(v); setPage(1); }}
            filter={filter}
            onFilterChange={(v) => { setFilter(v); setPage(1); }}
            onCreateUser={handleCreateUser}
          />

          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-16 text-sm text-gray-400 dark:text-gray-500">
              <svg className="animate-spin mr-2 h-5 w-5 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Loading users...
            </div>
          )}

          {/* Error state */}
          {isError && !isLoading && (
            <div className="flex items-center justify-center py-16 text-sm text-red-500 dark:text-red-400">
              {(error as Error)?.message || "Failed to load users. Please try again."}
            </div>
          )}

          {/* Table */}
          {!isLoading && !isError && (
            <BasicTableOne
              data={data?.data ?? []}
              search={search}
              filter={filter}
            />
          )}

          {/* Pagination info */}
          {!isLoading && !isError && data?.meta && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
              <span>
                Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, data.meta.total)} of {data.meta.total} users
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-white/5 transition"
                >
                  Previous
                </button>
                <span className="px-2">
                  {page} / {data.meta.total_page}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.meta.total_page, p + 1))}
                  disabled={page >= data.meta.total_page}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-white/5 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
