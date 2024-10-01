import { Bookmark, Home, LucideIcon, Settings, SquarePen, Users } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active: boolean
}

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  submenus: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/',
          label: 'Home',
          active: pathname === '/',
          icon: Home,
          submenus: []
        }
      ]
    },
    {
      groupLabel: 'Products and categories',
      menus: [
        {
          href: '',
          label: 'Products',
          active: pathname.includes('/products'),
          icon: SquarePen,
          submenus: [
            {
              href: '/products',
              label: 'All Products',
              active: pathname === '/products'
            },
            {
              href: '/products/new',
              label: 'New Product',
              active: pathname === '/products/new'
            }
          ]
        },
        {
          href: '/categories',
          label: 'Categories',
          active: pathname.includes('/categories'),
          icon: Bookmark,
          submenus: []
        }
      ]
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/users',
          label: 'Users',
          active: pathname.includes('/users'),
          icon: Users,
          submenus: []
        },
        {
          href: '/account',
          label: 'Account',
          active: pathname.includes('/account'),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ]
}
