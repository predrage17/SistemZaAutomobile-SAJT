/**
 * @file Home.test.jsx
 * @description Integration tests for the Home (Showroom) page.
 * Tests cover data fetching, search filtering, and empty state handling.
 * @author Predrag Savic 6153
 */

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Home from '../pages/Home';

vi.mock('axios');

const mockCars = [
  {
    id: "1",
    brand: "BMW",
    model: "M5",
    year: 2024,
    price: 135000,
    mileage: 1000,
    fuelType: "Petrol",
    isActive: true,
    image: "test.jpg"
  },
  {
    id: "2",
    brand: "Audi",
    model: "A4",
    year: 2020,
    price: 30000,
    mileage: 50000,
    fuelType: "Diesel",
    isActive: true,
    image: "test2.jpg"
  }
];

describe('Home Page Tests', () => {
  /**
   * Resets mocks and sets up the default GET response with mock data.
   */
  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockCars });
  });

  /**
   * Test: Initial Render.
   * Checks if the Hero section text is present and if the car cards are rendered
   * after the API call resolves.
   */
  it('renders correctly and fetches cars', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Provera statičkog teksta
    expect(screen.getByText(/PRONAĐI SVOJU ZVER/i)).toBeInTheDocument();

    // Čekamo da se podaci učitaju
    await waitFor(() => {
      expect(screen.getByText('BMW M5')).toBeInTheDocument();
      expect(screen.getByText('Audi A4')).toBeInTheDocument();
    });
  });

  /**
   * Test: Search Filtering.
   * Simulates user typing into the search bar and verifies that the list
   * is filtered correctly (BMW remains, Audi disappears).
   */
  it('filters cars by search text', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('BMW M5'));

    // Unesi tekst u pretragu
    const searchInput = screen.getByPlaceholderText(/Marka, Model.../i);
    fireEvent.change(searchInput, { target: { value: 'BMW' } });

    // Čekamo da React osveži DOM i skloni Audi
    await waitFor(() => {
      expect(screen.getByText('BMW M5')).toBeInTheDocument();
      expect(screen.queryByText('Audi A4')).not.toBeInTheDocument();
    });
  });

  /**
   * Test: Empty State.
   * Verifies that a user-friendly message is displayed when no cars match the filter.
   */
  it('shows no results message when filter matches nothing', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('BMW M5'));

    const searchInput = screen.getByPlaceholderText(/Marka, Model.../i);
    fireEvent.change(searchInput, { target: { value: 'Yugo' } });

    await waitFor(() => {
      expect(screen.getByText(/Nema vozila koja odgovaraju pretrazi/i)).toBeInTheDocument();
    });
  });
});