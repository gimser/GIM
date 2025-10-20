
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import supecoLogo from './assets/logo';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-supeco-dark font-sans">
      <Dashboard />
    </div>
  );
};

export default App;
