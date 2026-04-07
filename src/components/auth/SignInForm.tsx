"use client";
import React from "react";
import { LoginForm } from "./LoginForm";

export default function SignInForm() {
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign In
          </h1>
        </div>
        <LoginForm
          onSuccess={() => {}}
        />
      </div>
    </div>
  );
}
