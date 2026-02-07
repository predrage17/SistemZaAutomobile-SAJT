// By: Predrag Savic 6153
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Input } from '../global/SharedComponents';

export const PageWrapper = styled.div`
  min-height: 85vh;
  padding-top: 80px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* Pozadinska slika sa tamnim overlay-om */
  background: linear-gradient(rgba(5, 8, 16, 0.8), rgba(5, 8, 16, 0.9)), 
              url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  
  @media (max-height: 800px) { padding-top: 100px; align-items: flex-start; }
`;

export const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 35px;
  
  /* Glassmorphism */
  background: rgba(24, 24, 27, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: visible;

  /* Top shine border */
  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }
`;

// --- TOOLTIP STILOVI ---
export const HelpWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 50;
  cursor: help;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.3s;

  &:hover {
    color: var(--primary);
    .tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
  }
`;

export const TooltipBox = styled.div`
  position: absolute;
  top: 30px;
  right: -10px;
  width: 280px;
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 12px;
  font-size: 0.85rem;
  color: #ccc;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px) scale(0.95);
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  box-shadow: 0 10px 30px rgba(0,0,0,0.8);
  z-index: 100;

  h4 { color: white; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; font-size: 0.9rem; }
  
  .account-group {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed rgba(255,255,255,0.1);
    &:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  }

  .header-row {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;
  }

  strong { color: #3b82f6; }
  span { color: #10b981; font-family: monospace; background: rgba(255,255,255,0.05); padding: 2px 4px; borderRadius: 4px; }
`;

export const FillButton = styled.button`
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  cursor: pointer;
  display: flex; align-items: center; gap: 4px;
  transition: 0.2s;

  &:hover { background: rgba(16, 185, 129, 0.4); color: white; }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  h2 { font-size: 1.8rem; font-weight: 800; color: white; margin-bottom: 5px; }
  p { color: #9ca3af; font-size: 0.9rem; }
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
  position: relative;
  label { display: block; margin-bottom: 6px; color: #d1d5db; font-size: 0.85rem; font-weight: 600; margin-left: 4px; }
  svg { position: absolute; left: 14px; top: 38px; color: #6b7280; font-size: 0.9rem; transition: 0.3s; pointer-events: none; }
  &:focus-within svg { color: var(--primary); }
`;

export const StyledInput = styled(Input)`
  padding-left: 40px; height: 45px; background: rgba(0, 0, 0, 0.3); border-color: rgba(255, 255, 255, 0.1); font-size: 0.95rem;
  &:focus { background: rgba(0, 0, 0, 0.5); border-color: var(--primary); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
  &::-webkit-calendar-picker-indicator { filter: invert(1); cursor: pointer; }
`;

export const ErrorMessage = styled(motion.div)`
  background: rgba(239, 68, 68, 0.15); color: #fca5a5; padding: 10px; border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.3); text-align: center; font-size: 0.85rem; margin-bottom: 20px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
`;

export const SwitchText = styled.p`
  text-align: center; margin-top: 20px; font-size: 0.9rem; color: #9ca3af;
  span { color: var(--primary); cursor: pointer; font-weight: 600; margin-left: 5px; &:hover { text-decoration: underline; } }
`;