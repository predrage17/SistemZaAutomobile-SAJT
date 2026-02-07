// By: Predrag Savic 6153
import React from 'react';
import { FaXTwitter } from 'react-icons/fa6'; 
import { FaFacebook, FaInstagram, FaCar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

// Import stilova
import {
  FooterContainer,
  Content,
  BrandSection,
  SectionHeader,
  ContactItem,
  Logo,
  SocialIcons,
  HoursList,
  BottomBar
} from '../styles/components/Footer';

/**
 * Footer Component
 * * Globalno podnožje aplikacije koje se prikazuje na svim stranicama.
 * * Sadržaj:
 * 1. **Brand Info**: Logo, kratak opis misije i linkovi ka društvenim mrežama (uključujući novi X logo).
 * 2. **Kontakt**: Adresa, telefon i email sa ikonicama.
 * 3. **Radno Vreme**: Tabela radnog vremena sa vizuelnim razdvajanjem dana.
 * 4. **Copyright**: Donja traka sa godinom i potpisom autora.
 * * @component
 * @returns {JSX.Element} Renderovan Footer.
 */
const Footer = () => {
  return (
    <FooterContainer>
      <Content>
        {/* 1. BRAND SEKCIJA */}
        <BrandSection>
          <Logo to="/about"><FaCar /> AUTO<span>EXPRESS</span></Logo>
          <p>
            Vaša premium destinacija za kupovinu luksuznih automobila. 
            Spoj strasti, kvaliteta i poverenja od 2010. godine.
          </p>
          <SocialIcons>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            {/* X (Twitter) ikonica iz fa6 paketa */}
            <a href="#" aria-label="X (Twitter)"><FaXTwitter /></a>
          </SocialIcons>
        </BrandSection>
        
        {/* 2. KONTAKT SEKCIJA */}
        <div>
          <SectionHeader>Kontakt Informacije</SectionHeader>
          
          <ContactItem>
            <FaMapMarkerAlt />
            <div>
              Kralja Predraga 17,<br/>
              Savski Venac, Beograd
            </div>
          </ContactItem>

          <ContactItem>
            <FaPhone />
            <a href="tel:+38111555333">+381 11 555 333</a>
          </ContactItem>

          <ContactItem>
            <FaEnvelope />
            <a href="mailto:info@autoexpress.rs">info@autoexpress.rs</a>
          </ContactItem>
        </div>

        {/* 3. RADNO VREME */}
        <div>
          <SectionHeader><FaClock style={{color: '#f59e0b'}} /> Radno Vreme</SectionHeader>
          <HoursList>
            <li>
              <span>Ponedeljak - Petak</span>
              <span>09:00 - 18:00</span>
            </li>
            <li>
              <span>Subota</span>
              <span>10:00 - 15:00</span>
            </li>
            <li>
              <span>Nedelja</span>
              <span style={{color: '#ef4444'}}>Zatvoreno</span>
            </li>
          </HoursList>
        </div>

      </Content>

   <BottomBar>
  <div>
    &copy; {new Date().getFullYear()} <strong>AutoExpress</strong>. 
    Design by <span>Predrag Savić 6153</span>
  </div>
  <div style={{ fontSize: '0.8rem', marginTop: '5px', opacity: 0.7 }}>
    Ovaj sajt je isključivo <strong>studentski projekat</strong> u svrhe portfolija. 
    Sve slike i brendovi su vlasništvo njihovih autora i ne koriste se u komercijalne svrhe.
  </div>
</BottomBar>
    </FooterContainer>
  );
};

export default Footer;