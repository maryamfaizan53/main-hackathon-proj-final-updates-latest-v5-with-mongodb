// /app/profile/page.tsx
"use client";

import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";

interface OrderDoc {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { user } = useUser()
  const [orders, setOrders] = useState<OrderDoc[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.email) {
      setLoading(false)
      return
    }

    // Query orders by userEmail
    const query = encodeURIComponent(`*[_type == "order" && userEmail == "${user.email}"]`)
    fetch(`/api/sanity?query=${query}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data.result || [])
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) {
    return <p>Please log in to view your profile</p>
  }

  if (loading) return <p>Loading orders...</p>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h1>
      <h2 className="text-xl font-semibold mb-2">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map(order => (
            <li key={order._id} className="border p-2 rounded-md">
              <p>Order #{order._id}</p>
              <p>Total: Rs. {order.total.toLocaleString()}</p>
              <p>Status: {order.status}</p>
              <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
