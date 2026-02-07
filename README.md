# AutoExpress - Sistem za upravljanje prodajom luksuznih vozila

### IT354 - Veb Sistemi 1
**Univerzitet Metropolitan**

---

## O Projektu

AutoExpress je veb aplikacija razvijena kao projektni zadatak iz predmeta Veb Sistemi 1. Projekat predstavlja moderno softversko rešenje za digitalizaciju poslovanja auto-kuće specijalizovane za luksuzna vozila. Aplikacija je izgrađena koristeći React biblioteku, sa fokusom na modularnost, performanse i korisničko iskustvo (UX).

Arhitektura sistema podeljena je na klijentski deo (Frontend) koji komunicira sa REST API servisom (simuliran putem JSON Server-a), omogućavajući potpunu interakciju sa podacima u realnom vremenu.

## Funkcionalna Specifikacija

Sistem podržava dve uloge korisnika: **Posetioca/Registrovanog korisnika** i **Administratora**.

### Korisnički Modul
* **Katalog Vozila:** Prikaz dostupnih vozila u grid sistemu sa dinamičkim učitavanjem podataka.
* **Napredna Pretraga i Filtriranje:** Implementiran algoritam za filtriranje vozila po više kriterijuma istovremeno: marka, model, raspon cene (slider) i godina proizvodnje.
* **Detaljni Prikaz:** Zasebna stranica za svako vozilo koja sadrži galeriju slika, tehničke specifikacije i opis.
* **Integracija Eksternih Servisa:** Implementirana konverzija valuta u realnom vremenu (EUR u RSD) korišćenjem eksternog API-ja.
* **Interakcija i Recenzije:** Sistem za ostavljanje ocena i komentara, omogućen isključivo autentifikovanim korisnicima.
* **Lista Želja (Wishlist):** Mogućnost čuvanja vozila u listu omiljenih, perzistirano putem Local Storage-a pretraživača.
* **Kontakt Forma:** Sistem za slanje direktnih upita administraciji.

### Administrativni Modul
* **Kontrolna Tabla (Dashboard):** Grafički i numerički prikaz ključnih metrika (ukupan broj vozila, ukupna vrednost inventara).
* **Upravljanje Sadržajem (CRUD):** Potpuna kontrola nad inventarom – dodavanje novih vozila, ažuriranje postojećih informacija i trajno brisanje vozila iz baze.
* **Upravljanje Statusom:** Mogućnost arhiviranja (deaktivacije) oglasa bez brisanja iz baze.
* **Sistem Poruka:** Pregled i administracija korisničkih upita pristiglih putem kontakt formi.
* **Zaštita Ruta:** Implementacija "Protected Routes" mehanizma koji onemogućava pristup administrativnom panelu neovlašćenim licima.

## Tehnološki Stek

Projekat je realizovan korišćenjem sledećih tehnologija i biblioteka:

* **Osnova:** React 18 (Vite build tool)
* **Rutiranje:** React Router DOM v6
* **Stilizacija:** Styled Components (CSS-in-JS pristup sa implementacijom Glassmorphism dizajna)
* **Animacije i Tranzicije:** Framer Motion
* **Upravljanje Formama:** React Hook Form
* **Validacija Podataka:** Yup schema validation
* **HTTP Klijent:** Axios
* **Backend Simulacija:** JSON Server (REST API)
* **Testiranje:** Vitest, React Testing Library

## Uputstvo za Instalaciju i Pokretanje

Za pokretanje projekta na lokalnoj mašini, neophodno je imati instaliran **Node.js** okruženje.
Instalirajte sve neophodne biblioteke definisane u package.json fajlu: 
```bash
npm install
```

U zasebnom terminalu pokrenite simulirani REST API server (podrazumevani port 5000):
```bash
npx json-server --watch db.json --port 5000
```

U glavnom terminalu pokrenite razvojni server:
```bash
npm run dev
```

### Kloniranje repozitorijuma
Preuzmite izvorni kod projekta:
```bash
git clone <URL_REPOZITORIJUMA>
cd auto-express-pro