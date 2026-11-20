
import React, { useEffect, useState } from 'react';
import { supabase } from './supabase';
import Auth from './Auth';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
  }

  if (loading) {
    return <div className="loading">MelóHíd betöltése...</div>;
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>MelóHíd</h1>
        <span>Munka és lehetőség</span>
        <button onClick={logout}>Kilépés</button>
      </header>

      <main className="main">
        <h2>Üdvözlünk a MelóHídon!</h2>
        <p>
          Itt találkozhatnak a munkát keresők és a munkaadó cégek.
        </p>
        <div className="welcome-card">
          <h3>Sikeres bejelentkezés!</h3>
          <p>{session.user.email}</p>
        </div>
      </main>
    </div>
  );
}
