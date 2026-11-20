
import React, { useState } from 'react';
import Auth from './Auth.jsx';
import { supabase } from './supabase';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <div>
      <header>
        <h1>🌉 MelóHíd</h1>
        <p>Munka és lehetőség egy helyen!</p>

        <nav>
          <button onClick={() => setShowAuth(false)}>
            Főoldal
          </button>
          <button onClick={() => setShowAuth(true)}>
            Regisztráció / Belépés
          </button>
          {user && (
            <button onClick={logout}>Kilépés</button>
          )}
        </nav>
      </header>

      {showAuth ? (
        <Auth />
      ) : (
        <main>
          <h2>Találd meg a következő munkahelyed!</h2>
          <p>Kapcsolat munkavállalók és munkaadók között.</p>

          <button onClick={() => setShowAuth(true)}>
            Állást keresek
          </button>

          <button onClick={() => setShowAuth(true)}>
            Munkaadó vagyok
          </button>

          {user && <p>Sikeresen bejelentkeztél!</p>}

          <h2>Álláskeresőknek</h2>
          <p>Találd meg a hozzád illő munkát!</p>

          <h2>Munkaadóknak</h2>
          <p>Találd meg új munkatársaidat!</p>
        </main>
      )}

      <footer>© 2026 MelóHíd</footer>
    </div>
  );
}
