import React, { useState } from 'react'

interface ChatMessage { role: 'user' | 'assistant'; content: string }

const ExplorePage: React.FC = () => {
  const [cityId, setCityId] = useState('marrakech')
  const [eco, setEco] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('Best eco-friendly activities?')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim()) return
    const userMsg: ChatMessage = { role: 'user', content: input.trim() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)
    try {
      const r = await fetch('/api/guide', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityId, interests: eco ? ['eco'] : [], message: userMsg.content })
      })
      const data = await r.json()
      const assistant: ChatMessage = { role: 'assistant', content: data.answer ?? 'No answer' }
      setMessages((m) => [...m, assistant])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Explore</h1>
      <div className="flex items-center gap-2 flex-wrap">
        <select className="border rounded px-2 py-1" value={cityId} onChange={(e)=>setCityId(e.target.value)}>
          <option value="casablanca">Casablanca</option>
          <option value="rabat">Rabat</option>
          <option value="marrakech">Marrakech</option>
          <option value="fes">Fes</option>
          <option value="tangier">Tangier</option>
          <option value="agadir">Agadir</option>
        </select>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={eco} onChange={(e)=>setEco(e.target.checked)} /> Eco tips
        </label>
      </div>

      <div className="border rounded bg-white/80 p-3 max-w-3xl">
        <div className="space-y-3 max-h-80 overflow-auto">
          {messages.map((m, idx) => (
            <div key={idx} className={`p-2 rounded ${m.role==='user'?'bg-indigo-50':'bg-green-50'}`}>
              <div className="text-xs text-gray-500">{m.role}</div>
              <div>{m.content}</div>
            </div>
          ))}
          {loading && <div className="text-sm text-gray-500">Thinking…</div>}
        </div>
        <div className="mt-3 flex gap-2">
          <input className="flex-1 border rounded px-2 py-1" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask the guide" />
          <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={send} disabled={loading}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
