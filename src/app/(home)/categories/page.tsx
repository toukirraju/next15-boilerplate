
import { getCategories } from '@/app/(home)/categories/actions/categories';
import CategoryList from './components/CategoryList';
import Link from 'next/link';
import { Button, Group, Stack } from '@mantine/core';

export default async function CategoriesPage() {
    // This will use the cache tag system for data fetching
    const { data } = await getCategories();

    const { categories = [], pagination } = data || {}
    return (
        <Stack>
            <h1 className="text-2xl font-bold ">Categories</h1>
            <Group >
                <Button component={Link} href="/categories/create" >
                    Create Category
                </Button>
            </Group>

            {data && pagination && <CategoryList categories={categories} pagination={pagination} />}

        </Stack>
    );
}