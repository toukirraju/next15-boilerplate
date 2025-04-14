import React from 'react';

import { InterceptedModal } from '@/components';
import CategoryFormControl from '@/app/(home)/categories/components/CategoryFormControl';

const InterceptedCreateCategoryPage = () => {
  return (
    <div>
      <InterceptedModal modalPath='/categories/create'>
        <CategoryFormControl />
      </InterceptedModal>
    </div>
  );
};

export default InterceptedCreateCategoryPage;
