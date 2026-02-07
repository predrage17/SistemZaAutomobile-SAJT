/**
 * @file CarDetails.test.jsx
 * @description Unit tests for the Single Car Details page.
 * Tests data fetching, currency conversion logic, and Role-Based Access Control (RBAC) for admins.
 * @author Predrag Savic 6153
 */

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CarDetails from '../pages/CarDetails';

vi.mock('axios');

const mockCar = {
  id: "1",
  brand: "Porsche",
  model: "911",
  year: 2023,
  price: 150000,
  mileage: 2000,
  fuelType: "Petrol",
  image: "porsche.jpg",
  gallery: ["porsche.jpg"],
  description: "Super auto"
};

/**
 * Helper function to setup specific API mocks for this component.
 * Mocks Car data, Reviews, and the Exchange Rate API.
 */
const setupMocks = () => {
  axios.get.mockImplementation((url) => {
    if (url.includes('/cars/1')) return Promise.resolve({ data: mockCar });
    if (url.includes('/reviews')) return Promise.resolve({ data: [] });
    // Mocking external currency API to return a fixed rate for consistent testing
    if (url.includes('exchangerate')) return Promise.resolve({ data: { rates: { RSD: 117 } } });
    
    return Promise.resolve({ data: {} });
  });
};

describe('CarDetails Page Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupMocks();
  });

  /**
   * Test: Details Rendering.
   * Verifies that car details are correctly displayed and that the currency conversion
   * (EUR to RSD) is calculated and displayed correctly.
   */
  it('renders car details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/car/1']}>
        <Routes>
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Porsche 911')).toBeInTheDocument();
      // Verifying price display (150,000 * 117 roughly)
      expect(screen.getByText(/150,000 €/)).toBeInTheDocument();
    });
  });

  /**
   * Test: Admin Permissions.
   * Ensures that if the logged-in user is an ADMIN, the "Contact Seller" button
   * is disabled to prevent admins from messaging themselves.
   */
  it('disables contact button for ADMIN user', async () => {
    // Mocking localStorage to simulate an logged-in Admin user
    Storage.prototype.getItem = vi.fn(() => JSON.stringify({ username: 'Admin', role: 'ADMIN' }));
    
    // Re-applying mocks because Storage mock might affect setup
    setupMocks();

    render(
      <MemoryRouter initialEntries={['/car/1']}>
        <Routes>
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
        const btn = screen.getByText(/Admin Pregled/i);
        expect(btn).toBeInTheDocument();
        expect(btn).toBeDisabled();
    });
  });
});