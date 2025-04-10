import Link from 'next/link'
import React from 'react'

const DashboardPage = () => {
    return (
        <div>
            dashboard
            go to categori page
            <Link href="/dashboard/categories">categories</Link>
        </div>
    )
}

export default DashboardPage
