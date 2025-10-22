import React from 'react'
import { useCartStore } from '../store/cartStore'

const Cart: React.FC = () => {
  const { items, removeItem, totalCents } = useCartStore()

  const checkout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((i) => ({ name: i.name, price: i.priceCents/100, quantity: i.quantity })),
        successUrl: window.location.origin + '/map',
        cancelUrl: window.location.href
      })
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white/95 rounded shadow-lg p-3 w-72">
      <div className="font-semibold mb-2">Cart</div>
      <div className="space-y-2 max-h-56 overflow-auto">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between text-sm">
            <div>
              <div className="font-medium">{i.name}</div>
              <div className="text-gray-600">x{i.quantity}</div>
            </div>
            <div className="text-right">
              <div>${((i.priceCents*i.quantity)/100).toFixed(2)}</div>
              <button className="text-red-600" onClick={() => removeItem(i.id)}>remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between font-semibold">
        <div>Total</div>
        <div>${(totalCents()/100).toFixed(2)}</div>
      </div>
      <button onClick={checkout} className="mt-2 w-full bg-green-600 text-white rounded py-2" disabled={items.length===0}>Checkout</button>
    </div>
  )
}

export default Cart
