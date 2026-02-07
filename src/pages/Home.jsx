// By: Predrag Savic 6153
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { FaSearch, FaRoad, FaCalendarAlt, FaHeart, FaRegHeart, FaTag, FaFilter, FaGasPump } from 'react-icons/fa';
import { Card, Button } from '../styles/global/SharedComponents';
import { Link } from 'react-router-dom';

// Import centralizovane konfiguracije i novog Loadera
import { API_CONFIG, getFullUrl } from '../apiConfig';
import Loader from '../components/Loader';

// Import stilova
import {
  HeroSection,
  Container,
  FilterBar,
  FilterGroup,
  LabelRow,
  SearchInputWrapper,
  StyledSelect,
  SliderContainer,
  RangeInput,
  Grid,
  CarImage,
  CarBody,
  PriceTag,
  SpecRow
} from '../styles/pages/Home';

/**
 * Home Page Component (Showroom)
 * Prikazuje sva dostupna vozila uz animaciju učitavanja i napredno filtriranje.
 */
const Home = () => {
  // --- STATE VARIJABLE ---
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);

  // --- FILTER STATE ---
  const [filterText, setFilterText] = useState("");
  const [maxPrice, setMaxPrice] = useState(300000);
  const [minYear, setMinYear] = useState("All");

  const currentYear = new Date().getFullYear() + 1; 
  const startYear = 2000;
  const years = Array.from({length: currentYear - startYear + 1}, (_, i) => currentYear - i);

  const maxLimit = 300000; 
  const sliderPercent = (maxPrice / maxLimit) * 100;

  /**
   * Hook koji dohvata podatke sa Cloud-a.
   * Koristi Loader dok se record.cars ne učita.
   */
  useEffect(() => {
    axios.get(getFullUrl(), {
      headers: { 'X-Master-Key': API_CONFIG.API_KEY }
    })
    .then(res => { 
      setCars(res.data.record.cars || []); 
      setLoading(false); 
    })
    .catch(err => {
      console.error("Greška pri učitavanju salona:", err);
      setLoading(false);
    });
  }, []);

  const toggleWishlist = (id) => {
    let newWishlist;
    if (wishlist.includes(id)) newWishlist = wishlist.filter(item => item !== id);
    else newWishlist = [...wishlist, id];
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  // Logika filtriranja u realnom vremenu
  const filteredCars = cars.filter(car => 
    (car.brand.toLowerCase().includes(filterText.toLowerCase()) || 
     car.model.toLowerCase().includes(filterText.toLowerCase())) &&
    Number(car.price) <= maxPrice &&
    (minYear === "All" || car.year >= Number(minYear)) && 
    car.isActive === true 
  );

  // PRIKAZ ANIMIRANOG LOADERA
  if (loading) {
    return (
      <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
        <HeroSection>
           <div style={{zIndex: 2, position: 'relative'}}>
            <h1>AUTOEXPRESS SALON</h1>
            <p>Pripremanje premium ponude...</p>
          </div>
        </HeroSection>
        <Container>
          <Loader />
        </Container>
      </div>
    );
  }

  return (
    <div>
      <HeroSection>
        <div style={{zIndex: 2, position: 'relative'}}>
          <h1>PRONAĐI SVOJU ZVER.</h1>
          <p>Najekskluzivnija ponuda premium automobila na Balkanu.<br/>Garancija kvaliteta, sigurnosti i luksuza.</p>
        </div>
      </HeroSection>
      
      <Container>
        {/* --- FILTER BAR --- */}
        <FilterBar>
          <FilterGroup>
            <LabelRow><label><FaSearch /> Pretraga</label></LabelRow>
            <SearchInputWrapper>
              <FaSearch />
              <input placeholder="Marka, Model..." onChange={(e) => setFilterText(e.target.value)} />
            </SearchInputWrapper>
          </FilterGroup>

          <FilterGroup>
            <LabelRow><label><FaCalendarAlt /> Godište (od)</label></LabelRow>
            <StyledSelect onChange={(e) => setMinYear(e.target.value)}>
              <option value="All">Sva godišta</option>
              {years.map(year => <option key={year} value={year}>{year}.</option>)}
            </StyledSelect>
          </FilterGroup>

          <FilterGroup>
            <LabelRow>
              <label><FaTag /> Budžet</label>
              <div className="price-value">do {maxPrice.toLocaleString()} €</div>
            </LabelRow>
            <SliderContainer>
              <RangeInput 
                type="range" min="0" max={maxLimit} step="1000" 
                value={maxPrice} $percent={sliderPercent} 
                onChange={(e) => setMaxPrice(Number(e.target.value))} 
              />
            </SliderContainer>
          </FilterGroup>
        </FilterBar>

        {/* --- GRID VOZILA --- */}
        <Grid layout>
          <AnimatePresence mode='popLayout'>
            {filteredCars.length > 0 ? (
              filteredCars.map(car => (
                <Card 
                  key={car.id} 
                  initial={{opacity: 0, scale: 0.9}} 
                  animate={{opacity: 1, scale: 1}} 
                  exit={{opacity: 0, scale: 0.9}} 
                  whileHover={{y: -8, transition: {duration: 0.2}}}
                >
                  <CarImage $src={car.image}>
                    <button 
                      onClick={(e) => { e.preventDefault(); toggleWishlist(car.id); }} 
                      style={{
                        position: 'absolute', top: '15px', right: '15px', 
                        background: 'rgba(0,0,0,0.6)', width: '40px', height: '40px', 
                        borderRadius: '50%', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', color: wishlist.includes(car.id) ? '#ef4444' : 'white', 
                        fontSize: '1.2rem', cursor: 'pointer', border: 'none', transition: '0.3s'
                      }}
                    >
                      {wishlist.includes(car.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </CarImage>
                  <CarBody>
                    <div>
                      <h3 style={{fontSize: '1.3rem', marginBottom: '5px', color: 'white'}}>{car.brand} {car.model}</h3>
                      <PriceTag>{Number(car.price).toLocaleString()} €</PriceTag>
                      <SpecRow>
                        <div><FaCalendarAlt /> {car.year}.</div>
                        <div><FaRoad /> {Number(car.mileage).toLocaleString()} km</div>
                        <div><FaGasPump /> {car.fuelType}</div>
                      </SpecRow>
                    </div>
                    <Link to={`/car/${car.id}`} style={{display: 'block', marginTop: 'auto'}}>
                      <Button style={{width: '100%', padding: '12px'}}>Pogledaj Detalje</Button>
                    </Link>
                  </CarBody>
                </Card>
              ))
            ) : (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: '#666'}}>
                <FaFilter style={{fontSize: '3rem', marginBottom: '20px', opacity: 0.5}} />
                <h3>Nema rezultata.</h3>
                <p>Pokušajte sa blažim kriterijumima pretrage.</p>
              </div>
            )}
          </AnimatePresence>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;