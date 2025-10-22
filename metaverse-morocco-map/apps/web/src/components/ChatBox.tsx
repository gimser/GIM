import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

interface Message { id: number; username: string | null; content: string; created_at: string }

const ChatBox: React.FC<{ cityId: string }> = ({ cityId }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!supabase) return
    let active = true
    const load = async () => {
      const { data } = await supabase
        .from('messages')
        .select('id,username,content,created_at')
        .eq('city_id', cityId)
        .order('created_at', { ascending: false })
        .limit(50)
      if (active && data) setMessages(data.reverse())
    }
    load()

    const channel = supabase
      .channel('chat:' + cityId)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `city_id=eq.${cityId}` },
        (payload) => {
          const row = payload.new as any
          setMessages((m) => [...m, { id: row.id, username: row.username, content: row.content, created_at: row.created_at }])
        }
      )
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [cityId])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase || !text.trim()) return
    const user = await supabase.auth.getUser()
    const username = user.data.user?.email?.split('@')[0] ?? 'guest'
    await supabase.from('messages').insert({ city_id: cityId, content: text.trim(), username })
    setText('')
  }

  if (!supabase) return (
    <div className="fixed left-4 bottom-4 w-80 bg-white/10 text-white rounded shadow-lg flex flex-col h-80 p-4">
      <div className="font-semibold mb-2">City chat</div>
      <div className="text-sm text-white/80">ربط Supabase مطلوب لتفعيل الدردشة الحية.</div>
    </div>
  )

  return (
    <div className="fixed left-4 bottom-4 w-80 bg-white/95 rounded shadow-lg flex flex-col h-80">
      <div className="px-3 py-2 font-semibold border-b">City chat</div>
      <div ref={listRef} className="flex-1 p-3 overflow-auto space-y-2">
        {messages.map((m) => (
          <div key={m.id} className="text-sm">
            <span className="font-medium">{m.username ?? 'anon'}:</span> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={send} className="p-2 border-t flex gap-2">
        <input className="flex-1 border rounded px-2 py-1" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Type a message" />
        <button className="px-2 py-1 bg-indigo-600 text-white rounded" type="submit">Send</button>
      </form>
    </div>
  )
}

export default ChatBox
