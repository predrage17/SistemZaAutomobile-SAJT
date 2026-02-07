import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 95%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
`;

export const Button = styled(motion.button)`
  background: ${props => props.$variant === 'outline' ? 'transparent' : 'var(--primary)'};
  color: ${props => props.$variant === 'outline' ? 'var(--primary)' : '#fff'};
  border: 1px solid var(--primary);
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${props => props.$variant === 'outline' ? 'rgba(59, 130, 246, 0.1)' : 'var(--primary-hover)'};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
  }
`;

export const Card = styled(motion.div)`
  background: #1e1e24;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
    border-color: var(--primary);
  }
`;

export const CardImage = styled.div`
  height: 220px;
  width: 100%;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
  position: relative; /* Za srce/wishlist ikonicu */
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: #2b2b36;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;