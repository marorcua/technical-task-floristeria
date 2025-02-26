/** @format */

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Product } from '../types'
import { getDeatil } from '../services/data'

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | undefined>(undefined)

  useEffect(() => {
    if (!id) return
    getDeatil({ id }).then((product) => setProduct(product))
  }, [])

  return !product ? (
    <div>Loading</div>
  ) : (
    <section className='w-full mx-auto bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden mt-10 p-6 flex flex-wrap flex-col content-center'>
      <Link
        to={'/'}
        className='bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 mb-4'
      >
        ⬅ Volver
      </Link>
      <h2 className='text-2xl font-bold text-white'>
        {product.name}{' '}
        <span className='text-gray-400'>({product.binomialName})</span>
      </h2>
      <img
        className='max-w-2xl h-64 object-cover mt-4 rounded-lg'
        src={product.imgUrl}
        alt={product.name}
      />
      <div className='mt-4 space-y-2'>
        <p className='text-lg'>
          <strong>💲 Precio:</strong> ${product.price}
        </p>
        <p className='text-lg'>
          <strong>💧 Riegos por semana:</strong> {product.wateringsPerWeek}
        </p>
        <p className='text-lg'>
          <strong>🌱 Fertilizante recomendado:</strong> {product.fertilizerType}
        </p>
        <p className='text-lg'>
          <strong>📏 Altura:</strong> {product.heightInCm} cm
        </p>
      </div>
    </section>
  )
}
