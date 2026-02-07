// By: Predrag Savic 6153
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../styles/global/SharedComponents';
import { FaSignInAlt, FaUserPlus, FaUser, FaLock, FaExclamationCircle, FaEnvelope, FaCalendarAlt, FaQuestionCircle, FaMagic } from 'react-icons/fa';

// Import centralizovane konfiguracije
import { API_CONFIG, getFullUrl, getUpdateUrl, getHeaders } from '../apiConfig';

// Import stilova
import {
  PageWrapper, LoginCard, HelpWrapper, TooltipBox, FillButton,
  Header, InputGroup, StyledInput, ErrorMessage, SwitchText
} from '../styles/pages/Login';

/**
 * Login & Register Page Component
 * Upravlja autentifikacijom korisnika koristeći Cloud bazu (JSONBin).
 */
const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ 
    username: '', 
    password: '', 
    email: '', 
    birthDate: '' 
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const fillCredentials = (username, password) => {
    setFormData({ ...formData, username, password });
    setIsRegister(false);
    setError('');
  };

  const validateForm = () => {
    if (formData.username.trim().length < 3) return "Korisničko ime mora imati bar 3 karaktera.";
    if (formData.password.length < 6) return "Lozinka mora imati najmanje 6 karaktera.";

    if (isRegister) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) return "Unesite validnu email adresu.";
      if (!formData.birthDate) return "Unesite datum rođenja.";
      
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) return "Morate biti punoletni (18+) za registraciju.";
    }
    return null;
  };

  /**
   * Glavna funkcija za Login i Registraciju povezana sa Cloud-om
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const validationError = validateForm();
    if (validationError) { setError(validationError); return; }
    
    setLoading(true);

    try {
      // 1. Povlačimo trenutno stanje baze preko centralizovanog URL-a
      const res = await axios.get(getFullUrl(), {
        headers: { 'X-Master-Key': API_CONFIG.API_KEY }
      });
      
      const fullData = res.data.record;
      const allUsers = fullData.users || [];

      if (isRegister) {
        // --- REGISTRACIJA ---
        const userExists = allUsers.find(u => u.username === formData.username);
        if (userExists) {
          setError('Korisničko ime je već zauzeto.');
          setLoading(false);
          return;
        }

        const newUser = { 
          id: Date.now(),
          username: formData.username, 
          password: formData.password, 
          email: formData.email, 
          birthDate: formData.birthDate, 
          role: 'USER' 
        };

        // Ažuriramo Cloud bazu novim nizom korisnika
        await axios.put(getUpdateUrl(), 
          { ...fullData, users: [...allUsers, newUser] },
          { headers: getHeaders() }
        );

        localStorage.setItem('user', JSON.stringify(newUser));
        navigate('/');
      } else {
        // --- LOGIN ---
        const user = allUsers.find(u => u.username === formData.username && u.password === formData.password);
        
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          setTimeout(() => { 
            if (user.role === 'ADMIN') navigate('/admin'); 
            else navigate('/'); 
          }, 800);
        } else {
          setError('Pogrešno korisničko ime ili lozinka.');
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError('Greška pri povezivanju sa bazom.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <LoginCard initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
        
        <HelpWrapper>
          <FaQuestionCircle size={24} />
          <TooltipBox className="tooltip">
            <h4>TEST NALOZI</h4>
            <div className="account-group">
              <div className="header-row">
                <strong>Admin:</strong>
                <FillButton onClick={() => fillCredentials('AdministratorTEST', 'admintest')}>
                  <FaMagic /> Popuni
                </FillButton>
              </div>
              User: <span>AdministratorTEST</span><br/>
              Pass: <span>admintest</span>
            </div>
          </TooltipBox>
        </HelpWrapper>

        <Header>
          <h2>{isRegister ? 'Registracija' : 'Dobrodošli'}</h2>
          <p>{isRegister ? 'Kreirajte novi nalog' : 'Prijavite se za pristup'}</p>
        </Header>

        {error && (
          <ErrorMessage initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}}>
            <FaExclamationCircle /> {error}
          </ErrorMessage>
        )}

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <label>Korisničko ime</label>
            <StyledInput type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <FaUser />
          </InputGroup>

          {isRegister && (
            <>
              <InputGroup>
                <label>Email adresa</label>
                <StyledInput type="email" name="email" placeholder="vas@email.com" value={formData.email} onChange={handleChange} />
                <FaEnvelope />
              </InputGroup>
              <InputGroup>
                <label>Datum rođenja</label>
                <StyledInput type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                <FaCalendarAlt />
              </InputGroup>
            </>
          )}
          
          <InputGroup>
            <label>Lozinka</label>
            <StyledInput type="password" name="password" placeholder="••••••" value={formData.password} onChange={handleChange} />
            <FaLock />
          </InputGroup>

          <Button type="submit" style={{ width: '100%', height: '45px', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Obrada...' : isRegister ? <><FaUserPlus style={{marginRight: '8px'}}/> Registruj se</> : <><FaSignInAlt style={{marginRight: '8px'}}/> Prijavi se</>}
          </Button>
        </form>
        
        <SwitchText>
          {isRegister ? 'Već imate nalog?' : 'Nemate nalog?'}
          <span onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? ' Prijavi se' : ' Registruj se'}
          </span>
        </SwitchText>
      </LoginCard>
    </PageWrapper>
  );
};

export default Login;