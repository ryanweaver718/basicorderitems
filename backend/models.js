import dynamoose from 'dynamoose'
const OrderSchema = new dynamoose.Schema({
  id: {
    hashKey: true,
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
  },
  date: {
    type: String,
    required: true,
  },
})

const ItemSchema = new dynamoose.Schema({
  orderId: {
    type: String,
    required: true,
    hashKey: true,
  },
  id: {
    rangeKey: true,
    required: true,
    type: String,
  },
  name: String,
  quantity: Number,
  costPerItem: String,
})

export const OrderModel = dynamoose.model('orders-ryansapp-two', OrderSchema)
export const ItemModel = dynamoose.model('items-ryansapp-two', ItemSchema)
