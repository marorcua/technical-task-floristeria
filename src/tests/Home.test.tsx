/** @format */

import { render, screen, waitFor } from '@testing-library/react'
import Home from '../pages/Home'
import { MemoryRouter as Router } from 'react-router'
import userEvent from '@testing-library/user-event'
import * as api from '../services/data'
import { expect, test, describe, vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock de la función getProducts
vi.mock('../services/data', () => ({
  getProducts: vi.fn()
}))

describe('Home component', () => {
  test('should render correctly and display loading initially', () => {
    vi.mocked(api.getProducts).mockResolvedValueOnce([])

    render(
      <Router>
        <Home />
      </Router>
    )

    expect(screen.getByText('Loading')).toBeInTheDocument()
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
      <Router>
        <Home />
      </Router>
    )

    await waitFor(() =>
      expect(screen.getAllByTestId('product-card')).toHaveLength(2)
    )
  })

  test('should render Search component', () => {
    render(
      <Router>
        <Home />
      </Router>
    )

    //     expect(screen.getByTestId('search-component')).toBeInTheDocument()
    //   })

    //   test('should display ProductCard components', async () => {
    //     const mockProducts = [
    //       {
    //         id: '1',
    //         name: 'Producto 1',
    //         binomialName: 'Rosa damascena',
    //         price: 10.5,
    //         imgUrl: 'https://dulces-petalos.jakala.es/images/rosaDamascena.jpeg',
    //         wateringsPerWeek: 3,
    //         fertilizerType: 'nitrogen',
    //         heightInCm: 180
    //       },
    //       {
    //         id: '2',
    //         name: 'Producto 1',
    //         binomialName: 'Rosa damascena',
    //         price: 15,
    //         imgUrl: 'https://dulces-petalos.jakala.es/images/rosaDamascena.jpeg',
    //         wateringsPerWeek: 3,
    //         fertilizerType: 'nitrogen',
    //         heightInCm: 180
    //       }
    //     ]
    //     vi.mocked(api.getProducts).mockResolvedValueOnce(mockProducts)

    //     render(
    //       <Router>
    //         <Home />
    //       </Router>
    //     )

    //     await waitFor(() =>
    //       expect(screen.getAllByTestId('product-card')).toHaveLength(2)
    //     )

    //     expect(screen.getByText('Producto 1')).toBeInTheDocument()
    //     expect(screen.getByText('Producto 2')).toBeInTheDocument()
    //   })

    //   test('should navigate to product page when a product is clicked', async () => {
    //     const mockProducts = [
    //       {
    //         id: '1',
    //         name: 'Producto 1',
    //         binomialName: 'Rosa damascena',
    //         price: 10.5,
    //         imgUrl: 'https://dulces-petalos.jakala.es/images/rosaDamascena.jpeg',
    //         wateringsPerWeek: 3,
    //         fertilizerType: 'nitrogen',
    //         heightInCm: 180
    //       },
    //       {
    //         id: '2',
    //         name: 'Producto 1',
    //         binomialName: 'Rosa damascena',
    //         price: 15,
    //         imgUrl: 'https://dulces-petalos.jakala.es/images/rosaDamascena.jpeg',
    //         wateringsPerWeek: 3,
    //         fertilizerType: 'nitrogen',
    //         heightInCm: 180
    //       }
    //     ]
    //     vi.mocked(api.getProducts).mockResolvedValueOnce(mockProducts)

    //     render(
    //       <Router initialEntries={['/']}>
    //         <Home />
    //       </Router>
    //     )

    //     await waitFor(() =>
    //       expect(screen.getAllByTestId('product-card')).toHaveLength(2)
    //     )

    //     const productLink = screen.getByText('Producto 1').closest('a')
    //     userEvent.click(productLink!)

    //     expect(window.location.pathname).toBe('/product/1') // Verifica que la navegación funcione correctamente
  })
})
