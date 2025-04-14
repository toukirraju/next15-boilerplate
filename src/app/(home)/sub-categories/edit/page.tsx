import React from 'react';
import { getCategories } from '../../categories/actions/categories';
import { getSubCategory } from '../actions/sub-categories';
import SubCategoryFormControl from '../components/SubCategoryFormControl';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const EditCategory = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const subCategoriId = searchParams.subCategoriId;
  const page = searchParams.page;
  const { data } = await getCategories({});

  const { categories = [], pagination } = data || {};

  const { data: subCategory } = await getSubCategory(subCategoriId as string);
  console.log(data, 'sub-cat');

  return (
    <div>
      <SubCategoryFormControl
        initialValues={subCategory}
        categories={categories}
      />
    </div>
  );
};

export default EditCategory;
