import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/create', '/conversations', '/reports'];

const bypassPath = '/unauthorized';
const publicPaths = ['/login', '/signup', '/forgot-password'];

// const apiEndpoint = 'http://localhost:8000/api/v1';
const apiEndpoint =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_BASE_BACKEND_LOCAL_API_URL
        : process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL;

async function fetchRefreshToken(refreshToken: string) {
    try {
        const response = await fetch(`${apiEndpoint}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) throw new Error('Refresh failed');

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

// Check if the user has admin role
function hasAdminRole(accessToken: string): boolean {
    try {
        // Simple way to parse JWT without a library
        const payload = JSON.parse(
            Buffer.from(accessToken.split('.')[1], 'base64').toString()
        );

        // Check if roles include 'admin'
        return payload?.roles?.includes('admin') || false;
    } catch (error) {
        return false;
    }
}

// Helper to clear auth cookies
function clearAuthCookies(response: NextResponse) {
    response.cookies.set('access_token', '', {
        maxAge: 0,
        path: '/',
    });
    response.cookies.set('refresh_token', '', {
        maxAge: 0,
        path: '/',
    });
    return response;
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Completely bypass middleware for unauthorized path
    if (pathname === bypassPath) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    const isProtectedPath = protectedPaths.some((path) =>
        pathname.startsWith(path)
    );
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    // If access token exists, check if user is admin
    if (accessToken) {
        const isAdmin = hasAdminRole(accessToken);

        // Non-admin user trying to access non-public path
        if (isAdmin && !isPublicPath) {
            // Clear cookies and redirect to unauthorized
            const response = NextResponse.redirect(new URL(bypassPath, request.url));
            return clearAuthCookies(response);
        }

        // Admin trying to access public path (like signin)
        if (!isAdmin && isPublicPath) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // No access token but has refresh token
    if (!accessToken && refreshToken) {
        // Try to refresh the token
        const tokens = await fetchRefreshToken(refreshToken);

        if (tokens) {
            // Check if new token is for admin
            const isAdmin = hasAdminRole(tokens.accessToken);

            // If not admin and trying to access protected path
            if (isAdmin && !isPublicPath) {
                // Clear cookies and redirect to unauthorized
                const response = NextResponse.redirect(
                    new URL(bypassPath, request.url)
                );
                return clearAuthCookies(response);
            }

            // Admin with refreshed token
            const response = isPublicPath
                ? NextResponse.redirect(new URL('/', request.url)) // Redirect to home if on public path
                : NextResponse.redirect(request.url); // Keep on same page otherwise

            // Set new cookies
            response.cookies.set('access_token', tokens.accessToken, {
                // secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 15 * 60, // 15 minutes
            });

            response.cookies.set('refresh_token', tokens.refreshToken, {
                // secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 7 * 24 * 60 * 60, // 7 days
            });

            return response;
        }
    }

    // Protected path with no valid tokens
    if (isProtectedPath && !accessToken) {
        const url = new URL('/signin', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // Default: allow access
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all paths except static files, api routes, and the unauthorized page
        '/((?!api|_next/static|_next/image|favicon.ico|unauthorized).*)',
    ],
};