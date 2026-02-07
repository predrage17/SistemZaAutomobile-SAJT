// By: Predrag Savic 6153
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card } from '../global/SharedComponents';

export const HeroSection = styled.div`
  width: 100%;
  min-height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 60px 10px 100px;
  position: relative;
  
  background-image: url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; 

  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(0deg, rgba(15,16,20,1) 0%, rgba(15,16,20,0.6) 50%, rgba(15,16,20,0.4) 100%);
    z-index: 1;
  }

  div { position: relative; z-index: 2; padding: 0 20px; max-width: 1100px; }

  h1 {
    font-size: 4.5rem; font-weight: 900; margin-bottom: 20px; text-transform: uppercase;
    letter-spacing: -2px; color: white; text-shadow: 0 10px 40px rgba(0,0,0,0.8);
    @media (max-width: 1200px) { font-size: 3.5rem; }
    @media (max-width: 768px) { font-size: 2.5rem; }
  }

  p {
    font-size: 1.2rem; color: #cbd5e1; max-width: 700px; margin: 0 auto; font-weight: 300;
    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
  }
`;

export const Container = styled.div`
  width: 95%; max-width: 1800px; margin: 0 auto; padding: 0 20px;
`;

// --- FILTER BAR ---
export const FilterBar = styled.div`
  background: rgba(22, 22, 27, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  padding: 30px 40px;
  border-radius: 24px;
  margin-bottom: 50px;
  
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  
  margin-top: -80px; 
  position: relative; 
  z-index: 10;

  display: grid; 
  grid-template-columns: 2fr 1fr 1.5fr; 
  gap: 40px;
  align-items: center;

  @media (max-width: 1000px) { grid-template-columns: 1fr; gap: 25px; padding: 25px; }
`;

export const FilterGroup = styled.div`
  display: flex; flex-direction: column; gap: 15px;
  width: 100%;
`;

export const LabelRow = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  
  label { 
    color: rgba(255, 255, 255, 0.7); 
    font-size: 0.8rem; 
    font-weight: 600; 
    display: flex; align-items: center; gap: 8px; 
    text-transform: uppercase; 
    letter-spacing: 1px; 
    margin: 0; 
  }
  
  svg { color: #3b82f6; }
  
  .price-value {
    color: white; 
    font-weight: 700; 
    font-size: 1rem; 
    background: rgba(59, 130, 246, 0.2); 
    padding: 4px 10px; 
    border-radius: 8px; 
    border: 1px solid rgba(59, 130, 246, 0.3);
    text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative; width: 100%;
  input { 
    padding-left: 45px; height: 55px; 
    border-radius: 16px; 
    border: 1px solid rgba(255,255,255,0.05); 
    background: rgba(255, 255, 255, 0.03);
    color: white; width: 100%; 
    transition: all 0.3s ease; 
    font-size: 1rem;
    
    &:focus { 
      border-color: #3b82f6; 
      background: rgba(255, 255, 255, 0.08); 
      outline: none; 
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.1); 
    }
    &::placeholder { color: rgba(255, 255, 255, 0.3); }
  }
  svg { position: absolute; left: 18px; top: 19px; color: rgba(255, 255, 255, 0.4); font-size: 1.1rem; pointer-events: none; }
`;

export const StyledSelect = styled.select`
  width: 100%; height: 55px; padding: 0 16px; 
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255,255,255,0.05); 
  color: white; border-radius: 16px;
  font-size: 1rem; appearance: none; cursor: pointer; transition: all 0.3s ease;
  
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat; background-position: right 1.2rem center; background-size: 1em;

  option { background: #18181b; color: white; }

  &:focus { outline: none; border-color: #3b82f6; background-color: rgba(255, 255, 255, 0.08); }
`;

// --- POPRAVLJEN SLIDER ---
export const SliderContainer = styled.div`
  width: 100%;
  height: 55px;
  display: flex; align-items: center;
  position: relative;
`;

export const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  cursor: pointer;
  height: 20px; /* Dovoljno visine da se vidi thumb */
  margin: 0;

  &:focus { outline: none; }

  /* --- WEBKIT (Chrome, Safari, Edge) --- */
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    background: #2b2b36; /* Tamno siva pozadina */
    border-radius: 3px;
    /* Plavi progres */
    background-image: linear-gradient(#3b82f6, #3b82f6);
    background-size: ${props => props.$percent}% 100%;
    background-repeat: no-repeat;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: #3b82f6;
    border: 2px solid white;
    margin-top: -8px; /* Centriranje: (6px track - 22px thumb) / 2 = -8px */
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    transition: transform 0.2s;
  }

  &:hover::-webkit-slider-thumb { transform: scale(1.1); }

  /* --- FIREFOX (Mozilla) --- */
  &::-moz-range-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    background: #2b2b36;
    border-radius: 3px;
  }

  &::-moz-range-progress {
    background-color: #3b82f6;
    height: 6px;
    border-radius: 3px;
  }

  &::-moz-range-thumb {
    height: 22px;
    width: 22px;
    border: 2px solid white;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  }
`;

// --- POPRAVLJEN GRID (4 KOLONE) ---
export const Grid = styled(motion.div)`
  display: grid;
  /* Fiksno 4 kolone na velikim ekranima */
  grid-template-columns: repeat(4, 1fr); 
  gap: 30px;
  padding-bottom: 50px;

  /* Responsivnost */
  @media (max-width: 1600px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

export const CarImage = styled.div`
  height: 220px; /* Malo smanjena visina da lepše stane 4 u red */
  width: 100%;
  background-image: url(${props => props.$src}); 
  background-size: cover; 
  background-position: center;
  position: relative; 
  transition: transform 0.5s ease;
  ${Card}:hover & { transform: scale(1.05); }
`;

export const CarBody = styled.div`
  padding: 20px; 
  display: flex; 
  flex-direction: column; 
  flex-grow: 1; 
  background: #1e1e24; 
  position: relative; 
  z-index: 2;
`;

export const PriceTag = styled.div`
  font-size: 1.6rem; 
  font-weight: 800; 
  color: #3b82f6; 
  margin-bottom: 15px;
`;

export const SpecRow = styled.div`
  display: flex; 
  justify-content: space-between; 
  margin-bottom: 20px; 
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1); 
  color: #9ca3af; 
  font-size: 0.85rem;
  div { display: flex; align-items: center; gap: 6px; } 
  svg { color: #3b82f6; }
`;