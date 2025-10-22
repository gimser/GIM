import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AdminPage: React.FC = () => {
  const [stores, setStores] = useState<any[]>([])
  const [name, setName] = useState('')
  const [cityId, setCityId] = useState('marrakech')

  useEffect(() => {
    if (!supabase) return
    supabase.from('stores').select('*').then(({data}) => setStores(data ?? []))
  }, [])

  const addStore = async () => {
    if (!supabase || !name.trim()) return
    const { data, error } = await supabase.from('stores').insert({ name: name.trim(), city_id: cityId }).select('*').single()
    if (!error && data) setStores((s)=>[...s, data])
    setName('')
  }

  if (!supabase) return (
    <div className="p-6">Connect Supabase to use the admin dashboard.</div>
  )

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin</h1>
      <div className="flex gap-2">
        <input value={name} onChange={(e)=>setName(e.target.value)} className="border rounded px-2 py-1" placeholder="New store name" />
        <select className="border rounded px-2 py-1" value={cityId} onChange={(e)=>setCityId(e.target.value)}>
          <option value="casablanca">Casablanca</option>
          <option value="rabat">Rabat</option>
          <option value="marrakech">Marrakech</option>
          <option value="fes">Fes</option>
          <option value="tangier">Tangier</option>
          <option value="agadir">Agadir</option>
        </select>
        <button onClick={addStore} className="px-3 py-1 bg-indigo-600 text-white rounded">Add store</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {stores.map((s)=> (
          <div key={s.id} className="border rounded p-3 bg-white/80">
            <div className="font-semibold">{s.name}</div>
            <div className="text-xs text-gray-600">City: {s.city_id}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPage
