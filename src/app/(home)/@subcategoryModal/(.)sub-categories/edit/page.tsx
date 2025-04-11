import { getCategory } from '@/app/(home)/categories/actions/categories';
import CategoryFormControl from '@/app/(home)/categories/components/CategoryFormControl';
import { InterceptedModal } from '@/components';
import React from 'react';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const EditCategory = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const categoriId = searchParams.categoriId;
  const { data: category } = await getCategory(categoriId as string);

  return (
    <InterceptedModal>
      <CategoryFormControl initialValues={category} />
    </InterceptedModal>
  );
};

export default EditCategory;
