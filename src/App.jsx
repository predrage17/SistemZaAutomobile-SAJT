// By: Predrag Savic 6153
import React, { useState } from 'react';
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
  min-height: 80vh;
`;

// --- ACCESS GATE (ZAŠTITA CELOG SAJTA) ---
const AccessGate = ({ children }) => {
  const [accessGranted, setAccessGranted] = useState(
    localStorage.getItem('site_access') === 'true'
  );
  const [pass, setPass] = useState("");

  const checkAccess = () => {
    // TVOJA ŠIFRA: riba17
    if (pass === "riba17") {
      setAccessGranted(true);
      localStorage.setItem('site_access', 'true');
    } else {
      alert("Pogrešan pristupni kod!");
    }
  };

  if (!accessGranted) {
    return (
      <div style={{
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        background: '#0a0a0c', 
        color: 'white',
        fontFamily: 'sans-serif'
      }}>
        <h1 style={{color: '#3b82f6', marginBottom: '10px', letterSpacing: '2px'}}>AUTOEXPRESS PRO</h1>
        <p style={{color: '#888', marginBottom: '20px'}}>Sistem je zaključan. Unesite kod za pristup:</p>
        <input 
          type="password" 
          placeholder="Lozinka..."
          onChange={(e) => setPass(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && checkAccess()}
          style={{
            padding: '12px', 
            borderRadius: '8px', 
            border: '1px solid #333', 
            background: '#1a1a1a', 
            color: 'white', 
            marginBottom: '20px',
            width: '250px',
            textAlign: 'center',
            fontSize: '1rem'
          }}
        />
        <button 
          onClick={checkAccess} 
          style={{
            padding: '12px 40px', 
            background: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: '0.3s'
          }}
        >
          OTKLJUČAJ
        </button>
      </div>
    );
  }

  return children;
};

// --- LOGIKA ZAŠTITE RUTA ---
const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

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
      {/* AccessGate obezbeđuje da se ništa ne vidi bez šifre riba17 */}
      <AccessGate>
        <ScrollToTop /> 
        <GlobalStyles />
        <Navbar />
        
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/car/:id" element={<CarDetails />} />
            
            <Route 
              path="/login" 
              element={
                <RedirectIfLoggedIn>
                  <Login />
                </RedirectIfLoggedIn>
              } 
            />

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

            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainContent>
        
        <Footer />
      </AccessGate>
    </BrowserRouter>
  );
}

export default App;