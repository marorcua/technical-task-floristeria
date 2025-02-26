/** @format */

import { Product } from '../types'

const API_URL = 'https://dulces-petalos.jakala.es'

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL + '/api/v1/product')
    const data: Product[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to fetch product data.')
  }
}

export async function getDeatil({ id }: { id: string }) {
  try {
    const response = await fetch(`${API_URL}/api/v1/product/${id}`)
    const data: Product = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to fetch product data.')
  }
}
