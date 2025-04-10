'use server'
import { cookies } from 'next/headers';

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

export async function getTokens(): Promise<Tokens> {
    const cookieStore = await cookies();
    return {
        accessToken: cookieStore.get('accessToken')?.value || '',
        refreshToken: cookieStore.get('refreshToken')?.value || '',
    };
}

export async function setAuthCookies(tokens: Tokens) {
    const cookieStore = await cookies();

    // Set cookies with appropriate options
    cookieStore.set('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 15 * 60, // 15 minutes for access token
    });

    cookieStore.set('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days for refresh token
    });
}

export async function clearAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
}