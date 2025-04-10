import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import {
    TextInput,
    Button,
    Box,
    Group,
    Textarea,
    Select,
} from "@mantine/core";
import { Category } from "../../categories/actions/categories";

// Yup validation schema
const categorySchema = yup.object().shape({
    name: yup.string().required("Sub Category name is required"),
    description: yup.string().optional(),
    icon: yup.string().optional(),
    image: yup.string().optional(),
    categoryId: yup.string().required("Category ID is required"),
});

interface CategoryFormProps {
    onSubmit: (values: any) => void;
    initialValues?: any;
    isSubmitting?: boolean;
    categories: Category[]
}

export function SubCategoryForm({
    onSubmit,
    initialValues = {
        name: "",
        description: "",
        icon: "",
        image: "",
        categoryId: "",
    },
    isSubmitting = false,
    categories = [],
}: CategoryFormProps) {
    const form = useForm({
        initialValues,
        validate: yupResolver(categorySchema),
    });

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Select
                label="Select Category"
                placeholder="Select a category"
                data={categories.map((category: Category) => ({
                    value: category.id,
                    label: category.name,
                }))}
                {...form.getInputProps("categoryId")}
            />
            <TextInput
                withAsterisk
                label="Sub Category Name"
                placeholder="Enter sub category name"
                {...form.getInputProps("name")}
                className="mb-4"
            />

            <Textarea
                label="Description"
                placeholder="Enter category description"
                {...form.getInputProps("description")}
                className="mb-4"
                autosize
                minRows={3}
            />

            <TextInput
                label="Icon"
                placeholder="Enter category icon"
                {...form.getInputProps("icon")}
                className="mb-4"
            />

            <TextInput
                label="Image URL"
                placeholder="Enter category image URL"
                {...form.getInputProps("image")}
                className="mb-4"
            />

            <Group className="mt-8">
                <Button
                    type="submit"
                    loading={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                    {initialValues.name ? "Update Category" : "Create Category"}
                </Button>
            </Group>
        </form>
    );
}