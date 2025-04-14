import { getCategory } from '@/app/(home)/categories/actions/categories';
import CategoryFormControl from '@/app/(home)/categories/components/CategoryFormControl';
import { InterceptedModal } from '@/components';
import React from 'react';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const InterceptedEditCategory = async (props: {
  searchParams: SearchParams;
}) => {
  const searchParams = await props.searchParams;
  const categoriId = searchParams.categoriId;
  const { data: category } = await getCategory(categoriId as string);

  return (
    <div>
      <InterceptedModal modalPath='/categories/edit'>
        <CategoryFormControl initialValues={category} />
      </InterceptedModal>
    </div>
  );
};

export default InterceptedEditCategory;
