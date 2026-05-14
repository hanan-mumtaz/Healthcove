import axios from 'axios';

// 1. URL Configuration
const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_ROOT = RAW_API_URL.replace(/\/$/, '');
export const API_BASE_URL = API_ROOT.endsWith('/api') ? API_ROOT : `${API_ROOT}/api`;
export const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Attach Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Handle Global Errors (New!)
API.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // If the server returns 401 (Unauthorized), the token is likely expired
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or unauthorized. Logging out...");
      
      // Clear local storage so the app doesn't keep trying the bad token
      localStorage.removeItem('token');
      localStorage.removeItem('user'); 

      // Redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;