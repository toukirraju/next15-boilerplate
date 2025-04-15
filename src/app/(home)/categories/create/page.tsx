import React from 'react';
import CategoryFormControl from '../components/CategoryFormControl';
import { Metadata } from 'next';
import { getMetaData } from '@/lib/metaData';

export const metadata: Metadata = getMetaData({
  title: 'create category',
  description: 'random',
});

const CreateCategoryPage = () => {
  return (
    <div>
      <CategoryFormControl />
    </div>
  );
};

export default CreateCategoryPage;
