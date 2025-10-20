/**
 * Auth.tsx
 * Simple authentication view using Supabase email/password.
 * Provides sign-in and sign-up modes with basic error handling.
 */
import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import supecoLogo from '../../assets/logo';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-supeco-dark">
      <div className="bg-supeco-gray p-8 rounded-lg shadow-2xl w-full max-w-md border border-supeco-light-gray">
        <div className="flex justify-center mb-6">{supecoLogo('text-white')}</div>
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="text-center text-gray-400 mb-8">Expiration Control Assistant</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-supeco-dark text-white border border-supeco-light-gray rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-supeco-yellow"
              placeholder="e.g., manager@supeco.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-supeco-dark text-white border border-supeco-light-gray rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-supeco-yellow"
              placeholder="******************"
              required
            />
          </div>
          {error && <p className="text-status-red text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-supeco-yellow text-supeco-gray font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-gray-300">
          {mode === 'signin' ? (
            <button className="underline" onClick={() => setMode('signup')}>Create an account</button>
          ) : (
            <button className="underline" onClick={() => setMode('signin')}>Already have an account? Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
