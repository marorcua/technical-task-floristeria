/** @format */

import React from 'react'
import { Product } from '../types'

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <section
      className=' shadow-lg rounded-2xl p-4 flex flex-col items-center text-center bg-white 
    transition duration-500 ease-in-out grayscale hover:scale-105 hover:grayscale-0'
    >
      <img
        src={product.imgUrl}
        alt={product.name}
        className='w-full h-48 object-cover rounded-lg'
      />
      <h2 className='text-xl font-semibold mt-3'>{product.name}</h2>
      <p className='text-gray-500 italic'>{product.binomialName}</p>
      <p className='text-lg font-bold mt-2'>${product.price.toFixed(2)}</p>
    </section>
  )
}

export default ProductCard
