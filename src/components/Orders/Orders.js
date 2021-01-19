import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map(order => {
    return (
      <div key={Math.floor(Math.random() * 1000)} className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={Math.floor(Math.random() * 1000)}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;