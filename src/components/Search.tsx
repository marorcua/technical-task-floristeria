/** @format */

import { useState } from 'react'

function Search() {
  const [search, setSearch] = useState('')
  return (
    <input
      type='text'
      placeholder='Buscar producto...'
      className='w-2xl p-2 mb-4 border border-gray-300 rounded-lg'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}

export default Search
