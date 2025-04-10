'use server'

import { createData, deleteData, fetchData, updateData } from '@/utils';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export interface SubCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
    image: string;
}

const SUB_CATEGORY_CACHE_TAG = 'sub-categories';

export type SubCategoryResponse = {
    subCategories: SubCategory[];
    pagination: {
        totalCount: number;
        totalPages: number;
        currentPage: number;
    };
};

export async function getSubCategories() {
    return fetchData<SubCategoryResponse>('/sub-categories', {}, [SUB_CATEGORY_CACHE_TAG]);
}

export async function getSubCategory(id: string) {
    return fetchData<SubCategory>(`/sub-categories/${id}`, {}, [SUB_CATEGORY_CACHE_TAG, `category-${id}`]);
}

export async function createSubCategory(data: Omit<SubCategory, 'id'>) {
    const result = await createData<SubCategory>('/sub-categories', data, [SUB_CATEGORY_CACHE_TAG]);

    // Check if we need to redirect due to auth error
    if (!result.success && result.error?.details?.redirectTo) {
        redirect(result.error.details.redirectTo);
    }

    // If successful, force revalidation
    if (result.success) {
        revalidateTag(SUB_CATEGORY_CACHE_TAG);
    }
    return result

}


export async function updateSubCategory(id: string, data: Partial<SubCategory>) {
    // Explicitly pass the cache tags to invalidate
    const result = await updateData<SubCategory>(
        `/sub-categories/${id}`,
        data,
        'PATCH',
        [SUB_CATEGORY_CACHE_TAG, `category-${id}`]
    );

    // Force revalidation again to be sure
    revalidateTag(SUB_CATEGORY_CACHE_TAG);
    revalidateTag(`category-${id}`);

    return result;

}

export async function deleteSubCategory(id: string): Promise<void> {
    // Explicitly pass the cache tags to invalidate
    await deleteData(
        `/sub-categories/${id}`,
        [SUB_CATEGORY_CACHE_TAG, `category-${id}`]
    );

    // Force revalidation again to be sure
    revalidateTag(SUB_CATEGORY_CACHE_TAG);
    revalidateTag(`category-${id}`);
}