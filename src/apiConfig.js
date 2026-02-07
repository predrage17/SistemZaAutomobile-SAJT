// src/apiConfig.js
// By: Predrag Savic 6153

export const API_CONFIG = {
  BIN_ID: '6987a18143b1c97be96d3056', 
  API_KEY: '$2a$10$SoYUgflGrjm24xIC3ZkKOe4.Szkv3jqJgijUxMDb4WTfCnhp/V6PS', 
  BASE_URL: 'https://api.jsonbin.io/v3/b'
};

/**
 * Pomoćna funkcija za generisanje URL-a za čitanje (GET)
 * Dodaje /latest da bismo uvek dobili najnovije podatke
 */
export const getFullUrl = () => `${API_CONFIG.BASE_URL}/${API_CONFIG.BIN_ID}/latest`;

/**
 * Pomoćna funkcija za URL za upisivanje (PUT)
 */
export const getUpdateUrl = () => `${API_CONFIG.BASE_URL}/${API_CONFIG.BIN_ID}`;

/**
 * Headeri koji su obavezni za svaki poziv ka JSONBin-u
 */
export const getHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Master-Key': API_CONFIG.API_KEY
});