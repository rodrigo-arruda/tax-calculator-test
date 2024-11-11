import axios from 'axios';

const BASE_URL = 'http://localhost:5001';
const API_URL = `${BASE_URL}/tax-calculator/tax-year/`;

// TODO: USE IT
export const fetchTaxRates = async (year: number) => {
  try {
    const response = await axios.get(`${API_URL}${year}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tax rates:', error);
    throw new Error('Failed to fetch tax rates. Please try again later.');
  }
};

export const fetchTaxRateByYear = async (year: number) => {
  try {
    const response = await axios.get(`${API_URL}${year}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tax rates:', error);
    throw new Error('Failed to fetch tax rates. Please try again later.');
  }
};
