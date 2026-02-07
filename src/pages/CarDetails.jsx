// By: Predrag Savic 6153
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../styles/global/SharedComponents';
import { FaStar, FaGasPump, FaRoad, FaCalendarAlt, FaMoneyBillWave, FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa';

// Import centralizovane konfiguracije i Loadera
import { API_CONFIG, getFullUrl, getUpdateUrl, getHeaders } from '../apiConfig';
import Loader from '../components/Loader';

// Import stilova
import {
  PageWrapper, Container, DetailsGrid, ImageSection, MainImage, ThumbnailGrid,
  InfoBox, Title, PriceBox, SpecsGrid, ReviewSection, ReviewCard,
  ModalOverlay, ModalBox, ContactOption, PhoneBox, CloseButton
} from '../styles/pages/CarDetails';

/**
 * CarDetails Page Component
 * Prikazuje detalje automobila uz animaciju učitavanja.
 */
const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [fullData, setFullData] = useState(null); 
  const [activeImage, setActiveImage] = useState("");
  const [rsdPrice, setRsdPrice] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'ADMIN';

  /**
   * 1. Dohvatanje podataka o vozilu i kursu valuta
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(getFullUrl(), {
          headers: { 'X-Master-Key': API_CONFIG.API_KEY }
        });
        
        const data = res.data.record;
        setFullData(data);

        // Pronalazimo auto po ID-u
        const foundCar = data.cars.find(c => c.id.toString() === id.toString());
        
        if (foundCar) {
          setCar(foundCar);
          setActiveImage(foundCar.image);
          
          // Filtriramo recenzije
          const carReviews = (data.reviews || []).filter(r => r.carId.toString() === id.toString());
          setReviews(carReviews);

          // Dohvatanje kursa EUR -> RSD
          const rateRes = await axios.get('https://api.exchangerate-api.com/v4/latest/EUR');
          const rate = rateRes.data.rates.RSD;
          setRsdPrice((foundCar.price * rate).toFixed(0));
        }
        setLoading(false);
      } catch (err) {
        console.error("Greška pri učitavanju detalja:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /**
   * 2. Slanje recenzije na Cloud
   */
  const handlePostReview = async () => {
    if(!newComment || !user) return;
    
    const newReview = {
      id: Date.now(), 
      carId: id,
      username: user.username,
      rating: 5,
      comment: newComment,
      date: new Date().toLocaleDateString()
    };

    try {
      const allReviews = [...(fullData.reviews || []), newReview];
      
      await axios.put(getUpdateUrl(), 
        { ...fullData, reviews: allReviews },
        { headers: getHeaders() }
      );

      setReviews([...reviews, newReview]);
      setNewComment("");
      setFullData({ ...fullData, reviews: allReviews });
      alert("Hvala vam na utiscima!");
    } catch (err) {
      alert("Došlo je do greške pri slanju komentara.");
    }
  };

  // PRIKAZ LOADERA
  if (loading) {
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    );
  }

  if (!car) return <PageWrapper><div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Vozilo nije pronađeno.</div></PageWrapper>;

  return (
    <PageWrapper>
      <Container>
        <DetailsGrid>
          {/* --- GALERIJA --- */}
          <ImageSection>
            <MainImage>
              <img src={activeImage} alt={car.model} />
            </MainImage>
            <ThumbnailGrid>
              <img 
                src={car.image} 
                onClick={() => setActiveImage(car.image)}
                className={activeImage === car.image ? 'active' : ''}
                alt="Front view"
              />
              {car.gallery && car.gallery.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  onClick={() => setActiveImage(img)}
                  className={activeImage === img ? 'active' : ''}
                  alt={`Gallery ${index}`} 
                />
              ))}
            </ThumbnailGrid>
          </ImageSection>

          {/* --- INFO --- */}
          <InfoBox>
            <Title>{car.brand} {car.model}</Title>
            <p style={{color: '#a1a1aa', fontSize: '1.1rem', lineHeight: '1.6'}}>{car.description}</p>
            
            <PriceBox>
              <div style={{fontSize: '0.9rem', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '5px'}}>Cena vozila</div>
              <div className="price">{Number(car.price).toLocaleString()} €</div>
              {rsdPrice && <div className="rsd">≈ {Number(rsdPrice).toLocaleString()} RSD</div>}
            </PriceBox>

            <SpecsGrid>
              <div><FaCalendarAlt /> {car.year}. godište</div>
              <div><FaRoad /> {Number(car.mileage).toLocaleString()} km</div>
              <div><FaGasPump /> {car.fuelType}</div>
              <div><FaMoneyBillWave /> Kreditiranje: DA</div>
            </SpecsGrid>

            <Button 
              style={{
                width: '100%', 
                height: '50px', 
                fontSize: '1.1rem',
                background: isAdmin ? '#3f3f46' : 'var(--primary)',
                color: isAdmin ? '#71717a' : 'white',
                cursor: isAdmin ? 'not-allowed' : 'pointer',
                opacity: isAdmin ? 0.7 : 1
              }}
              onClick={() => !isAdmin && setShowContact(true)}
              disabled={isAdmin}
            >
              {isAdmin ? "Admin Pregled (Samo za čitanje)" : "Kontaktiraj Prodavca"}
            </Button>
          </InfoBox>
        </DetailsGrid>

        <ReviewSection>
          <h3>Iskustva Korisnika ({reviews.length})</h3>
          {reviews.length === 0 ? <p style={{color: '#666'}}>Još uvek nema komentara za ovo vozilo.</p> : 
            reviews.map(rev => (
              <ReviewCard key={rev.id}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <strong style={{color: 'white'}}>{rev.username}</strong>
                  <span style={{color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '5px'}}><FaStar /> {rev.rating}</span>
                </div>
                <p style={{color: '#ccc'}}>{rev.comment}</p>
              </ReviewCard>
          ))}

          {user ? (
            <div style={{marginTop: '25px', display: 'flex', gap: '15px'}}>
              <input 
                style={{flex: 1, padding: '15px', borderRadius: '8px', border: '1px solid #444', background: '#222', color: 'white'}}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Napišite vaše mišljenje..."
              />
              <Button onClick={handlePostReview}>Objavi</Button>
            </div>
          ) : (
            <div style={{padding: '20px', background: '#222', borderRadius: '8px', marginTop: '20px', color: '#aaa'}}>
              Morate biti prijavljeni da biste komentarisali.
            </div>
          )}
        </ReviewSection>
      </Container>

      {showContact && (
        <ModalOverlay onClick={() => setShowContact(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowContact(false)}><FaTimes /></CloseButton>
            <h2>Kontakt</h2>
            <p style={{color: '#aaa', marginBottom: '30px'}}>Naš tim će vam odgovoriti u najkraćem roku:</p>
            <ContactOption to="/contact">
              <FaEnvelope /> Pošalji Email
            </ContactOption>
            <div style={{margin: '20px 0', color: '#666', fontSize: '0.9rem'}}>- ILI NAZOVITE -</div>
            <PhoneBox href="tel:+38111555333">
              <FaPhone /> +381 11 555 333
            </PhoneBox>
          </ModalBox>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};

export default CarDetails;