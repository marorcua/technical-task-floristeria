/** @format */

import { useEffect, useMemo, useRef, useState } from 'react'
import { getProducts } from '../services/data'
import { Product } from '../types'
import ProductCard from '../components/ProductCard'
import Search from '../components/Search'
import { Link } from 'react-router'
import Spinner from '../components/Spinner'

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const originalProducts = useRef<Product[]>([])
  const [filterProduct, setFilterProduct] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // getProducts()
    //   .then((response) => {
    //     originalProducts.current = response
    //     setProducts(response)
    //   })
    //   .catch((e) => console.log(e))
    //   .finally(() => setIsLoading(false))
  }, [])

  const filteredProducts = useMemo(
    () =>
      typeof filterProduct === 'string' && filterProduct.length > 0
        ? originalProducts.current.filter(
            (product) =>
              product.name
                .toLowerCase()
                .includes(filterProduct.toLowerCase()) ||
              product.binomialName
                .toLowerCase()
                .includes(filterProduct.toLowerCase())
          )
        : originalProducts.current,
    [filterProduct, originalProducts.current]
  )

  return (
    <main
      className={`bg-gray-700 mt-10 p-12 flex flex-wrap flex-row justify-end m-4 rounded-2xl ${
        isLoading ? 'content-baseline' : ''
      }`}
    >
      <div className='h-fit'>
        <Search handleSearch={setFilterProduct} />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='grid lg:grid-cols-[repeat(4,_minmax(100px,_1fr))] sm:grid-cols-2 md:grid-cols-3 gap-6 w-full'>
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
