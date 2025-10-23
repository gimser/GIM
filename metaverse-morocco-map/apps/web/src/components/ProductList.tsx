import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { NeonCard, Button } from '@mmm/shared/ui'
import { useCartStore } from '../store/cartStore'

interface Product { id: string; name: string; description: string | null; price_cents: number; image_url: string | null }

const ProductList: React.FC<{ cityId: string }> = ({ cityId }) => {
  const [products, setProducts] = useState<Product[]>([])
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
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

  if (!products.length) {
    return (
      <div className="text-white/80">لا توجد منتجات لهذه المدينة حالياً.</div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => (
        <NeonCard key={p.id}>
          <div className="font-semibold">{p.name}</div>
          <div className="text-sm text-white/80">{p.description}</div>
          <div className="mt-2 font-bold text-mmm-gold">${(p.price_cents/100).toFixed(2)}</div>
          <Button className="mt-2" onClick={() => addItem({ id: p.id, name: p.name, priceCents: p.price_cents, quantity: 1 })}>أضف إلى السلة</Button>
        </NeonCard>
      ))}
    </div>
  )
}

export default ProductList
