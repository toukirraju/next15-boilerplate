'use server'

import { clearAuthCookies, setAuthCookies } from '@/utils';
import { redirect } from 'next/navigation';

const API_BASE_URL = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_BACKEND_LOCAL_API_URL
    : process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL;

type SignInData = {
    email: string;
    password: string;
};

type SignUpData = {
    email: string;
    password: string;
    name: string;
    // Add other fields as needed
};
export type AuthUser = {
    id: string;
    email: string;
    name?: string;
    // Add other user fields as needed
};

type AuthResponse = {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
};

export async function signIn(data: SignInData): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: 'no-store', // Make sure we don't cache auth requests
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                error: errorData.message || 'Invalid credentials'
            };
        }

        const authData: AuthResponse = await response.json();

        // Set authentication cookies directly within this server action
        await setAuthCookies({
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
        });

        return { success: true };
    } catch (error) {
        console.error('Sign in error:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}

export async function signUp(data: SignUpData): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                error: errorData.message || 'Registration failed'
            };
        }

        const authData: AuthResponse = await response.json();

        // Set authentication cookies directly within this server action
        setAuthCookies({
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
        });

        return { success: true };
    } catch (error) {
        console.error('Sign up error:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}

export async function signOut(): Promise<void> {
    clearAuthCookies();
    redirect('/login');
}