'use server'

import { createData, deleteData, fetchData, updateData } from '@/utils';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    image: string;
}

const CATEGORY_CACHE_TAG = 'categories';

export type CategoryResponse = {
    categories: Category[];
    pagination: {
        totalCount: number;
        totalPages: number;
        currentPage: number;
    };
};

export async function getCategories() {
    return fetchData<CategoryResponse>('/categories', {}, [CATEGORY_CACHE_TAG]);
}

export async function getCategory(id: string) {
    return fetchData<Category>(`/categories/${id}`, {}, [CATEGORY_CACHE_TAG, `category-${id}`]);
}

export async function createCategory(data: Omit<Category, 'id'>) {
    const result = await createData<Category>('/categories', data, [CATEGORY_CACHE_TAG]);

    // Check if we need to redirect due to auth error
    if (!result.success && result.error?.details?.redirectTo) {
        redirect(result.error.details.redirectTo);
    }

    // If successful, force revalidation
    if (result.success) {
        revalidateTag(CATEGORY_CACHE_TAG);
    }
    return result

}


export async function updateCategory(id: string, data: Partial<Category>) {
    // Explicitly pass the cache tags to invalidate
    const result = await updateData<Category>(
        `/categories/${id}`,
        data,
        'PATCH',
        [CATEGORY_CACHE_TAG, `category-${id}`]
    );

    // Force revalidation again to be sure
    revalidateTag(CATEGORY_CACHE_TAG);
    revalidateTag(`category-${id}`);

    return result;

}

export async function deleteCategory(id: string): Promise<void> {
    // Explicitly pass the cache tags to invalidate
    await deleteData(
        `/categories/${id}`,
        [CATEGORY_CACHE_TAG, `category-${id}`]
    );

    // Force revalidation again to be sure
    revalidateTag(CATEGORY_CACHE_TAG);
    revalidateTag(`category-${id}`);
}