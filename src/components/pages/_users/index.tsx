"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import UsersTableToolbar from "./components/UsersTableToolbar";
import CreateUserModal from "./components/CreateUserModal";
import { useGetUsers } from "@/hooks/useGetUsers";

type SortKey = "id" | "first_name" | "email" | "phone" | "is_active" | "is_verified" | "created_at";
type SortDir = "asc" | "desc";

export default function Users() {
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  const { data, isLoading, isError, error } = useGetUsers({
    page,
    page_size: pageSize,
    search: search.trim() || undefined,
    is_active: isActive,
    sort_by: sortKey,
    sort_dir: sortDir,
  });

  function handleCreateUser() {
    setIsModalOpen(true);
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <div className="rounded-2xl border p-4 gap-4 flex flex-col border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark">
          {/* Toolbar: search, filter, create */}
          <UsersTableToolbar
            search={search}
            onSearchChange={(v) => { setSearch(v); setPage(1); }}
            isActive={isActive}
            onIsActiveChange={(v) => { setIsActive(v); setPage(1); }}
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
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
          )}

          {/* Pagination */}
          {!isLoading && !isError && data?.meta && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <label htmlFor="page-size" className="whitespace-nowrap">Rows per page:</label>
                <select
                  id="page-size"
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                  className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  {[5, 10, 50, 100].map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <span className="hidden sm:inline">
                  Showing {((page - 1) * pageSize) + 1}–{Math.min(page * pageSize, data.meta.total)} of {data.meta.total}
                </span>
              </div>
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
