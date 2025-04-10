
import { redirect } from 'next/navigation';
import { ApiError } from './errors';
import { getTokens, setAuthCookies, clearAuthCookies } from './cookie-services';



// Define mutex for preventing multiple refresh attempts
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

const API_BASE_URL = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_BACKEND_LOCAL_API_URL
    : process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL;

async function refreshToken(): Promise<boolean> {
    const tokens = await getTokens();

    if (!tokens.refreshToken) {
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: tokens.refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const newTokens = await response.json();
        setAuthCookies({
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
        });

        return true;
    } catch (error) {
        clearAuthCookies();
        return false;
    }
}

export async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    // Prepare the full URL
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    // Add authorization header
    const tokens = await getTokens();
    const headers = new Headers(options.headers);

    if (tokens.accessToken) {
        headers.set('Authorization', `Bearer ${tokens.accessToken}`);
    }

    // Execute the initial request
    let response = await fetch(fullUrl, {
        ...options,
        headers,
    });

    // Handle 401/403 responses with token refresh
    if (response.status === 401 || response.status === 403) {
        // Use the mutex pattern to prevent multiple refresh attempts
        if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refreshToken();
        }

        const refreshed = await refreshPromise;
        isRefreshing = false;
        refreshPromise = null;

        if (refreshed) {
            // Retry with new token
            const newTokens = await getTokens();
            headers.set('Authorization', `Bearer ${newTokens.accessToken}`);

            response = await fetch(fullUrl, {
                ...options,
                headers,
            });
        } else {
            // Clear cookies
            clearAuthCookies();

            // For server-side actions (server components), we need to throw a special error
            // that will be caught by our error handling middleware instead of redirecting directly
            if (typeof window === 'undefined' && options.method !== 'GET') {
                // Create an authentication error that will be handled by the caller
                throw new ApiError('Authentication failed. Please log in again.', 401, { redirectTo: '/login' });
            } else {
                // Redirect to login page for GET requests or client-side code
                redirect('/login');
            }

        }
    }

    return response;
}

// Helper function to handle API responses and extract errors
export async function handleApiResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new ApiError(
            errorData?.message || response.statusText,
            response.status,
            errorData
        );
    }

    return await response.json() as T;
}