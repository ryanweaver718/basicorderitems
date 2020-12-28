import axios from 'axios'
import { useState } from 'react'
import Order from './Order'
function App() {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState([])
  const getOrders = async () => {
    let response = await axios.get(`http://127.0.0.1:5001/dev/orders?email=${email}`)
    console.log(response.data)
    setOrders(response.data.orders || [])
  }
  return (
    <div>
      <input placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
      <button disabled={email === ''} onClick={getOrders}>
        Get Orders
      </button>
      {orders.map(order => (
        <Order
          cost={order.cost || 0}
          date={order.date}
          id={order.id}
          items={order.items || []}
          email={order.email}
        />
      ))}
    </div>
  )
}

export default App
