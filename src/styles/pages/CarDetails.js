// By: Predrag Savic 6153
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background-color: #0f1014;
  color: white;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  width: 95%;
  max-width: 1400px;
  margin-bottom: 50px;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
  @media(max-width: 900px) { grid-template-columns: 1fr; }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const MainImage = styled.div`
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  height: 400px; 
  width: 100%;
  
  img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    display: block; 
    transition: transform 0.5s ease;
  }
`;

export const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    opacity: 0.7;

    &:hover {
      opacity: 1;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
    }

    &.active {
      border-color: #3b82f6;
      opacity: 1;
    }
  }
`;

export const InfoBox = styled.div`
  background: #18181b;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.05);
  height: fit-content;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: white;
`;

export const PriceBox = styled.div`
  margin: 25px 0;
  padding: 20px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  .price { font-size: 2.5rem; font-weight: 900; color: #3b82f6; }
  .rsd { color: #10b981; font-weight: 600; margin-top: 5px; }
`;

export const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
  div {
    background: rgba(255,255,255,0.03);
    padding: 15px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    color: #ccc;
    svg { color: #3b82f6; font-size: 1.2rem; }
  }
`;

export const ReviewSection = styled.div`
  margin-top: 50px;
  h3 { margin-bottom: 20px; font-size: 1.5rem; }
`;

export const ReviewCard = styled.div`
  background: #1f1f23;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
`;

// --- MODAL STYLES ---
export const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(10px);
  display: flex; justify-content: center; align-items: center; z-index: 2000;
  animation: fadeIn 0.3s ease;
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;

export const ModalBox = styled.div`
  background: #18181b; padding: 40px; border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1); width: 90%; max-width: 420px;
  text-align: center; position: relative; box-shadow: 0 25px 50px rgba(0,0,0,0.6);
  h2 { margin-bottom: 30px; font-size: 1.8rem; }
`;

export const ContactOption = styled(Link)`
  display: flex; align-items: center; justify-content: center; gap: 15px;
  background: rgba(255, 255, 255, 0.05); padding: 18px; border-radius: 12px;
  margin-bottom: 15px; color: white; text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.05); transition: all 0.3s;
  font-size: 1.1rem; font-weight: 600;
  &:hover { background: rgba(59, 130, 246, 0.15); border-color: #3b82f6; transform: translateY(-3px); }
  svg { font-size: 1.4rem; color: #3b82f6; }
`;

export const PhoneBox = styled.a`
  display: flex; align-items: center; justify-content: center; gap: 15px;
  background: #10b981; padding: 18px; border-radius: 12px; color: white;
  text-decoration: none; font-size: 1.2rem; font-weight: 700; transition: all 0.3s;
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
  &:hover { background: #059669; transform: translateY(-3px); box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4); }
  svg { font-size: 1.4rem; }
`;

export const CloseButton = styled.button`
  position: absolute; top: 20px; right: 20px; background: transparent; border: none;
  color: #666; font-size: 1.5rem; cursor: pointer; transition: color 0.2s;
  &:hover { color: white; }
`;