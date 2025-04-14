import { getCategories } from '@/app/(home)/categories/actions/categories';
import { getSubCategory } from '@/app/(home)/sub-categories/actions/sub-categories';
import SubCategoryFormControl from '@/app/(home)/sub-categories/components/SubCategoryFormControl';
import { InterceptedModal } from '@/components';
import React from 'react';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const EditCategory = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const subCategoriId = searchParams.subCategoriId;
  const page = searchParams.page;
  const { data } = await getCategories({});

  const { categories = [], pagination } = data || {};
  const { data: category } = await getSubCategory(subCategoriId as string);

  return (
    <InterceptedModal modalPath='/sub-categories/edit'>
      {' '}
      <SubCategoryFormControl
        initialValues={category}
        categories={categories}
      />
    </InterceptedModal>
  );
};

export default EditCategory;
