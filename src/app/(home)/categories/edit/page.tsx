import React from 'react';
import { getCategory } from '../actions/categories';
import CategoryFormControl from '../components/CategoryFormControl';
import { getMetaData } from '@/lib/metaData';
import { Metadata } from 'next';
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = getMetaData({ path: '/categories/edit' });

const EditCategory = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const categoriId = searchParams.categoriId;
  const { data: category } = await getCategory(categoriId as string);

  return (
    <div>
      <CategoryFormControl initialValues={category} />
    </div>
  );
};

export default EditCategory;
