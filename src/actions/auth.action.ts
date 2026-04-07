"use server";

import { cookies } from "next/headers";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    full_name: string;
    email: string;
    role: string;
    status: string;
  };
  error?: string;
}

/**
 * Server action for user login
 * Handles authentication and token storage in secure httpOnly cookies
 */
export async function loginAction(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1";

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || "Login failed",
      };
    }

    const data = await response.json();

    // Store token in httpOnly cookie for security
    if (data.token) {
      const cookieStore = await cookies();
      cookieStore.set("auth_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    return {
      success: true,
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    console.error("Login action error:", error);
    return {
      success: false,
      error: "An error occurred during login",
    };
  }
}

/**
 * Server action for user logout
 */
export async function logoutAction(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
    return { success: true };
  } catch (error) {
    console.error("Logout action error:", error);
    return { success: false };
  }
}
