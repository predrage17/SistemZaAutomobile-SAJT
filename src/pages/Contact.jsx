// By: Predrag Savic 6153
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '../styles/global/SharedComponents';
import { FaPaperPlane, FaCheckCircle, FaUser, FaCommentDots, FaHeadset, FaLock, FaSignInAlt } from 'react-icons/fa';

// Import centralizovane konfiguracije
import { API_CONFIG, getFullUrl, getUpdateUrl, getHeaders } from '../apiConfig';

// Import stilova
import {
  PageWrapper,
  ContactCard,
  Header,
  InputGroup,
  StyledInput,
  StyledTextarea,
  SuccessBox,
  LoginPrompt
} from '../styles/pages/Contact';

const Contact = () => {
  // State za formu
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  
  // UI State
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Dohvatanje podataka o ulogovanom korisniku
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      setName(user.username);
    }
  }, [user]);

  /**
   * Obrađuje slanje forme prilagođeno za JSONBin oblak.
   */
  const handleSend = async (e) => {
    e.preventDefault();
    if(!name || !message || !user) return;
    
    setLoading(true);
    
    try {
      // 1. Prvo moramo dohvatiti trenutno stanje cele baze (fullData)
      const res = await axios.get(getFullUrl(), {
        headers: { 'X-Master-Key': API_CONFIG.API_KEY }
      });
      
      const fullData = res.data.record;
      const currentMessages = fullData.messages || [];

      // 2. Kreiramo novu poruku sa unikatnim ID-jem
      const newMessage = {
        id: Date.now(), // Neophodno za identifikaciju i brisanje
        name,
        message,
        email: user.email, 
        date: new Date().toLocaleString()
      };

      // 3. Šaljemo ceo ažurirani objekat nazad (spread operatorom čuvamo ostale ključeve)
      await axios.put(getUpdateUrl(), 
        { ...fullData, messages: [...currentMessages, newMessage] },
        { headers: getHeaders() }
      );

      setSent(true);
      setMessage('');
      
      // Resetovanje statusa nakon 4 sekunde
      setTimeout(() => {
        setSent(false);
        setLoading(false);
      }, 4000);

    } catch (err) {
      console.error("Greška pri slanju poruke:", err);
      alert("Greška pri slanju poruke. Pokušajte ponovo.");
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <ContactCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <div className="icon-wrapper">
            <FaHeadset />
          </div>
          <h2>Kontaktirajte Nas</h2>
          <p>Imate pitanja? Naš tim je tu za vas 24/7.</p>
        </Header>

        {/* PROVERA AUTENTIFIKACIJE */}
        {!user ? (
          <LoginPrompt>
            <div style={{fontSize: '3rem', color: '#333', marginBottom: '15px'}}><FaLock /></div>
            <h3>Prijavite se za kontakt</h3>
            <p>Da biste nam poslali poruku, morate biti ulogovani na svoj nalog.</p>
            <Link to="/login">
              <Button style={{width: '100%', padding: '15px'}}>
                <FaSignInAlt style={{marginRight: '10px'}}/> Prijavi se
              </Button>
            </Link>
          </LoginPrompt>
        ) : (
          <>
            {sent ? (
              <SuccessBox initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <FaCheckCircle />
                <div>
                  <h4>Poruka uspešno poslata!</h4>
                  <p style={{fontSize: '0.9rem', opacity: 0.8}}>Odgovorićemo vam na email: {user.email}</p>
                </div>
              </SuccessBox>
            ) : (
              <form onSubmit={handleSend}>
                <InputGroup>
                  <label>Vaše Ime</label>
                  <StyledInput 
                    placeholder="Unesite vaše ime" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required
                  />
                  <FaUser />
                </InputGroup>

                <InputGroup className="textarea-group">
                  <label>Vaša Poruka</label>
                  <StyledTextarea 
                    placeholder="Kako vam možemo pomoći?" 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    required
                  />
                  <FaCommentDots style={{top: '45px'}} />
                </InputGroup>

                <Button 
                  type="submit" 
                  style={{ width: '100%', height: '50px', fontSize: '1rem', marginTop: '10px' }}
                  disabled={loading}
                >
                  {loading ? 'Slanje...' : <><FaPaperPlane style={{marginRight: '10px'}} /> Pošalji Poruku</>}
                </Button>
              </form>
            )}
          </>
        )}
      </ContactCard>
    </PageWrapper>
  );
};

export default Contact;