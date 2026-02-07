// By: Predrag Savic 6153
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyles } from './styles/global/GlobalStyles';

// Komponente layout-a
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Stranice
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import AdminMessages from './pages/AdminMessages';

// --- STILOVI ---
const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 80vh; /* Osigurava da footer ne skače gore na praznim stranicama */
`;

// --- LOGIKA ZAŠTITE RUTA ---

/**
 * ProtectedRoute: Proverava da li korisnik postoji u localStorage.
 * Ako je ruta rezervisana za ADMIN-a, proverava i ulogu.
 */
const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) return <Navigate to="/login" replace />;
  
  // Ako je prosleđen 'ADMIN' kao role, a korisnik je 'USER', vraćamo ga na početnu
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

/**
 * RedirectIfLoggedIn: Ako je korisnik već prijavljen, 
 * ne dozvoljavamo mu da ponovo ide na /login stranicu.
 */
const RedirectIfLoggedIn = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    const redirectPath = user.role === 'ADMIN' ? '/admin' : '/';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      {/* Resetuje scroll poziciju na vrh pri svakoj promeni rute */}
      <ScrollToTop /> 
      
      {/* Globalni CSS (reset, fontovi, varijable) */}
      <GlobalStyles />
      
      <Navbar />
      
      <MainContent>
        <Routes>
          {/* --- JAVNE RUTE --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/car/:id" element={<CarDetails />} />
          
          {/* LOGIN RUTA (Sa proverom da li je već ulogovan) */}
          <Route 
            path="/login" 
            element={
              <RedirectIfLoggedIn>
                <Login />
              </RedirectIfLoggedIn>
            } 
          />

          {/* --- ADMIN RUTE --- */}
          {/* Zaštićene tako da samo korisnik sa role: 'ADMIN' može da im pristupi */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="ADMIN">
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/messages" 
            element={
              <ProtectedRoute role="ADMIN">
                <AdminMessages />
              </ProtectedRoute>
            } 
          />

          {/* --- KORISNIČKE RUTE --- */}
          {/* Zaštićene tako da bilo koji ulogovani korisnik može da im pristupi */}
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />

          {/* FALLBACK: Ako korisnik ukuca nepostojeću rutu, vrati ga na Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainContent>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;