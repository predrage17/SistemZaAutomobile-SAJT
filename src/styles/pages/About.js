// By: Predrag Savic 6153
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageWrapper = styled.div`
  background-color: #0f1014;
  color: white;
  overflow-x: hidden;
`;

export const Container = styled.div`
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const HeroSection = styled.div`
  height: 90vh;
  width: 100%;
  
  /* BMW M5 Teaser Image */
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)),
              url('https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/all-models/m-automobile/m5-limousine/2024/bmw-m5-sedan-teaser-01.jpg');
  
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;

  h1 {
    font-size: 4.5rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -2px;
    margin-bottom: 20px;
    background: linear-gradient(90deg, #fff, #94a3b8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media(max-width: 768px) { font-size: 3rem; }
  }

  p {
    font-size: 1.2rem;
    max-width: 700px;
    color: #cbd5e1;
    line-height: 1.6;
  }
`;

export const Section = styled.section`
  padding: 100px 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  @media(max-width: 900px) { grid-template-columns: 1fr; }
`;

export const TextBlock = styled(motion.div)`
  h2 { font-size: 2.5rem; margin-bottom: 25px; color: white; }
  p { font-size: 1.1rem; color: #9ca3af; line-height: 1.8; margin-bottom: 20px; }
  .highlight { color: #3b82f6; font-weight: 700; }
`;

export const ImageBlock = styled(motion.div)`
  img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.1);
  }
`;

export const StatsBar = styled.div`
  display: flex;
  justify-content: space-around;
  background: #18181b;
  padding: 50px 20px;
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-wrap: wrap;
  gap: 30px;

  .stat {
    text-align: center;
    h3 { font-size: 3rem; font-weight: 800; color: #3b82f6; margin-bottom: 5px; }
    p { color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem; }
  }
`;

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
`;

export const ValueCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  padding: 40px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
  transition: transform 0.3s;

  &:hover { transform: translateY(-10px); background: rgba(255,255,255,0.05); }

  svg { font-size: 2.5rem; color: #3b82f6; margin-bottom: 20px; }
  h4 { font-size: 1.4rem; margin-bottom: 15px; }
  p { color: #9ca3af; line-height: 1.6; }
`;

export const FounderSection = styled.div`
  background: linear-gradient(to right, #0f1014, #18181b);
  padding: 100px 20px;
  margin-top: 50px;
  border-top: 1px solid rgba(255,255,255,0.05);
`;

export const FounderCard = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  padding: 50px;
  display: flex;
  align-items: center;
  gap: 50px;
  position: relative;
  overflow: hidden;

  &::before {
    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 5px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  }

  @media(max-width: 800px) { flex-direction: column; text-align: center; padding: 30px; }

  img {
    width: 200px; 
    height: 200px; 
    object-fit: cover;
    border-radius: 50%;
    flex-shrink: 0;
    
    border: 4px solid rgba(59, 130, 246, 0.3);
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.1);
  }

  div {
    h3 { font-size: 2.2rem; font-weight: 800; margin-bottom: 5px; }
    h4 { color: #3b82f6; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
    p { color: #9ca3af; font-size: 1rem; line-height: 1.6; margin-bottom: 25px; font-style: italic; }
    
    .uni-badge {
      display: inline-flex; align-items: center; gap: 10px;
      background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 100px;
      font-size: 0.9rem; color: white; border: 1px solid rgba(255,255,255,0.1);
      
      svg { color: #f59e0b; }
    }
  }
`;