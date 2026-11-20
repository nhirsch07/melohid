
import React, { useState } from 'react';
import { supabase } from './supabase';

export default function Auth() {
  const [mode, setMode] = useState('register');
  const [role, setRole] = useState('worker');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const { data, error } = await supabase.auth.signUp({
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

        setMessage(
          data.session
            ? 'Sikeres regisztráció!'
            : 'Regisztráció sikeres! Nézd meg az emailedet a megerősítéshez.'
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        setMessage('Sikeres belépés!');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth">
      <h2>{mode === 'register' ? 'Regisztráció' : 'Belépés'}</h2>

      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <>
            <label>Teljes név</label>
            <input required value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Teljes neved" />

            <label>Település</label>
            <input required value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Hol laksz?" />

            <label>Fiók típusa</label>
            <select value={role}
              onChange={e => setRole(e.target.value)}>
              <option value="worker">Munkavállaló</option>
              <option value="employer">Munkaadó / Cég</option>
            </select>
          </>
        )}

        <label>E-mail cím</label>
        <input type="email" required value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="pelda@email.hu" />

        <label>Jelszó</label>
        <input type="password" required minLength={6}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Legalább 6 karakter" />

        <button type="submit" disabled={loading}>
          {loading ? 'Kérlek várj...' :
            mode === 'register' ? 'Regisztráció' : 'Belépés'}
        </button>
      </form>

      {message && <p>{message}</p>}

      <button type="button" onClick={() => {
        setMode(mode === 'register' ? 'login' : 'register');
        setMessage('');
      }}>
        {mode === 'register'
          ? 'Már van fiókom – Belépés'
          : 'Még nincs fiókom – Regisztráció'}
      </button>
    </section>
  );
}
