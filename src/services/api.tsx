import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
});

// Automatically add the Auth token to every request if it exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // ✅ Using config.headers.Authorization ensures compatibility across axios versions
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // ✅ Added error handling for the request interceptor
    return Promise.reject(error);
  }
);

export default API;