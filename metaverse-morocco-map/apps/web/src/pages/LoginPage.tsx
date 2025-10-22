import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Signed in')
  }

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Check your email to confirm')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="space-y-3" onSubmit={signIn}>
        <input className="border rounded w-full p-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="border rounded w-full p-2" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <div className="flex gap-2">
          <button type="submit" className="bg-indigo-600 text-white px-3 py-1 rounded">Sign in</button>
          <button type="button" onClick={signUp} className="bg-gray-600 text-white px-3 py-1 rounded">Sign up</button>
        </div>
      </form>
      {message && <div className="mt-3 text-sm text-gray-700">{message}</div>}
    </div>
  )
}

export default LoginPage
