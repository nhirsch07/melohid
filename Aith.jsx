
import React, { useState } from 'react';
import { supabase } from './supabase';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('worker');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              city,
              user_type: role
            }
          }
        });

        if (error) throw error;
        setMessage('Sikeres regisztráció! Ellenőrizd az e-mail-fiókodat.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
      }
    } catch (error) {
      setMessage(error.message || 'Hiba történt.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="logo">Meló<span>Híd</span></div>
        <p className="subtitle">Munka és lehetőség egy helyen</p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => setMode('login')}
          >
            Belépés
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : ''}
            onClick={() => setMode('register')}
          >
            Regisztráció
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <label>Teljes név</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Teljes neved"
              />

              <label>Település</label>
              <input
                value={city}
                onChange={e => setCity(e.target.value)}
                required
                placeholder="Hol keresel munkát?"
              />

              <label>Regisztráció típusa</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="worker">Munkavállaló</option>
                <option value="employer">Munkaadó</option>
              </select>
            </>
          )}

          <label>E-mail cím</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="pelda@email.hu"
          />

          <label>Jelszó</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength="6"
            placeholder="Legalább 6 karakter"
          />

          <button className="submit-button" disabled={loading}>
            {loading
              ? 'Kérlek várj...'
              : mode === 'login'
                ? 'Belépés'
                : 'Fiók létrehozása'}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
