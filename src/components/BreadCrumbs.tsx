/** @format */

import { Link, useLocation } from 'react-router'

interface BreadcrumbItem {
  label: string
  path?: string
}

const Breadcrumbs: React.FC = () => {
  const loc = useLocation()
  const path =
    loc.pathname.split('/').filter((segment) => segment !== '')[0] || '/'

  let breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: 'product' },
    { label: 'Product Details', path: '' }
  ]

  const crumbs = breadcrumbItems.findIndex(
    (e: BreadcrumbItem) => e.path === path
  )

  breadcrumbItems = breadcrumbItems.slice(0, crumbs + 1)

  return (
    <nav aria-label='breadcrumb' className='bg-gray-800 p-3 rounded-lg'>
      <ol className='flex space-x-2'>
        {breadcrumbItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center ${
              index === breadcrumbItems.length - 1
                ? 'text-gray-500 pointer-events-none'
                : 'text-white-600'
            }`}
            aria-current={
              index === breadcrumbItems.length - 1 ? 'page' : undefined
            }
          >
            {item.path ? (
              <Link to={item.path} className='hover:underline'>
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < breadcrumbItems.length - 1 && (
              <span className='mx-2 text-gray-400'>/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
