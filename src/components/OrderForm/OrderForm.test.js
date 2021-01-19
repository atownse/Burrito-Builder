import React from 'react'
import '@testing-library/dom'
import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OrderForm from './OrderForm'
import { getOrders, postOrder } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('Form Component', () => {
  it('should render a name input and ingredient buttons upon load', () => {
    const mockAddOrder = jest.fn()
    render(
      <OrderForm addOrder={ mockAddOrder } />
    )
    const name = screen.getByPlaceholderText('Name')
    const beanButton = screen.getByText('beans')

    expect(name).toBeInTheDocument()
    expect(beanButton).toBeInTheDocument()
  }),

  it('should submit if parameters are correct', () => {
    const mockAddOrder = jest.fn()
    render(
      <OrderForm addOrder={ mockAddOrder }/>
    )
    const name = screen.getByPlaceholderText('Name')
    const beanButton = screen.getByText('beans')
    const lettuceButton = screen.getByText('lettuce')
    const submitButton = screen.getByText('Submit Order')

    userEvent.type(name, 'Samantha')
    userEvent.click(beanButton)
    userEvent.click(lettuceButton)
    userEvent.click(submitButton)

    expect(mockAddOrder).toHaveBeenCalledTimes(1)
    expect(mockAddOrder).toHaveBeenCalledWith({name: 'Samantha', ingredients: ['beans', 'lettuce']})
  })

  it('should not submit if the form is incomplete', () => {
    const mockAddOrder = jest.fn()
    render(
      <OrderForm addOrder={ mockAddOrder }/>
    )
    
    const submitButton = screen.getByText('Submit Order')
    userEvent.click(submitButton)
    expect(mockAddOrder).toHaveBeenCalledTimes(0)

    const name = screen.getByPlaceholderText('Name')
    userEvent.type(name, 'Samantha')
    userEvent.click(submitButton)
    expect(mockAddOrder).toHaveBeenCalledTimes(0)

    const beanButton = screen.getByText('beans')
    const lettuceButton = screen.getByText('lettuce')

    userEvent.type(name, 'Samantha')
    userEvent.click(beanButton)
    userEvent.click(lettuceButton)
    userEvent.click(submitButton)

    expect(mockAddOrder).toHaveBeenCalledTimes(1)
    expect(mockAddOrder).toHaveBeenCalledWith({name: 'Samantha', ingredients: ['beans', 'lettuce']})    
  })
})