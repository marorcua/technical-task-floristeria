/** @format */

import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { afterEach, describe, expect, test, vi } from 'vitest'
import * as api from '../services/data'
import { ProductDetail } from '../pages/ProductDetail'
import { Product } from '../types'
import '@testing-library/jest-dom'

vi.mock('../services/data', () => ({
  getDetail: vi.fn()
}))

describe('ProductDetail Component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('displays Spinner while loading', async () => {
    const neverResolvingPromise = new Promise<Product>(() => {})
    vi.mocked(api.getDetail).mockReturnValueOnce(neverResolvingPromise)

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    )

    const spinner = await screen.findByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })

  test('displays return button when loaded', async () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Producto 1',
      binomialName: 'Rosa damascena',
      price: 10.5,
      imgUrl: 'https://example.com/producto1.jpg',
      wateringsPerWeek: 3,
      fertilizerType: 'nitrogen',
      heightInCm: 180
    }

    vi.mocked(api.getDetail).mockResolvedValueOnce(mockProduct)

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Producto 1')).toBeInTheDocument()
    })

    const backLink = screen.getByRole('link', { name: /⬅ Volver/i })
    expect(backLink).toBeInTheDocument()
  })

  test('displays product details when loaded', async () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Producto 1',
      binomialName: 'Rosa damascena',
      price: 10.5,
      imgUrl: 'https://example.com/producto1.jpg',
      wateringsPerWeek: 3,
      fertilizerType: 'nitrogen',
      heightInCm: 180
    }

    vi.mocked(api.getDetail).mockResolvedValueOnce(mockProduct)

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Producto 1')).toBeInTheDocument()
    })

    expect(screen.getByText(/\(Rosa damascena\)/)).toBeInTheDocument()
    expect(screen.getByText(/\$10.5/)).toBeInTheDocument()
    expect(screen.getByText(/3/)).toBeInTheDocument()
    expect(screen.getByText(/nitrogen/)).toBeInTheDocument()
    expect(screen.getByText(/180 cm/)).toBeInTheDocument()
    const img = screen.getByRole('img', { name: 'Producto 1' })
    expect(img).toHaveAttribute('src', 'https://example.com/producto1.jpg')
  })

  test('displays "Product not found" if product is undefined', async () => {
    vi.mocked(api.getDetail).mockResolvedValueOnce(undefined)

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Product not found')).toBeInTheDocument()
    })
  })

  test('displays "Product not found" if no id parameter is provided', () => {
    render(
      <MemoryRouter initialEntries={['/product']}>
        <Routes>
          <Route path='/product' element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Product not found')).toBeInTheDocument()
    expect(api.getDetail).not.toHaveBeenCalled()
  })
})
