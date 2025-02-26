/** @format */

import { useState } from 'react'

function Search({ handleSearch }: { handleSearch: (arg0: string) => void }) {
  return (
    <input
      type='text'
      placeholder='Buscar producto...'
      className='w-2xl p-2 mb-4 border border-gray-300 rounded-lg max-h-10'
      onChange={(e) => handleSearch(e.target.value)}
    />
  )
}

export default Search
