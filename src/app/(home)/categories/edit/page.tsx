import React from 'react'
import { getCategory } from '../actions/categories'
import CategoryFormControl from '../components/CategoryFormControl'
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>


const EditCategory = async (props: {
    searchParams: SearchParams
}) => {
    const searchParams = await props.searchParams
    const categoriId = searchParams.categoriId
    const { data: category } = await getCategory(categoriId as string)

    return (
        <div>
            <CategoryFormControl initialValues={category} />
        </div>
    )
}

export default EditCategory
