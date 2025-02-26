/** @format */

import { useEffect, useMemo, useRef, useState } from 'react'
import { getProducts } from '../services/data'
import { Product } from '../types'
import ProductCard from '../components/ProductCard'
import Search from '../components/Search'
import { Link } from 'react-router'
import Spinner from '../components/Spinner'
import { compareTwoStrings } from '../lib/utils'

function Home() {
  const originalProducts = useRef<Product[]>([])
  const [filterProduct, setFilterProduct] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getProducts()
      .then((response) => {
        originalProducts.current = response
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false))
  }, [])

  const filteredProducts = useMemo(
    () =>
      typeof filterProduct === 'string' && filterProduct.length > 0
        ? originalProducts.current.filter(
            (product) =>
              compareTwoStrings(product.name, filterProduct) ||
              compareTwoStrings(product.binomialName, filterProduct)
          )
        : originalProducts.current,
    [filterProduct, originalProducts.current]
  )

  return (
    <main
      className={`bg-gray-700 mt-10 p-12 flex flex-wrap flex-row justify-end m-4 rounded-2xl content-baseline`}
    >
      <div className='h-fit mb-4'>
        <Search handleSearch={setFilterProduct} />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='grid grid-cols-[repeat(auto-fill,_minmax(_220px,_1fr))] xl:grid-cols-4 gap-12 w-full'>
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard key={product.id} product={product} />
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

export default Home
