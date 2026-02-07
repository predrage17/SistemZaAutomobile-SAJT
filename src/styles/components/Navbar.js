// By: Predrag Savic 6153
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background: rgba(10, 11, 15, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  height: 80px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$scrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'};
`;

export const NavContainer = styled.div`
  width: 95%;
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 900;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  
  span { 
    background: linear-gradient(90deg, var(--primary) 0%, #60a5fa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const CenterMenu = styled.div`
  display: flex;
  gap: 40px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
  @media (max-width: 960px) { display: none; }
`;

export const MenuLink = styled(Link)`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${props => props.$active ? 'white' : '#94a3b8'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  transition: color 0.3s;
  text-decoration: none;

  &:hover { color: white; }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0%'};
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
  }

  &:hover::after { width: 100%; }
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
  position: relative;
`;

export const ActionButton = styled.button`
  background: ${props => props.$primary ? 'var(--primary)' : 'transparent'};
  color: ${props => props.$primary ? 'white' : 'var(--text-secondary)'};
  border: ${props => props.$primary ? 'none' : '1px solid rgba(255,255,255,0.2)'};
  padding: 10px 24px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background: ${props => props.$primary ? 'var(--primary-hover)' : 'rgba(255,255,255,0.1)'};
    color: white;
    transform: translateY(-2px);
  }
`;

export const UserDropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 16px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  span { font-weight: 600; font-size: 0.9rem; color: white; }
  svg { color: var(--primary); }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  width: 240px;
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  padding: 8px;
  display: flex;
  flex-direction: column;
  z-index: 2000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
`;

export const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  color: #ccc;
  font-size: 0.9rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    padding-left: 18px;
  }

  svg { font-size: 1rem; }
`;

export const LogoutItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  width: 100%;
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  margin-top: 5px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    padding-left: 18px;
  }
`;