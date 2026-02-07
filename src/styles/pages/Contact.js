// By: Predrag Savic 6153
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Input } from '../global/SharedComponents';

export const PageWrapper = styled.div`
  min-height: 85vh;
  padding-top: 80px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Premium background with overlay */
  background: linear-gradient(rgba(5, 8, 16, 0.85), rgba(5, 8, 16, 0.95)), 
              url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop');
  background-size: cover;
  background-position: center;

  @media (max-height: 800px) {
    padding-top: 120px;
    align-items: flex-start;
  }
`;

export const ContactCard = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  padding: 40px;
  
  /* Glassmorphism Effect */
  background: rgba(24, 24, 27, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;

  /* Top shine border */
  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 35px;

  .icon-wrapper {
    width: 70px; height: 70px;
    background: rgba(59, 130, 246, 0.15);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    color: var(--primary);
    font-size: 1.8rem;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
  }

  h2 { font-size: 2rem; font-weight: 800; color: white; margin-bottom: 8px; }
  p { color: #9ca3af; font-size: 0.95rem; }
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
  position: relative;

  label {
    display: block; margin-bottom: 8px; color: #d1d5db; font-size: 0.9rem; font-weight: 500; margin-left: 4px;
  }

  /* Icon positioning inside input */
  svg {
    position: absolute; left: 16px; top: 42px; color: #6b7280; font-size: 1rem; transition: 0.3s; pointer-events: none;
  }

  /* Specific adjustment for textarea icon */
  &.textarea-group svg { top: 42px; }

  &:focus-within svg { color: var(--primary); }
`;

export const StyledInput = styled(Input)`
  padding-left: 45px; 
  height: 50px; 
  background: rgba(0, 0, 0, 0.3); 
  border-color: rgba(255, 255, 255, 0.1); 
  font-size: 1rem; 
  transition: 0.3s;
  
  &:focus { 
    background: rgba(0, 0, 0, 0.5); 
    border-color: var(--primary); 
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15); 
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 15px 15px 15px 45px; /* Padding for icon */
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: 0.3s;

  &:focus {
    outline: none;
    background: rgba(0, 0, 0, 0.5);
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
  }
`;

export const SuccessBox = styled(motion.div)`
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(16, 185, 129, 0.3);
  text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  margin-bottom: 20px;
  
  svg { font-size: 2rem; }
  h4 { margin: 0; font-size: 1.1rem; }
`;

export const LoginPrompt = styled.div`
  text-align: center; 
  padding: 20px;
  h3 { margin-bottom: 10px; }
  p { color: #aaa; margin-bottom: 25px; }
`;