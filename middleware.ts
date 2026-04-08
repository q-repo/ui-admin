import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './src/i18n/request';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

// Routes that require authentication (admin pages)
const PROTECTED_PATHS = ['/'];

// Routes that should be inaccessible when already authenticated (auth pages)
const AUTH_PATHS = ['/login'];

function getToken(request: NextRequest): string | undefined {
  return request.cookies.get('auth_token')?.value;
}

function isProtectedPath(pathname: string): boolean {
  // Strip locale prefix (e.g. /en/dashboard → /dashboard)
  const strippedPath = pathname.replace(/^\/(en|id)/, '') || '/';
  return PROTECTED_PATHS.some((p) => strippedPath === p || strippedPath.startsWith(`${p}/`));
}

function isAuthPath(pathname: string): boolean {
  const strippedPath = pathname.replace(/^\/(en|id)/, '') || '/';
  return AUTH_PATHS.some((p) => strippedPath === p || strippedPath.startsWith(`${p}/`));
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getToken(request);

  // 🔒 No token → trying to access protected admin page → redirect to login
  if (!token && isProtectedPath(pathname)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Has token → trying to access auth pages (login) → redirect to dashboard
  if (token && isAuthPath(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Otherwise, run next-intl middleware as normal
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except /api, /_next, /_vercel and static files
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
