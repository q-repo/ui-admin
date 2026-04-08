"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";
import { useCreateUser } from "@/hooks/useCreateUser";
import type { CreateUserRequest } from "@/lib/api-client";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "moderator", label: "Moderator" },
];

type FormData = CreateUserRequest;

export default function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      is_active: true,
      is_verified: false,
      role_name: "",
    },
  });

  const { mutate: createUser, isPending, error: mutationError, isSuccess } = useCreateUser();

  // Close & reset on success
  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess, reset, onClose]);

  function onSubmit(data: FormData) {
    createUser(data);
  }

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-lg w-full mx-4 p-6 sm:p-8">
      <h4 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white/90">
        Create New User
      </h4>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          {/* First Name + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                placeholder="First name"
                error={!!errors.first_name}
                hint={errors.first_name?.message}
                {...register("first_name", { required: "First name is required" })}
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                placeholder="Last name"
                error={!!errors.last_name}
                hint={errors.last_name?.message}
                {...register("last_name", { required: "Last name is required" })}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              error={!!errors.email}
              hint={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
              })}
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="text"
              placeholder="628xxxxxxxxxx"
              error={!!errors.phone}
              hint={errors.phone?.message}
              {...register("phone", { required: "Phone is required" })}
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              error={!!errors.password}
              hint={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
          </div>

          {/* Role */}
          <div>
            <Label htmlFor="role_name">Role</Label>
            <Select
              options={ROLE_OPTIONS}
              placeholder="Select a role"
              defaultValue={watch("role_name")}
              onChange={(val) => setValue("role_name", val, { shouldValidate: true })}
            />
            {errors.role_name && (
              <p className="mt-1 text-xs text-error-500">{errors.role_name.message}</p>
            )}
            {/* Hidden field for RHF validation */}
            <input
              type="hidden"
              {...register("role_name", { required: "Role is required" })}
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6 pt-1">
            <Switch
              label="Active"
              defaultChecked={watch("is_active")}
              onChange={(checked) => setValue("is_active", checked)}
            />
            <Switch
              label="Verified"
              defaultChecked={watch("is_verified")}
              onChange={(checked) => setValue("is_verified", checked)}
            />
          </div>

          {/* API error */}
          {mutationError && (
            <p className="text-sm text-error-500 dark:text-error-400">
              {mutationError.message}
            </p>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? "Creating..." : "Create User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
