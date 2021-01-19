import React from 'react'
import '@testing-library/dom'
import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'
import OrderForm from './OrderForm'
import { getOrders, postOrder } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('Form Component', () => {
  it('should render a name input and ingredient buttons upon load', () => {
    const addOrder = jest.fn()
    render(
      <OrderForm addOrder={ addOrder } />
    )
    const name = screen.getByPlaceholderText('Name')
    const beanButton = screen.getByText('beans')

    expect(name).toBeInTheDocument()
    expect(beanButton).toBeInTheDocument()
  })

  it('should make sure the name input clears out upon submit', () => {

  })
})