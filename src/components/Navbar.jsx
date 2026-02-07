// By: Predrag Savic 6153
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCar, FaUserCircle, FaSignOutAlt, FaCog, FaShieldAlt, FaChevronDown, FaEnvelope } from 'react-icons/fa';

// Import stilova
import {
  Nav,
  NavContainer,
  Logo,
  CenterMenu,
  MenuLink,
  RightActions,
  ActionButton,
  UserDropdownTrigger,
  DropdownMenu,
  DropdownItem,
  LogoutItem
} from '../styles/components/Navbar';

/**
 * Navbar Component
 * * Glavna navigacija aplikacije.
 * * Funkcionalnosti:
 * 1. **Responsive Design**: Prilagođava se širini ekrana (sakriva centralni meni na mobilnim).
 * 2. **Scroll Effect**: Menja izgled (shadow) kada korisnik skroluje.
 * 3. **User Session**: Prikazuje različite opcije za goste, ulogovane korisnike i administratore.
 * 4. **Dropdown Menu**: Interaktivni meni za korisnička podešavanja i odjavu.
 * 5. **Role-Based Access**: Sakriva "Admin Panel" opciju za obične korisnike.
 * * @component
 * @returns {JSX.Element} Renderovan Navbar.
 */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Dohvatanje korisnika iz sesije
  const user = JSON.parse(localStorage.getItem('user'));
  
  // State za UI efekte
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Ref za detekciju klika van dropdown-a
  const dropdownRef = useRef(null);

  /**
   * Upravlja efektom skrolovanja i zatvaranjem dropdown-a na klik sa strane.
   */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Odjavljuje korisnika brisanjem sesije i preusmeravanjem na login.
   */
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsDropdownOpen(false);
    navigate('/login');
  };

  /**
   * Proverava da li je data putanja trenutno aktivna (za stilizovanje linkova).
   */
  const isActive = (path) => location.pathname === path;

  return (
    <Nav $scrolled={scrolled}>
      <NavContainer>
        {/* LOGO */}
        <Logo to="/about">
          <FaCar /> Auto<span>Express</span>
        </Logo>

        {/* CENTRALNI MENI */}
        <CenterMenu>
          <MenuLink to="/" $active={isActive('/')}>Ponuda Vozila</MenuLink>
          
          {/* Prikazujemo "Kontakt" samo ako user NIJE admin (ili nije ulogovan) */}
          {(!user || user.role !== 'ADMIN') && (
            <MenuLink to="/contact" $active={isActive('/contact')}>Kontakt</MenuLink>
          )}
        </CenterMenu>

        {/* DESNI DEO (LOGIN / USER MENU) */}
        <RightActions ref={dropdownRef}>
          {user ? (
            <>
              {/* ULOGOVAN KORISNIK */}
              <UserDropdownTrigger onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <FaUserCircle />
                <span>{user.username}</span>
                <FaChevronDown 
                  style={{ 
                    fontSize: '0.7rem', 
                    color: '#888', 
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition: '0.3s' 
                  }} 
                />
              </UserDropdownTrigger>

              {isDropdownOpen && (
                <DropdownMenu>
                  {/* ADMIN OPCIJE */}
                  {user.role === 'ADMIN' && (
                    <>
                      <DropdownItem to="/admin" onClick={() => setIsDropdownOpen(false)}>
                        <FaShieldAlt style={{color: '#10b981'}} /> Admin Panel
                      </DropdownItem>
                      <DropdownItem to="/admin/messages" onClick={() => setIsDropdownOpen(false)}>
                        <FaEnvelope style={{color: '#f59e0b'}} /> Poruke
                      </DropdownItem>
                    </>
                  )}
                  
                  {/* USER OPCIJE */}
                  <DropdownItem to="/settings" onClick={() => setIsDropdownOpen(false)}>
                    <FaCog style={{color: 'var(--primary)'}} /> Podešavanja
                  </DropdownItem>
                  
                  <LogoutItem onClick={handleLogout}>
                    <FaSignOutAlt /> Odjavi se
                  </LogoutItem>
                </DropdownMenu>
              )}
            </>
          ) : (
            /* GOST (NIJE ULOGOVAN) */
            <div style={{ display: 'flex', gap: '15px' }}>
              <Link to="/login">
                <ActionButton>Prijava</ActionButton>
              </Link>
            </div>
          )}
        </RightActions>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;