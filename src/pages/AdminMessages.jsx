// By: Predrag Savic 6153
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaTrash, FaUser, FaClock, FaAt } from 'react-icons/fa';

// Import centralizovane konfiguracije i Loadera
import { API_CONFIG, getFullUrl, getUpdateUrl, getHeaders } from '../apiConfig';
import Loader from '../components/Loader';

// Import stilova
import {
  PageWrapper,
  Header,
  MessagesGrid,
  MessageCard,
  CardHeader,
  UserInfo,
  MessageBody,
  DeleteButton
} from '../styles/pages/AdminMessages';

/**
 * AdminMessages Page Component
 * Prikazuje poruke korisnika uz korišćenje animiranog Loadera tokom dobavljanja podataka.
 */
const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [fullData, setFullData] = useState(null); 
  const [loading, setLoading] = useState(true);

  // 1. DOHVATANJE SVIH PODATAKA IZ CLOUD-A
  useEffect(() => {
    axios.get(getFullUrl(), {
      headers: { 'X-Master-Key': API_CONFIG.API_KEY }
    })
    .then(res => {
      const data = res.data.record;
      setFullData(data);
      const fetchedMessages = data.messages || [];
      // Najnovije poruke na vrhu
      setMessages([...fetchedMessages].reverse());
      setLoading(false);
    })
    .catch(err => {
      console.error("Greška pri učitavanju poruka:", err);
      setLoading(false);
    });
  }, []);

  // 2. BRISANJE PORUKE (Ažuriranje cele baze)
  const handleDelete = async (id) => {
    if(window.confirm("Obriši ovu poruku?")) {
      try {
        // Filtriramo iz originalnog niza u fullData
        const updatedMessages = fullData.messages.filter(m => m.id !== id);

        // PUT zahtev sa očuvanim ostalim podacima (cars, users, about...)
        await axios.put(getUpdateUrl(), 
          { ...fullData, messages: updatedMessages }, 
          { headers: getHeaders() }
        );

        // Ažuriranje lokalnog prikaza
        setMessages([...updatedMessages].reverse());
        setFullData({ ...fullData, messages: updatedMessages });
        alert("Poruka je trajno obrisana.");
      } catch (err) {
        console.error("Greška pri brisanju:", err);
        alert("Sistem nije uspeo da obriše poruku.");
      }
    }
  };

  // PRIKAZ ANIMIRANOG LOADERA DOK SE PODACI UCITAVAJU
  if (loading) {
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header>
        <h1><FaEnvelope /> Primljene Poruke ({messages.length})</h1>
      </Header>

      {messages.length === 0 ? (
        <div style={{textAlign: 'center', color: '#666', marginTop: '50px', fontSize: '1.2rem'}}>
          Trenutno nema novih upita u bazi.
        </div>
      ) : (
        <MessagesGrid>
          {messages.map(msg => (
            <MessageCard key={msg.id}>
              <CardHeader>
                <UserInfo>
                  <div className="avatar"><FaUser /></div>
                  <div className="details">
                    <h4>{msg.name}</h4>
                    {msg.email && (
                      <span className="email">
                        <FaAt style={{fontSize: '0.75rem', color: 'var(--primary)'}}/> {msg.email}
                      </span>
                    )}
                    <span className="date">
                      <FaClock style={{fontSize: '0.7rem'}}/> {msg.date}
                    </span>
                  </div>
                </UserInfo>
              </CardHeader>
              <MessageBody>{msg.message}</MessageBody>
              <div style={{display: 'flex', justifyContent: 'flex-end', padding: '0 20px 20px'}}>
                <DeleteButton onClick={() => handleDelete(msg.id)}>
                  <FaTrash /> Obriši
                </DeleteButton>
              </div>
            </MessageCard>
          ))}
        </MessagesGrid>
      )}
    </PageWrapper>
  );
};

export default AdminMessages;