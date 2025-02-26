/** @format */

import { Link } from 'react-router'

interface BreadcrumbItem {
  label: string
  path?: string
}

const breadcrumbItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Product Details', path: '' }
]

const Breadcrumbs: React.FC = () => {
  return (
    <nav aria-label='breadcrumb' className='bg-gray-800 p-3 rounded-lg'>
      <ol className='flex space-x-2'>
        {breadcrumbItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center ${
              index === breadcrumbItems.length - 1
                ? 'text-gray-500'
                : 'text-blue-600'
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
