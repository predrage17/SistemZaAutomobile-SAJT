// By: Predrag Savic 6153
import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding-top: 50px; 
  padding-bottom: 50px;
  min-height: 100vh;
  background-color: #0f1014;
  color: white;
  width: 95%;
  max-width: 1600px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);

  h1 { font-size: 2.2rem; font-weight: 800; color: white; letter-spacing: -1px; margin-bottom: 5px; }
  p { color: #9ca3af; font-size: 0.95rem; }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;

  @media(max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StatCard = styled.div`
  background: #18181b;
  padding: 25px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  
  div {
    h4 { color: #a1a1aa; font-size: 0.8rem; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
    p { font-size: 1.6rem; font-weight: 800; color: white; margin: 0; }
  }
  
  .icon-box {
    width: 50px; height: 50px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
  }
`;

export const MainContent = styled.div`
  background: #18181b;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
  min-height: 500px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate; 
  border-spacing: 0 10px;
  
  th { 
    text-align: left; 
    padding: 15px; 
    color: #9ca3af; 
    font-size: 0.8rem; 
    font-weight: 700;
    text-transform: uppercase; 
    letter-spacing: 1px;
  }
  
  td { 
    padding: 15px; 
    background: #202025;
    vertical-align: middle;
    border-top: 1px solid rgba(255,255,255,0.03);
    border-bottom: 1px solid rgba(255,255,255,0.03);
  }

  tr td:first-child { border-top-left-radius: 10px; border-bottom-left-radius: 10px; border-left: 1px solid rgba(255,255,255,0.03); }
  tr td:last-child { border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-right: 1px solid rgba(255,255,255,0.03); }

  .price { color: #3b82f6; font-weight: 800; font-size: 1.1rem; }
  
  img { 
    width: 80px; 
    height: 50px; 
    object-fit: cover; 
    border-radius: 6px; 
    display: block;
    background-color: #333;
  }
  
  .status-active { color: #10b981; font-weight: 600; font-size: 0.9rem; }
  .status-inactive { color: #ef4444; font-weight: 600; font-size: 0.9rem; }
`;

export const ActionButton = styled.button`
  width: 40px; 
  height: 40px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.2s;
  border: none;
  font-size: 1rem;

  background: ${props => props.$variant === 'edit' ? '#3b82f6' : props.$variant === 'delete' ? '#ef4444' : 'rgba(255,255,255,0.1)'};
  color: ${props => props.$active ? '#10b981' : props.$active === false ? '#6b7280' : 'white'};
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);

  &:hover { 
    transform: translateY(-2px); 
    filter: brightness(1.2);
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  background: #2b2b36; 
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }

  option {
    background: #18181b;
    color: white;
  }
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
  border: 1px solid rgba(255, 255, 255, 0.1); width: 90%; max-width: 400px;
  text-align: center; position: relative; box-shadow: 0 25px 50px rgba(0,0,0,0.6);
  h3 { font-size: 1.5rem; margin-bottom: 10px; color: white; }
  p { color: #a1a1aa; margin-bottom: 30px; font-size: 1rem; line-height: 1.5; }
  
  .warning-icon { 
    font-size: 3rem; color: #f59e0b; margin-bottom: 20px; 
    background: rgba(245, 158, 11, 0.1); padding: 15px; border-radius: 50%;
  }
`;

// --- SUCCESS BOX (NOVO) ---
export const SuccessBox = styled(ModalBox)`
  border-color: rgba(16, 185, 129, 0.3);
  .success-icon { 
    font-size: 3.5rem; color: #10b981; margin-bottom: 20px; 
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
  }
  @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
`;

export const ModalActions = styled.div`
  display: flex; gap: 15px;
`;

export const ConfirmButton = styled.button`
  flex: 1; padding: 12px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer;
  background: #ef4444; color: white; transition: 0.2s;
  &:hover { background: #dc2626; }
`;

export const CancelButton = styled.button`
  flex: 1; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); 
  background: transparent; color: white; font-weight: 600; cursor: pointer; transition: 0.2s;
  &:hover { background: rgba(255,255,255,0.05); }
`;

// --- FORM STYLES ---
export const FormOverlay = styled.div`
  background: #202025; padding: 40px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
`;

export const FormHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;
  h3 { font-size: 1.5rem; color: white; display: flex; align-items: center; gap: 10px; }
`;

export const FormSection = styled.div`
  margin-bottom: 25px;
  h4 { color: #3b82f6; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 1px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  label { display: block; margin-bottom: 8px; font-size: 0.9rem; color: #ccc; font-weight: 600; }
  span { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }
  textarea { width: 100%; padding: 12px 16px; background: #2b2b36; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; font-family: inherit; resize: vertical; min-height: 100px; &:focus { outline: none; border-color: var(--primary); } }
`;

export const GridInputs = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  @media(max-width: 600px) { grid-template-columns: 1fr; }
`;