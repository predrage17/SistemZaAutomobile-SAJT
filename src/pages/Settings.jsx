// By: Predrag Savic 6153
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../styles/global/SharedComponents';
import { FaUserShield, FaCheckCircle, FaLock, FaExclamationCircle } from 'react-icons/fa';

// Import centralizovane konfiguracije
import { API_CONFIG, getFullUrl, getUpdateUrl, getHeaders } from '../apiConfig';

// Import stilova
import {
  PageWrapper,
  SettingsCard,
  Header,
  InputGroup,
  StyledInput,
  StatusMessage
} from '../styles/pages/Settings';

// --- VALIDACIJA (YUP) ---
const schema = yup.object({
  oldPassword: yup.string().required("Unesite trenutnu šifru"),
  newPassword: yup.string().required("Unesite novu šifru").min(4, "Šifra mora imati bar 4 karaktera"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Šifre se ne poklapaju')
    .required('Potvrdite novu šifru'),
}).required();

/**
 * Settings Page Component
 * Upravlja promenom lozinke korisnika putem Cloud baze.
 */
const Settings = () => {
  const [status, setStatus] = useState(null); 
  const user = JSON.parse(localStorage.getItem('user'));

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  /**
   * Obrađuje zahtev za promenu lozinke koristeći centralizovanu konfiguraciju.
   */
  const onSubmit = async (data) => {
    setStatus(null);

    // 1. Lokalne provere (stara šifra i ponavljanje)
    if (data.oldPassword !== user.password) {
      setStatus({ type: 'error', msg: "Stara šifra nije ispravna." });
      return;
    }

    if (data.newPassword === user.password) {
      setStatus({ type: 'error', msg: "Nova šifra ne može biti ista kao stara." });
      return;
    }

    try {
      // 2. Povlačenje kompletnog stanja baze sa Cloud-a
      const res = await axios.get(getFullUrl(), {
        headers: { 'X-Master-Key': API_CONFIG.API_KEY }
      });
      
      const fullData = res.data.record;
      const allUsers = fullData.users || [];

      // 3. Pronalaženje korisnika i ažuriranje lozinke u nizu
      const updatedUsers = allUsers.map(u => {
        // Provera po ID-u ili korisničkom imenu radi sigurnosti
        if (u.id === user.id || u.username === user.username) {
          return { ...u, password: data.newPassword };
        }
        return u;
      });

      // 4. PUT zahtev za čuvanje celokupne baze (da ne bismo pregazili ostale podatke)
      await axios.put(getUpdateUrl(), 
        { ...fullData, users: updatedUsers },
        { headers: getHeaders() }
      );

      // 5. Ažuriranje korisnika u LocalStorage sesiji
      const updatedUserSession = { ...user, password: data.newPassword };
      localStorage.setItem('user', JSON.stringify(updatedUserSession));

      setStatus({ type: 'success', msg: "Lozinka je uspešno promenjena!" });
      reset(); 
    } catch (err) {
      console.error("Greška pri ažuriranju lozinke:", err);
      setStatus({ type: 'error', msg: "Greška pri komunikaciji sa bazom." });
    }
  };

  if (!user) return <PageWrapper>Morate biti prijavljeni.</PageWrapper>;

  return (
    <PageWrapper>
      <SettingsCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <div className="icon-wrapper">
            <FaUserShield />
          </div>
          <h2>Bezbednost</h2>
          <p>Ažurirajte vašu pristupnu lozinku</p>
        </Header>

        {status && (
          <StatusMessage 
            $success={status.type === 'success'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
            {status.msg}
          </StatusMessage>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <label>Trenutna lozinka</label>
            <StyledInput 
              type="password" 
              {...register("oldPassword")} 
              placeholder="Unesite staru lozinku" 
            />
            <FaLock />
            {errors.oldPassword && <span style={{color: '#ef4444', fontSize: '0.8rem'}}>{errors.oldPassword.message}</span>}
          </InputGroup>

          <InputGroup>
            <label>Nova lozinka</label>
            <StyledInput 
              type="password" 
              {...register("newPassword")} 
              placeholder="Unesite novu lozinku" 
            />
            <FaLock />
            {errors.newPassword && <span style={{color: '#ef4444', fontSize: '0.8rem'}}>{errors.newPassword.message}</span>}
          </InputGroup>

          <InputGroup>
            <label>Potvrdi novu lozinku</label>
            <StyledInput 
              type="password" 
              {...register("confirmPassword")} 
              placeholder="Ponovite novu lozinku" 
            />
            <FaLock />
            {errors.confirmPassword && <span style={{color: '#ef4444', fontSize: '0.8rem'}}>{errors.confirmPassword.message}</span>}
          </InputGroup>

          <Button 
            type="submit" 
            style={{ width: '100%', marginTop: '15px', height: '50px', fontSize: '1rem' }}
          >
            Sačuvaj Promene
          </Button>
        </form>
      </SettingsCard>
    </PageWrapper>
  );
};

export default Settings;