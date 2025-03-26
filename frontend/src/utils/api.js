import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making request:', config.method, config.url); // Debug log
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Received response:', response.status, response.data); // Debug log
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error
      switch (error.response.status) {
        case 400:
          console.error('Bad request:', error.response.data);
          throw new Error(error.response.data.detail || 'Invalid request');
        case 404:
          console.error('Resource not found:', error.response.data);
          throw new Error(error.response.data.detail || 'Pagri not found');
        case 500:
          console.error('Server error:', error.response.data);
          throw new Error(error.response.data.detail || 'Server error');
        default:
          console.error('API error:', error.response.data);
          throw new Error('An unexpected error occurred');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response received:', error.request);
      throw new Error('No response from server');
    } else {
      // Error in request setup
      console.error('Request setup error:', error.message);
      throw new Error('Failed to make request');
    }
  }
);

// API methods
export const getPagris = async () => {
  try {
    const response = await api.get('/pagris');
    return response.data;
  } catch (error) {
    console.error('Error in getPagris:', error);
    throw error;
  }
};

export const getPagriById = async (id) => {
  if (!id) {
    throw new Error('Pagri ID is required');
  }
  
  try {
    console.log('Fetching pagri with ID:', id); // Debug log
    const response = await api.get(`/pagris/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getPagriById:', error);
    throw error;
  }
};

export const createPagri = async (pagriData) => {
  try {
    const response = await api.post('/pagris', pagriData);
    return response.data;
  } catch (error) {
    console.error('Error in createPagri:', error);
    throw error;
  }
};

export default api; 