
import Link from 'next/link';
import { Button, Group, Stack } from '@mantine/core';
import { getSubCategories } from './actions/sub-categories';
import SubCategoryList from './components/SubCategoryList';

export default async function SubCategoriesPage() {
    // This will use the cache tag system for data fetching
    const { data } = await getSubCategories();
    const { subCategories = [], pagination } = data || {}

    return (
        <Stack>
            <h1 className="text-2xl font-bold ">Sub Categories (Brand)</h1>
            <Group >
                <Button component={Link} href="/sub-categories/create" >
                    Create Sub Category/Brand
                </Button>
            </Group>

            {data && pagination && <SubCategoryList subCategories={subCategories} pagination={pagination} />}

        </Stack>
    );
}