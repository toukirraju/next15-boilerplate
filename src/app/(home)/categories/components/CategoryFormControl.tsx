
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory, updateCategory } from '../actions/categories';
import { CategoryForm } from './CategoryForm';
import { notifications } from '@mantine/notifications';
import { Box } from '@mantine/core';
import { ErrorList } from '@/components';
interface CategoryFormControllerProps {
    initialValues?: any;
}
export default function CategoryFormControl({
    initialValues,
}: CategoryFormControllerProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = async (values: any) => {
        setIsLoading(true);
        setError('');
        try {
            let result;
            if (initialValues?.id) {
                const updatedValues = {
                    name: values.name,
                    description: values.description,
                    icon: values.icon,
                    image: values.image,
                }
                // Update category if initialValues has an id
                result = await updateCategory(initialValues.id, updatedValues);

                if (!result.success) {
                    setError(result.error?.message || 'Failed to update category');
                    return;
                }

                notifications.show({
                    title: "Success!",
                    message: "Category updated successfully",
                    color: "green",
                });
            } else {
                // Create category if no initialValues id
                result = await createCategory(values);

                if (!result.success) {
                    setError(result.error?.message || 'Failed to create category');
                    return;
                }

                notifications.show({
                    title: "Success!",
                    message: "Category created successfully",
                    color: "green",
                });
            }

            router.push('/categories');
        } catch (error: any) {
            setError(error.message || (initialValues?.id ? 'Failed to update category' : 'Failed to create category'));
            notifications.show({
                title: "Error",
                message: initialValues?.id ? "Failed to update category" : "Failed to create category",
                color: "red",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box className="max-w-md mx-auto p-6  rounded-lg shadow-md">
            {error && (
                <ErrorList error={error} />
            )}

            <CategoryForm onSubmit={handleSubmit} initialValues={initialValues} isSubmitting={isLoading} />
        </Box>
    );
}

