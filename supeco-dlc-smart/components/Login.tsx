
import React, { useState } from 'react';
import supecoLogo from '../assets/logo';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('manager@supeco.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    } else {
      setError('Please enter your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-supeco-dark">
      <div className="bg-supeco-gray p-8 rounded-lg shadow-2xl w-full max-w-md border border-supeco-light-gray">
        <div className="flex justify-center mb-6">
          {supecoLogo('text-white')}
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-2">Manager Dashboard</h2>
        <p className="text-center text-gray-400 mb-8">Expiration Control Assistant</p>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Employee ID or Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-supeco-dark text-white border border-supeco-light-gray rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-supeco-yellow"
              placeholder="e.g., manager@supeco.com"
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
            />
          </div>
          {error && <p className="text-status-red text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-supeco-yellow text-supeco-gray font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
