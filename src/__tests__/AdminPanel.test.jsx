/**
 * @file AdminPanel.test.jsx
 * @description Integration tests for the Admin Dashboard component.
 * Tests cover CRUD operations, modal interactions, and form validation logic.
 * @author Predrag Savic 6153
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import AdminPanel from '../pages/AdminPanel';

// Mocking Axios to prevent actual network requests during testing
vi.mock('axios');

/**
 * Mock data representing a single car object from the database.
 */
const mockCars = [
  { id: "1", brand: "BMW", model: "X5", year: 2022, price: 80000, mileage: 5000, fuelType: "Diesel", isActive: true, gallery: [] }
];

describe('AdminPanel Component Tests', () => {
  /**
   * Setup function running before each test.
   * Resets all mocks to ensure clean state and defines default successful responses
   * for GET, POST, PUT, and DELETE operations.
   */
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockCars });
    axios.post.mockResolvedValue({ data: {} });
    axios.put.mockResolvedValue({ data: {} });
    axios.delete.mockResolvedValue({ data: {} });
    vi.clearAllMocks();
  });

  /**
   * Test: Renders the list of cars.
   * Verifies that the component correctly fetches data on mount and renders
   * the vehicle brand and model in the table.
   */
  it('renders the list of cars', async () => {
    render(<AdminPanel />);
    // Čekamo da se pojavi tekst iz podataka, to znači da je useEffect završio
    await waitFor(() => {
      expect(screen.getByText('BMW')).toBeInTheDocument();
      expect(screen.getByText('X5')).toBeInTheDocument();
    });
  });

  /**
   * Test: Opens the add vehicle form.
   * Verifies that clicking the "Dodaj Vozilo" button correctly changes the state
   * and displays the modal form for creating a new vehicle.
   */
  it('opens the add vehicle form', async () => {
    render(<AdminPanel />);
    
    // Čekamo učitavanje
    await waitFor(() => screen.getByText('BMW'));

    const addButton = screen.getByText(/Dodaj Vozilo/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Dodaj Novo Vozilo/i)).toBeInTheDocument();
    });
  });

  /**
   * Test: Form Validation.
   * Verifies that the YUP validation schema prevents form submission when fields are empty.
   * Ensures that `axios.post` is NOT called.
   */
  it('validates form (tries to submit empty form)', async () => {
    render(<AdminPanel />);
    await waitFor(() => screen.getByText('BMW'));
    
    fireEvent.click(screen.getByText(/Dodaj Vozilo/i));

    // Klikni na Submit bez popunjavanja
    const submitBtn = screen.getByText('Dodaj');
    fireEvent.click(submitBtn);
    
    // Proveravamo da se pojavila validaciona greška (pošto nismo ništa uneli)
    // Očekujemo da se NE pozove axios.post
    await waitFor(() => {
       expect(axios.post).not.toHaveBeenCalled();
    });
  });

  /**
   * Test: Opens delete modal.
   * Verifies that clicking the delete icon does not delete immediately,
   * but opens a confirmation modal for safety.
   */
  it('opens delete modal', async () => {
    render(<AdminPanel />);
    await waitFor(() => screen.getByText('BMW'));

    // Klik na dugme za brisanje (koristimo title atribut)
    const deleteButtons = screen.getAllByTitle('Obriši');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Trajno brisanje?/i)).toBeInTheDocument();
    });
  });
});