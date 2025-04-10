import React from 'react'
import { getCategories } from '../../categories/actions/categories';
import SubCategoryFormControl from '../components/SubCategoryFormControl';

const CreateSubCategoryPage = async () => {
    const { data } = await getCategories();

    const { categories = [], pagination } = data || {}
    return (
        <div>
            <SubCategoryFormControl categories={categories} />
        </div>
    )
}

export default CreateSubCategoryPage
