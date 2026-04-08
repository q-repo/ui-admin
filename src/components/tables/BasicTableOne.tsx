"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import type { UserResponse } from "@/lib/api-client";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useUpdateUserStatus } from "@/hooks/useUpdateUserStatus";

interface BasicTableOneProps {
  data: UserResponse[];
  search?: string;
  filter?: "All" | "Active" | "Inactive" | "Pending";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Inline status dropdown per row
function StatusSelect({ user }: { user: UserResponse }) {
  const [isActive, setIsActive] = useState(user.is_active);
  const { mutate: updateStatus, isPending } = useUpdateUserStatus();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value === "active";
    setIsActive(newValue); // optimistic update
    updateStatus(
      { userId: user.id, payload: { is_active: newValue } },
      {
        onError: () => setIsActive(user.is_active), // revert on failure
      }
    );
  }

  return (
    <select
      value={isActive ? "active" : "inactive"}
      onChange={handleChange}
      disabled={isPending}
      className={`h-8 rounded-lg border px-2.5 text-xs font-medium shadow-theme-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition disabled:opacity-60 disabled:cursor-not-allowed
        ${isActive
          ? "border-success-300 bg-success-50 text-success-700 dark:border-success-600 dark:bg-success-500/10 dark:text-success-400"
          : "border-error-300 bg-error-50 text-error-700 dark:border-error-600 dark:bg-error-500/10 dark:text-error-400"
        }`}
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  );
}

// Delete button with confirmation modal
function DeleteButton({ user }: { user: UserResponse }) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteUser, isPending } = useDeleteUser();

  function handleDelete() {
    deleteUser(user.id, {
      onSuccess: () => setIsOpen(false),
    });
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-error-600 bg-error-50 hover:bg-error-100 dark:bg-error-500/10 dark:text-error-400 dark:hover:bg-error-500/20 transition"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => !isPending && setIsOpen(false)}
        showCloseButton={!isPending}
        className="max-w-md w-full mx-4 p-6"
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-error-50 dark:bg-error-500/10 mx-auto mb-4">
          <svg className="w-7 h-7 text-error-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        {/* Text */}
        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-1">
            Delete User
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {`${user.first_name} ${user.last_name}`.trim()}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="bg-error-500 hover:bg-error-600 disabled:bg-error-300"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Yes, Delete"}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default function BasicTableOne({ data, search = "", filter = "All" }: BasicTableOneProps) {
  const filteredData = data.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const matchesSearch =
      search.trim() === "" ||
      fullName.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);

    const isActive = user.is_active ? "Active" : "Inactive";
    const matchesFilter = filter === "All" || isActive === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-175">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-200 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  #
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Full Name
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Email
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Phone
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Status
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Verified
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Created At
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredData.length > 0 ? (
                filteredData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="px-5 py-4 text-start text-sm text-gray-400 dark:text-gray-500">
                      {user.id}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start">
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {`${user.first_name} ${user.last_name}`.trim()}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
                      {user.phone}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start">
                      <StatusSelect user={user} />
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start">
                      <Badge size="sm" color={user.is_verified ? "success" : "warning"}>
                        {user.is_verified ? "Verified" : "Unverified"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(user.created_at)}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start">
                      <DeleteButton user={user} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="px-5 py-8 text-center text-sm text-gray-400 dark:text-gray-500" colSpan={8}>
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}