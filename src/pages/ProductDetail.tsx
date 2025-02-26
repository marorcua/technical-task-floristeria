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
    <section
      className=' bg-gray-700 text-white shadow-lg 
rounded-2xl overflow-hidden mt-10 p-6 m-4'
    >
      <div className='text-end px-4 py-2 h-auto p-2 mb-4'>
        <Link
          to={'/'}
          className='bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 lg:w-80 border border-gray-300 '
        >
          ⬅ Volver
        </Link>
      </div>
      <div className='grid grid-cols-2 grid-rows-auto gap-16'>
        <img
          className='w-4xl object-contain rounded-lg h-120 transition-all delay-150 duration-600 ease-in-out hover:scale-105 '
          src={product.imgUrl}
          alt={product.name}
        />
        <div>
          <h2 className='text-2xl font-bold text-white'>
            {product.name}{' '}
            <span className='text-gray-400'>({product.binomialName})</span>
          </h2>
          <div className='mt-4 space-y-2'>
            <p className='text-lg'>
              <strong>💲 Precio:</strong> ${product.price}
            </p>
            <p className='text-lg'>
              <strong>💧 Riegos por semana:</strong> {product.wateringsPerWeek}
            </p>
            <p className='text-lg'>
              <strong>🌱 Fertilizante recomendado:</strong>{' '}
              {product.fertilizerType}
            </p>
            <p className='text-lg'>
              <strong>📏 Altura:</strong> {product.heightInCm} cm
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
