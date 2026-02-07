import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg-dark: #0f1014;
    --bg-card: #18191f;
    --primary: #3b82f6;
    --primary-hover: #2563eb;
    --text-main: #ffffff;
    --text-secondary: #9ca3af;
    --accent: #10b981;
    --danger: #ef4444;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    background-color: var(--bg-dark);
    color: var(--text-main);
    font-family: 'Inter', sans-serif;
    overflow-x: hidden; /* Sprečava horizontalni skrol */
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; border: none; font-family: inherit; }
  ul { list-style: none; }
`;