import { create } from 'zustand'

export interface CartItem { id: string; name: string; priceCents: number; quantity: number }

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clear: () => void
  totalCents: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((s) => {
    const existing = s.items.find((i) => i.id === item.id)
    if (existing) {
      return { items: s.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i) }
    }
    return { items: [...s.items, item] }
  }),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
  totalCents: () => get().items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)
}))
