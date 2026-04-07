"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { LoginRequest } from "@/lib/api-client";
import Button from "../ui/button/Button";
import Link from "next/link";
import Checkbox from "../form/input/Checkbox";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";

interface LoginFormProps {
  onSuccess?: () => void;
}

interface LoginFormData {
  username: string;
  password: string;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useLoginMutation();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const onSubmit = (data: LoginFormData) => {
    setGeneralError(null);

    // Determine if input is email, phone, or username
    const loginData: LoginRequest = {
      password: data.password,
      username: data.username,
    };

    // Check if it's an email (contains @)
    if (data.username.includes("@")) {
      loginData.username = data.username;
    } 
    // Check if it's a phone (contains only digits and allowed characters)
    else if (/^[\d+\-\s()]+$/.test(data.username)) {
      loginData.username = data.username;
    } 
    // Otherwise treat as email (fallback)
    else {
      loginData.username = data.username;
    }

    login(loginData, {
      onSuccess: (response) => {
        console.log("Login Success - API Response:", response);
        onSuccess?.();
        router.push("/");
      },
      onError: (err: Error) => {
        setGeneralError(err.message || "Login failed. Please try again.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {generalError && (
        <div className="p-3 rounded-lg bg-error-50 border border-error-200 text-error-700 text-sm dark:bg-error-900/20 dark:border-error-800 dark:text-error-400">
          {generalError}
        </div>
      )}
      <div>
        <Label>
          Username, Email or Phone <span className="text-error-500">*</span>{" "}
        </Label>
        <Input 
          {...register("username", {
            required: "Username, email or phone is required"
          })} 
          placeholder="Enter your username, email or phone" 
          type="text"
          error={!!errors.username}
        />
        {errors.username && <span className="text-error-500 text-sm mt-1 block">{errors.username.message}</span>}
      </div>
      <div>
        <Label>
          Password <span className="text-error-500">*</span>{" "}
        </Label>
        <div className="relative">
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            error={!!errors.password}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
          >
            {showPassword ? (
              <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
            ) : (
              <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
            )}
          </span>
        </div>
        {errors.password && <span className="text-error-500 text-sm mt-1 block">{errors.password.message}</span>}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox checked={isChecked} onChange={setIsChecked} />
          <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
            Keep me logged in
          </span>
        </div>
        <Link
          href="/reset-password"
          className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Forgot password?
        </Link>
      </div>
      <div>
        <Button className="w-full" size="sm" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </form>
  );
}
