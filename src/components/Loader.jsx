// src/components/Loader.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100%;
`;

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(59, 130, 246, 0.2);
  border-top: 4px solid #3b82f6; // Tvoja primarna plava boja
  border-radius: 50%;
`;

const LoadingText = styled(motion.p)`
  margin-top: 20px;
  color: #9ca3af;
  font-size: 1.1rem;
  letter-spacing: 1px;
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <Spinner
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <LoadingText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
      >
        Učitavanje salona...
      </LoadingText>
    </LoaderWrapper>
  );
};

export default Loader;