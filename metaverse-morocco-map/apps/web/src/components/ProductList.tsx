import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useCartStore } from '../store/cartStore'

interface Product { id: string; name: string; description: string | null; price_cents: number; image_url: string | null }

const ProductList: React.FC<{ cityId: string }> = ({ cityId }) => {
  const [products, setProducts] = useState<Product[]>([])
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    const sb = supabase
    const load = async () => {
      if (!sb) return
      const { data, error } = await sb
        .from('products')
        .select('id,name,description,price_cents,image_url,stores!inner(city_id)')
        .eq('stores.city_id', cityId)
      if (!error && data) {
        const mapped: Product[] = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          description: row.description,
          price_cents: row.price_cents,
          image_url: row.image_url,
        }))
        setProducts(mapped)
      }
    }
    load()
  }, [cityId])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border rounded p-3 bg-white/80">
          <div className="font-semibold">{p.name}</div>
          <div className="text-sm text-gray-600">{p.description}</div>
          <div className="mt-2 font-bold">${(p.price_cents/100).toFixed(2)}</div>
          <button
            className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded"
            onClick={() => addItem({ id: p.id, name: p.name, priceCents: p.price_cents, quantity: 1 })}
          >Add to cart</button>
        </div>
      ))}
    </div>
  )
}

export default ProductList
