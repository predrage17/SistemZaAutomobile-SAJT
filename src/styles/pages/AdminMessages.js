// By: Predrag Savic 6153
import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding-top: 120px;
  min-height: 100vh;
  background-color: #0f1014;
  color: white;
  width: 95%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  h1 { font-size: 2rem; font-weight: 800; display: flex; align-items: center; gap: 10px; }
  svg { color: #f59e0b; }
`;

export const MessagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
`;

export const MessageCard = styled.div`
  background: #18181b;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
  transition: transform 0.2s;
  &:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.1); }
`;

export const CardHeader = styled.div`
  display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;
`;

export const UserInfo = styled.div`
  display: flex; align-items: center; gap: 12px;
  
  .avatar { 
    width: 45px; height: 45px; 
    background: rgba(59, 130, 246, 0.1); 
    border-radius: 50%; 
    display: flex; align-items: center; justify-content: center; 
    color: var(--primary);
    font-size: 1.2rem;
  }
  
  .details {
    h4 { font-size: 1rem; color: white; margin: 0 0 3px 0; font-weight: 700; }
    
    .email { 
      font-size: 0.85rem; color: #3b82f6; display: flex; align-items: center; gap: 5px; 
      margin-bottom: 2px;
    }
    
    .date { 
      font-size: 0.75rem; color: #6b7280; display: flex; align-items: center; gap: 5px; 
    }
  }
`;

export const MessageBody = styled.p`
  color: #d1d5db; line-height: 1.6; font-size: 0.95rem; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; margin-bottom: 15px;
`;

export const DeleteButton = styled.button`
  background: rgba(239, 68, 68, 0.1); color: #ef4444; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 0.85rem; transition: 0.2s;
  &:hover { background: rgba(239, 68, 68, 0.2); }
`;