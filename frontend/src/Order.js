import React from 'react'
import Item from './Item'
const Order = props => {
  const { items, cost, date, email, id } = props
  return (
    <div>
      <div>My order email is {email}</div>
      <div>My order id is {id}</div>
      <div>My order cost is {cost}</div>
      <div>My Order Items</div>
      {items.map(item => (
        <Item id={item.id} name={item.name} quantity={item.quantity} cost={item.costPerItem} />
      ))}
    </div>
  )
}

export default Order
