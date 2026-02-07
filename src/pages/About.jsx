// By: Predrag Savic 6153
import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaGlobe, FaUniversity, FaShieldAlt } from 'react-icons/fa';

// Import stilova
import {
  PageWrapper,
  Container,
  HeroSection,
  Section,
  Grid,
  TextBlock,
  ImageBlock,
  StatsBar,
  ValuesGrid,
  ValueCard,
  FounderSection,
  FounderCard
} from '../styles/pages/About';

/**
 * About Page Component
 * * Prikazuje detaljne informacije o kompaniji AutoExpress, njenu istoriju, vrednosti i osnivača.
 * Dizajnirana je sa fokusom na storytelling i izgradnju poverenja kod korisnika.
 * * Struktura stranice:
 * 1. **Hero Section**: Parallax efekat sa BMW M5 slikom i glavnim sloganom.
 * 2. **Stats Bar**: Brzi pregled ključnih metrika (godine iskustva, prodaja).
 * 3. **Naša Priča**: Tekstualni deo o istorijatu firme sa slikom lokacije (Savski Venac).
 * 4. **Vrednosti**: Grid prikaz tri ključna stuba poslovanja (Sigurnost, Podrška, Liderstvo).
 * 5. **Osnivač**: Personalizovana kartica sa porukom vlasnika i univerzitetskom značkom.
 * * @component
 * @returns {JSX.Element} Renderovana About stranica.
 */
const About = () => {
  return (
    <PageWrapper>
      {/* 1. HERO SEKCIJA */}
      <HeroSection>
        <motion.div 
          initial={{opacity: 0, y: 30}} 
          animate={{opacity: 1, y: 0}} 
          transition={{duration: 0.8}}
        >
          <h1>Više od vožnje.</h1>
          <p>AutoExpress nije samo salon automobila. Mi smo čuvari vaše strasti prema putovanjima, brzini i luksuzu.</p>
        </motion.div>
      </HeroSection>

      {/* 2. STATISTIKA */}
      <StatsBar>
        <div className="stat">
          <h3>15+</h3>
          <p>Godina iskustva</p>
        </div>
        <div className="stat">
          <h3>5000+</h3>
          <p>Prodatih vozila</p>
        </div>
        <div className="stat">
          <h3>100%</h3>
          <p>Garancija kvaliteta</p>
        </div>
      </StatsBar>

      {/* 3. NAŠA PRIČA */}
      <Section>
        <Grid>
          <ImageBlock 
            initial={{opacity: 0, x: -50}} 
            whileInView={{opacity: 1, x: 0}} 
            transition={{duration: 0.6}} 
            viewport={{once: true}}
          >
            <img src="https://cityexpert.rs/blog/sites/default/files/slika/opstina-savski-venac.jpg" alt="Lokacija Savski Venac" />
          </ImageBlock>
          <TextBlock 
            initial={{opacity: 0, x: 50}} 
            whileInView={{opacity: 1, x: 0}} 
            transition={{duration: 0.6}} 
            viewport={{once: true}}
          >
            <h2>Tradicija izvrsnosti</h2>
            <p>
              Osnovan 2010. godine u srcu Beograda, <span className="highlight">AutoExpress</span> je nastao iz čiste ljubavi prema automobilizmu. Ono što je počelo kao mala garaža sa nekoliko probranih modela, preraslo je u lidera na tržištu premium vozila u regionu.
            </p>
            <p>
              Naša filozofija je jednostavna: <strong>Ne prodajemo automobil koji sami ne bismo vozili.</strong> Svako vozilo prolazi rigoroznu inspekciju u 150 tačaka pre nego što dobije mesto u našem salonu.
            </p>
          </TextBlock>
        </Grid>
      </Section>

      {/* 4. VREDNOSTI */}
      <Section style={{background: '#121216'}}>
        <div style={{textAlign: 'center', marginBottom: '50px'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '10px'}}>Zašto baš mi?</h2>
          <p style={{color: '#9ca3af'}}>Stubovi na kojima gradimo poverenje.</p>
        </div>
        <ValuesGrid>
          <ValueCard whileHover={{y: -10}}>
            <FaShieldAlt />
            <h4>Apsolutna Sigurnost</h4>
            <p>Sva naša vozila poseduju sertifikovanu servisnu istoriju i garanciju na poreklo i kilometražu.</p>
          </ValueCard>
          <ValueCard whileHover={{y: -10}}>
            <FaHandshake />
            <h4>Premium Podrška</h4>
            <p>Od probne vožnje do registracije, naš tim je uz vas. Nudimo i usluge finansiranja i osiguranja.</p>
          </ValueCard>
          <ValueCard whileHover={{y: -10}}>
            <FaGlobe />
            <h4>Regionalni Lider</h4>
            <p>Priznati smo kao najpouzdaniji diler luksuznih automobila na Balkanu sa mrežom zadovoljnih klijenata.</p>
          </ValueCard>
        </ValuesGrid>
      </Section>

      {/* 5. VLASNIK / FOUNDER */}
      <FounderSection>
        <Container>
          <div style={{textAlign: 'center', marginBottom: '40px'}}>
            <h2 style={{fontSize: '2.5rem'}}>Reč Osnivača</h2>
          </div>
          <FounderCard 
            initial={{scale: 0.9, opacity: 0}} 
            whileInView={{scale: 1, opacity: 1}} 
            transition={{duration: 0.5}}
          >
            <img src="https://i.imgur.com/jvF7Fmg.jpeg" alt="Predrag Savic" />
            
            <div>
              <h3>Predrag Savić</h3>
              <h4>Vlasnik & CEO</h4>
              <p>
                "Verujem da automobil nije samo prevozno sredstvo, već izraz ličnosti i slobode. Moj cilj je da AutoExpress bude mesto gde snovi postaju stvarnost, uz maksimalnu profesionalnost i integritet."
              </p>
              
              <div className="uni-badge">
                <FaUniversity />
                <span>Metropolitan University 6153</span>
              </div>
            </div>
          </FounderCard>
        </Container>
      </FounderSection>
    </PageWrapper>
  );
};

export default About;