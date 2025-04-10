import { NavLink } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

const SideNav = () => {
  return (
    <div>
      <NavLink
        label="Dashboard"
        component={Link}
        href="/"
      />
      <NavLink
        label="Categories"
        component={Link}
        href="/categories"
      />
      <NavLink
        label="Sub Categories"
        component={Link}
        href="/sub-categories"
      />
      <NavLink
        label="Products"
        component={Link}
        href="/products"
      />

    </div>
  )
}

export default SideNav
