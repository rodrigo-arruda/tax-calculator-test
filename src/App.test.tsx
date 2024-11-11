import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { fetchTaxRateByYear } from './services/api';
import { ITaxBand } from './types';
import { calculateTaxes } from './utils';

jest.mock('./services/api');
const mockFetchTaxRateByYear = fetchTaxRateByYear as jest.MockedFunction<typeof fetchTaxRateByYear>;

jest.mock('./utils');
const mockCalculateTaxes = calculateTaxes as jest.MockedFunction<typeof calculateTaxes>;

describe('App Component', () => {
  it('renders correctly and displays results when "Calculate" is clicked', async () => {
    const mockTaxBands: ITaxBand[] = [
      { rate: 0.1, min: 0, max: 10000 },
      { rate: 0.2, min: 10000, max: 20000 }
    ];

    const mockResult = {
      totalTaxes: 3000,
      taxesPerBand: [
        { band: mockTaxBands[0], tax: 1000 },
        { band: mockTaxBands[1], tax: 2000 }
      ],
      effectiveRate: 0.15
    };

    mockFetchTaxRateByYear.mockResolvedValue({ tax_brackets: mockTaxBands });

    // Mock the implementation of calculateTaxes
    mockCalculateTaxes.mockReturnValue(mockResult);

    render(<App />);

    // Verify that the initial UI is rendered correctly
    expect(screen.getByText('Tax Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText('Year')).toBeInTheDocument();
    expect(screen.getByLabelText('Salary')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();

    // Simulate selecting a year and entering a salary
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2022' } });
    fireEvent.change(screen.getByLabelText('Salary'), { target: { value: '20000' } });

    // Simulate clicking the "Calculate" button
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    // Wait for the results to be displayed
    await waitFor(() => {
      expect(screen.getByText('Total Taxes Owed: 3000.00')).toBeInTheDocument();
      expect(screen.getByText('Effective Tax Rate: 15.00%')).toBeInTheDocument();
      expect(screen.getByText('Band: 0 - 10000')).toBeInTheDocument();
      expect(screen.getByText('Rate: 10 %')).toBeInTheDocument();
      expect(screen.getByText('Tax: 1000.00')).toBeInTheDocument();
      expect(screen.getByText('Band: 10000 - 20000')).toBeInTheDocument();
      expect(screen.getByText('Rate: 20 %')).toBeInTheDocument();
      expect(screen.getByText('Tax: 2000.00')).toBeInTheDocument();
    });
  });

  it('displays an error message when tax rates cannot be fetched', async () => {
    // Mock the implementation of fetchTaxRateByYear to reject the promise
    mockFetchTaxRateByYear.mockRejectedValue(new Error('Failed to fetch tax rates'));

    render(<App />);

    // Verify that the initial UI is rendered correctly
    expect(screen.getByText('Tax Calculator')).toBeInTheDocument();

    // Simulate selecting a year
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2022' } });

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch tax rates')).toBeInTheDocument();
    });
  });
});
