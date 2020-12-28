import React from 'react'

const Item = props => {
  const { id, cost, name, quantity } = props
  let total = parseFloat(cost) * parseInt(quantity)
  return (
    <div>
      <div>Name: {name}</div>
      <div>Cost: {cost}</div>
      <div>Quantity: {quantity}</div>
      <div>Total Cost: {total}</div>
    </div>
  )
}

export default Item
