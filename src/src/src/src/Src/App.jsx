import React from 'react';

export default function App() {
  return (
    <div>
      <header>
        <h1>🌉 MelóHíd</h1>
        <p>Munka és lehetőség egy helyen!</p>
        <nav>
          <button>Álláskeresőknek</button>
          <button>Munkaadóknak</button>
          <button>Belépés</button>
          <button>Regisztráció</button>
        </nav>
      </header>

      <main>
        <h2>Találd meg a következő munkahelyed!</h2>
        <p>Kapcsolat munkavállalók és munkaadók között.</p>

        <input placeholder="Milyen munkát keresel?" />
        <input placeholder="Település" />
        <button>Állások keresése</button>

        <h2>Munkaadóknak</h2>
        <p>Keress új munkatársakat egyszerűen!</p>
        <button>Álláshirdetés feladása</button>

        <h2>Miért a MelóHíd?</h2>
        <p>Egyszerű álláskeresés, külön céges felület és gyors jelentkezés.</p>
      </main>

      <footer>
        © 2026 MelóHíd
      </footer>
    </div>
  );
}
