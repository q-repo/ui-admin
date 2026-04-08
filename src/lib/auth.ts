import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Call inside a Server Component / layout to enforce authentication.
 * - requireAuth: true  → must have token (admin pages), redirects to /login if not
 * - requireAuth: false → must NOT have token (auth pages), redirects to / if already logged in
 */
export async function authGuard(requireAuth: boolean) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (requireAuth && !token) {
    // No token → not logged in → send to login
    redirect("/login");
  }

  if (!requireAuth && token) {
    // Has token → already logged in → send to dashboard
    redirect("/");
  }
}
