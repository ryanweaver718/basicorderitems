import { v4 as uuid } from 'uuid'
import { response } from './helpers'
import { OrderModel, ItemModel } from './models'

export const deleteOrder = async ({ queryStringParameters }) => {
  const { id } = queryStringParameters
  await OrderModel.delete({ id })
  return response({ success: true })
}
export const updateOrderCost = async ({ body }) => {
  const { cost } = JSON.parse(body)
  await OrderModel.update({ id }, { cost })
  return response({ success: true })
}

export const getOrders = async ({ queryStringParameters }) => {
  const { email } = queryStringParameters
  let allOrders = await OrderModel.scan().exec()
  let orders = allOrders.filter(order => {
    if (order.email === email) {
      return true
    } else {
      return false
    }
  })
  for (let order of orders) {
    order.items = await ItemModel.query({
      orderId: order.id,
    }).exec()
  }

  return response({ orders })
}

export const createOrder = async ({ body }) => {
  const { email, items } = JSON.parse(body)
  let order = await OrderModel.create({
    id: uuid(),
    email,
    date: Date.now().toString(),
  })
  let createdItems = []
  let costOfAllItems = 0
  for (const item of items) {
    let dbItem = await ItemModel.create({
      id: uuid(),
      orderId: order.id,
      quantity: parseInt(item.quantity),
      costPerItem: item.costPerItem,
      name: item.name,
    })
    costOfAllItems += parseFloat(item.costPerItem) * parseInt(item.quantity)
    createdItems.push(dbItem)
  }
  order = await OrderModel.update(
    {
      id: order.id,
    },
    {
      cost: costOfAllItems,
    }
  )
  return response({ order, createdItems })
}
