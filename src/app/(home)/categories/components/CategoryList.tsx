'use client';
import {
    ActionIcon,
    Avatar,
    Button,
    Flex,
    Modal,
    Pagination,
    ScrollArea,
    Text,
    TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { Category, CategoryResponse, deleteCategory } from '../actions/categories';
import { ColumnConfig, DynamicList, Icon } from '@/components';
import { useRouter } from 'next/navigation';

const columns = [
    {
        header: 'Name',
        matcher: 'name',
        align: 'left',
        maxWidth: '200px',
    },
    {
        header: 'Description',
        matcher: 'description',
        align: 'left',
        // maxWidth: '150px',
        render: (value: string) => {
            return (
                <ScrollArea mah={50} scrollbars="y" >
                    <Text
                        size="sm"
                        ta={{
                            base: 'right',
                            md: 'left',
                        }}
                    >
                        {value}
                    </Text>
                </ScrollArea>
            );
        },
    },
    {
        header: 'Image',
        matcher: 'image',
        align: 'center',
        maxWidth: '200px',
        render: (value: string) => {
            return (
                <>
                    <Avatar radius={'sm'} src={value} alt="it's me" />
                </>
            );
        },
    },
    {
        header: 'Icon',
        matcher: 'icon',
        align: 'center',
        maxWidth: '200px',
        render: (value: string) => {
            return (
                <>
                    <Icon icon={value} className='h-8 w-8' />
                </>
            );
        },
    },
] as ColumnConfig[];

const CategoryList = (categoryResponse: CategoryResponse) => {
    const [page, setPage] = useState(1);
    const router = useRouter();

    const { categories, pagination } = categoryResponse || {};



    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        row: Category | null;
    }>({ isOpen: false, row: null });
    const [confirmationInput, setConfirmationInput] = useState('');

    const handleDeleteConfirmation = async () => {
        if (confirmationInput === deleteConfirmation.row?.name) {
            //delete category
            await deleteCategory(deleteConfirmation.row.id)
            setDeleteConfirmation({ isOpen: false, row: null });
            setConfirmationInput('');
        }
    };

    const handleEdit = (row: Category) => {
        router.push(`/categories/edit?categoriId=${row.id}`);
    }
    const renderActions = (row: Category) => {
        return (
            <Flex gap={'sm'}>
                <ActionIcon
                    color="blue"
                    onClick={() => handleEdit(row)}
                >
                    <Icon icon="mynaui:edit" />
                </ActionIcon>

                <ActionIcon
                    color="red"
                    onClick={() => setDeleteConfirmation({ isOpen: true, row })}
                >
                    <Icon icon="mynaui:delete" />
                </ActionIcon>
            </Flex>
        );
    };
    return (
        <div className="relative">

            <DynamicList
                data={categories || []}
                columns={columns}
                actions={renderActions}
                bordered
                rounded="lg"
                scrollTWHeight="h-[calc(100vh-220px)]"
            />
            {/* pagination */}
            {pagination && (
                <Pagination
                    total={pagination.totalPages}
                    value={page}
                    onChange={setPage}
                    size="sm"
                    radius="md"
                />
            )}

            {/* delete confirmation modal */}
            <Modal
                opened={deleteConfirmation.isOpen}
                onClose={() => setDeleteConfirmation({ isOpen: false, row: null })}
                title="Confirm Delete"
            >
                <p>
                    To confirm, type the title of the category:
                    <strong>{deleteConfirmation.row?.name}</strong>
                </p>
                <TextInput
                    placeholder="Enter category name to confirm"
                    value={confirmationInput}
                    onChange={(event) => setConfirmationInput(event.currentTarget.value)}
                    mt="md"
                />
                <Flex justify="end" mt="md">
                    <Button
                        color="red"
                        onClick={handleDeleteConfirmation}
                        disabled={confirmationInput !== deleteConfirmation.row?.name}

                    >
                        Delete
                    </Button>
                </Flex>
            </Modal>
        </div>
    );
};

export default CategoryList;