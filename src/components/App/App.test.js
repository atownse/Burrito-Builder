import React from 'react'
import '@testing-library/dom'
import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { getOrders, postOrder } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('App', () => {
  it('should render the page', async () => {
    getOrders.mockResolvedValue(
      { orders: [
        {"id":1,"name":"Pat","ingredients":["beans","lettuce","carnitas","queso fresco","jalapeno"]},
        {"id":2,"name":"Sam","ingredients":["steak","pico de gallo","lettuce","carnitas","queso fresco","jalapeno"]}
      ]
      }
    )
    render(
      <App />
    )

    const firstUser = await waitFor(() => screen.getByText('Pat'))

    expect(firstUser).toBeInTheDocument()
  })

  it('should post the order made upon load', () => {
    const orderHistory = [
      {"id":1,"name":"Pat","ingredients":["beans","lettuce","carnitas","queso fresco","jalapeno"]},
      {"id":2,"name":"Sam","ingredients":["steak","pico de gallo","lettuce","carnitas","queso fresco","jalapeno"]}
    ]
    getOrders.mockResolvedValueOnce(orderHistory)
    render(
      <App />
    )

    const name = screen.getByPlaceholderText('Name')
    const beanButton = screen.getByText('beans')
    const lettuceButton = screen.getByText('lettuce')
    const submitButton = screen.getByText('Submit Order')

    userEvent.type(name, 'John Smith')
    userEvent.click(beanButton)
    userEvent.click(lettuceButton)
    userEvent.click(submitButton)

    expect(name).toBeInTheDocument()

  })
})
