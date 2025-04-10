
import { getCategories } from '@/app/(home)/categories/actions/categories';
import CategoryList from './components/CategoryList';
import Link from 'next/link';
import { Button, Group, Stack } from '@mantine/core';
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>


export default async function CategoriesPage(props: {
    searchParams: SearchParams
}) {
    const searchParams = await props.searchParams
    const page = searchParams.page

    const { data } = await getCategories({
        page: page ? Number(page) : 1,
        limit: 3,
    });

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