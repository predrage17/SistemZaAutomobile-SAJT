// By: Predrag Savic 6153
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Application Entry Point (main.jsx)
 * * Ovo je glavna ulazna tačka React aplikacije.
 * * Ovde se React "kači" na DOM (Document Object Model) i pokreće renderovanje.
 * * * Proces:
 * 1. **Selektovanje korena**: Pronalazi HTML element sa id-jem `'root'` (koji se nalazi u `index.html`).
 * 2. **Kreiranje React korena**: Koristi `createRoot` (React 18+ API) za omogućavanje konkurentnog renderovanja.
 * 3. **Renderovanje**: Učitava `<App />` komponentu unutar tog elementa.
 * * * Komponente:
 * - `<StrictMode>`: Razvojni alat koji aktivira dodatne provere i upozorenja za potencijalne probleme u aplikaciji (npr. zastareli lifecycle metodi). Ne utiče na produkciju.
 * - `<App />`: Glavna komponenta koja sadrži svu logiku i rutiranje aplikacije.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)