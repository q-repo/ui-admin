"use client";

import React, { useRef, useState } from "react";
import Button from "@/components/ui/button/Button";

type IsActiveOption = { label: string; value: boolean | undefined };

const IS_ACTIVE_OPTIONS: IsActiveOption[] = [
  { label: "All", value: undefined },
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

interface UsersTableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  isActive: boolean | undefined;
  onIsActiveChange: (value: boolean | undefined) => void;
  onCreateUser: () => void;
}

export default function UsersTableToolbar({
  search,
  onSearchChange,
  isActive,
  onIsActiveChange,
  onCreateUser,
}: UsersTableToolbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLabel = IS_ACTIVE_OPTIONS.find((o) => o.value === isActive)?.label ?? "All";

  function handleFilterSelect(value: boolean | undefined) {
    onIsActiveChange(value);
    setDropdownOpen(false);
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
      {/* Left: Search + Filter */}
      <div className="flex items-center gap-2 flex-1">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search users..."
            className="w-full h-10 pl-9 pr-4 text-sm bg-white border border-gray-300 rounded-lg outline-none focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h18M7 8h10M10 12h4"
              />
            </svg>
            <span>{isActive === undefined ? "Status" : activeLabel}</span>
            {isActive !== undefined && (
              <button
                onClick={(e) => { e.stopPropagation(); onIsActiveChange(undefined); }}
                className="ml-0.5 rounded-full hover:text-gray-700 dark:hover:text-white transition-colors"
                aria-label="Clear status filter"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 z-50 mt-1 w-36 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
              <ul className="p-1.5">
                {IS_ACTIVE_OPTIONS.map((option) => {
                  const isSelected = option.value === isActive;
                  return (
                    <li key={option.label}>
                      <button
                        onClick={() => handleFilterSelect(option.value)}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isSelected
                            ? "bg-brand-50 font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                        }`}
                      >
                        {isSelected ? (
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="w-3.5" />
                        )}
                        {option.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right: Create User button */}
      <Button
        size="sm"
        onClick={onCreateUser}
        startIcon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        }
      >
        Create User
      </Button>
    </div>
  );
}