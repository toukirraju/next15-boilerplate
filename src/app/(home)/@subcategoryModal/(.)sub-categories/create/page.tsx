import { getCategories } from '@/app/(home)/categories/actions/categories';
import SubCategoryFormControl from '@/app/(home)/sub-categories/components/SubCategoryFormControl';
import { InterceptedModal } from '@/components';
import React from 'react';

const InterceptedCreateSubCategoryPage = async () => {
  const { data } = await getCategories();

  const { categories = [], pagination } = data || {};
  return (
    <div>
      <InterceptedModal>
        {' '}
        <SubCategoryFormControl categories={categories} />
      </InterceptedModal>
    </div>
  );
};

export default InterceptedCreateSubCategoryPage;
