'use server'

import { revalidateTag } from 'next/cache';
import { fetchWithAuth, handleApiResponse } from './fetch-services';
import { ApiError, ErrorDetails } from './errors';

type ResponseType<T> = {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        status: number;
        details?: ErrorDetails
        redirectTo?: string
    }
};

export async function fetchData<T>(
    endpoint: string,
    options: RequestInit = {},
    cacheTags?: string[]
): Promise<ResponseType<T>> {
    try {
        const response = await fetchWithAuth(endpoint, {
            ...options,
            cache: 'force-cache', // Ensure caching
            next: {
                revalidate: 3600, // Revalidate after 1 hour
                tags: cacheTags // Or use tags for on-demand revalidation
            }
        });

        const data = await handleApiResponse<T>(response);
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching data:', error);

        if (error instanceof ApiError) {
            // Check if this is an auth error that requires redirect
            if (error.status === 401 && error.details?.redirectTo) {
                // Return the redirect information so the caller can handle it
                return {
                    success: false,
                    error: {
                        message: error.message,
                        status: error.status,
                        details: error.details,
                        redirectTo: error.details.redirectTo
                    }
                };
            }

            return {
                success: false,
                error: {
                    message: error.message,
                    status: error.status,
                    details: error.details
                }
            };
        }

        return {
            success: false,
            error: {
                message: error instanceof Error ? error.message : 'Unknown error occurred',
                status: 500
            }
        };
    }
}

export async function createData<T>(
    endpoint: string,
    data: any,
    invalidateTags?: string[]
): Promise<ResponseType<T>> {
    const result = await fetchData<T>(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // Only invalidate cache tags if the request was successful
    if (result.success && invalidateTags && invalidateTags.length > 0) {
        invalidateTags.forEach(tag => revalidateTag(tag));
    }

    return result;
}

export async function updateData<T>(
    endpoint: string,
    data: any,
    method: 'PUT' | 'PATCH',
    invalidateTags?: string[]
): Promise<ResponseType<T>> {
    const result = await fetchData<T>(endpoint, {
        method: method = 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // Invalidate cache tags if provided
    if (invalidateTags && invalidateTags.length > 0) {
        invalidateTags.forEach(tag => revalidateTag(tag));
    }

    return result;
}

export async function deleteData(
    endpoint: string,
    invalidateTags?: string[]
): Promise<void> {
    await fetchData(endpoint, {
        method: 'DELETE',
    });

    // Invalidate cache tags if provided
    if (invalidateTags && invalidateTags.length > 0) {
        invalidateTags.forEach(tag => revalidateTag(tag));
    }
}

