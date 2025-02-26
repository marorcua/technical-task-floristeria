/** @format */

import { useEffect, useState } from 'react'
import { getProducts } from '../services/data'
import { Product } from '../types'
import ProductCard from '../components/ProductCard'
import Search from '../components/Search'
import { Link } from 'react-router'
import Spinner from '../components/Spinner'

function Home() {
  const [products, setProduct] = useState<Product[]>([])
  useEffect(() => {
    getProducts()
      .then((response) => setProduct(response))
      .catch((e) => console.log(e))
  }, [])

  return (
    <main className='bg-gray-700 mt-4 p-12 flex flex-wrap flex-row justify-end m-4'>
      <Search />
      {products.length === 0 ? (
        <Spinner />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <Link to={`/product/${product.id}`}>
              <ProductCard key={product.id} product={product} />
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

export default Home
