
import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import Auth from './components/views/Auth';
import supecoLogo from './assets/logo';
import { supabase } from './services/supabaseClient';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });
    supabase.auth.getSession().then(({ data }) => setIsAuthenticated(!!data.session?.user));
    return () => subscription.unsubscribe();
  }, []);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="flex h-screen bg-supeco-dark font-sans">
      <Dashboard />
    </div>
  );
};

export default App;
