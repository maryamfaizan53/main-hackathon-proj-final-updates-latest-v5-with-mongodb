/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useCart } from "../../context/CartContext";


const MyCart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-yellow-100 text-gray-600">
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Subtotal</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4 flex items-center gap-4">
                      <Image
                        src={item.image} 
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="p-4">Rs. {item.price.toLocaleString()}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-12 border rounded px-2 text-center"
                      />
                    </td>
                    <td className="p-4">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
            <div className="flex justify-between mb-4">
              <span>Subtotal:</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold mb-4">
              <span>Total:</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
            <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
              Check Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;



