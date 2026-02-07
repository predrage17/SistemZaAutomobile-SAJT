// By: Predrag Savic 6153
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  background: linear-gradient(to top, #020203, #0f1014);
  padding: 80px 0 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: auto;
  position: relative;
  overflow: hidden;

  /* Glow effect at the top */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 200px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;

export const Content = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 60px;
  padding: 0 20px;

  @media(max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`;

export const BrandSection = styled.div`
  p {
    color: #94a3b8;
    font-size: 1rem;
    line-height: 1.8;
    margin-bottom: 25px;
    max-width: 400px;
    
    @media(max-width: 900px) { margin: 0 auto 25px; }
  }
`;

export const SectionHeader = styled.h3`
  color: white;
  margin-bottom: 25px;
  font-size: 1.3rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media(max-width: 900px) { justify-content: center; }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  color: #94a3b8;
  font-size: 0.95rem;
  transition: 0.3s;

  @media(max-width: 900px) { justify-content: center; }

  svg { 
    color: #3b82f6; 
    font-size: 1.2rem; 
    margin-top: 3px;
  }

  a {
    color: #94a3b8;
    text-decoration: none;
    transition: 0.3s;
    &:hover { color: white; }
  }
`;

export const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 900;
  color: white;
  display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
  text-decoration: none;
  
  @media(max-width: 900px) { justify-content: center; }

  span { 
    background: linear-gradient(90deg, var(--primary) 0%, #60a5fa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const SocialIcons = styled.div`
  display: flex; gap: 15px;
  
  @media(max-width: 900px) { justify-content: center; }

  a {
    width: 45px; height: 45px;
    background: rgba(255,255,255,0.05);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: white;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255,255,255,0.05);

    &:hover {
      background: var(--primary);
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
      border-color: var(--primary);
    }
  }
`;

export const HoursList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    display: flex;
    justify-content: space-between;
    color: #94a3b8;
    padding: 10px 0;
    border-bottom: 1px dashed rgba(255,255,255,0.1);
    font-size: 0.95rem;

    span:first-child { color: white; font-weight: 500; }
  }
`;

export const BottomBar = styled.div`
  text-align: center;
  margin-top: 80px;
  padding-top: 30px;
  border-top: 1px solid rgba(255,255,255,0.05);
  color: #64748b;
  font-size: 0.9rem;
  
  span { color: #3b82f6; }
`;