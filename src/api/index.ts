import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

export const apiTaskClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: 'applicaiton/json',
    'Content-Type': 'application/json',
  },
});
