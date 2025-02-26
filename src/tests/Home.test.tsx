/** @format */

import { render, screen, waitFor } from '@testing-library/react'
import Home from '../pages/Home'
import { MemoryRouter, Route, Routes } from 'react-router'
import userEvent from '@testing-library/user-event'
import * as api from '../services/data'
import { expect, test, describe, vi } from 'vitest'
import '@testing-library/jest-dom'
import { ProductDetail } from '../pages/ProductDetail'

// Mock de la función getProducts
vi.mock('../services/data', () => ({
  getProducts: vi.fn(),
  getDetail: vi.fn()
}))

describe('Home component', () => {
  test('should render correctly and display loading initially', () => {
    vi.mocked(api.getProducts).mockResolvedValueOnce([])

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('should render Search component', () => {
    vi.mocked(api.getProducts).mockResolvedValueOnce([])
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByTestId('search-component')).toBeInTheDocument()
  })

  test('should display a list of products once fetched', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Producto 1',
        binomialName: 'Rosa damascena',
        price: 10.5,
        imgUrl: 'https://dulces-petalos.jakala.es/images/rosaDamascena.jpeg',
        wateringsPerWeek: 3,
        fertilizerType: 'nitrogen',
        heightInCm: 180
      },
      {
        id: '2',
        name: 'Producto 1',
        binomialName: 'Rosa damascena',
        price: 15,
        imgUrl: 'https://dulces-petalos.jakala.es/images/rosaDamascena.jpeg',
        wateringsPerWeek: 3,
        fertilizerType: 'nitrogen',
        heightInCm: 180
      }
    ]
    vi.mocked(api.getProducts).mockResolvedValueOnce(mockProducts)

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    await waitFor(() =>
      expect(screen.getAllByTestId('product-card')).toHaveLength(2)
    )
  })

  test('should navigate to product page when a product is clicked', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Producto 1',
        binomialName: 'Rosa damascena',
        price: 10.5,
        imgUrl: 'https://dulces-petalos.jakala.es/images/rosaDamascena.jpeg',
        wateringsPerWeek: 3,
        fertilizerType: 'nitrogen',
        heightInCm: 180
      },
      {
        id: '2',
        name: 'Producto 2',
        binomialName: 'Rosa damascena',
        price: 15,
        imgUrl: 'https://dulces-petalos.jakala.es/images/rosaDamascena.jpeg',
        wateringsPerWeek: 3,
        fertilizerType: 'nitrogen',
        heightInCm: 180
      }
    ]
    vi.mocked(api.getProducts).mockResolvedValueOnce(mockProducts)
    vi.mocked(api.getDetail).mockResolvedValueOnce(mockProducts[0])

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() =>
      expect(screen.getAllByTestId('product-card')).toHaveLength(2)
    )

    const productLink = screen.getByRole('link', { name: /Producto 1/i })
    await userEvent.click(productLink!)

    await waitFor(() =>
      expect(screen.getByText(/Producto 1/i)).toBeInTheDocument()
    )
  })
})
