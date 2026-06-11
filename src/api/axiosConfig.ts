import axios from 'axios';

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {

  const token = localStorage.getItem('bancoxyz_token');
  console.log("Request URL:", config.url);
  console.log("Request Token:", token);

  const publicRoutes = ['/login', '/register'];
  const isPublic = publicRoutes.some(route => config.url?.includes(route));

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('bancoxyz_user');
      localStorage.removeItem('bancoxyz_token');
    }
    return Promise.reject(error);
  }
);

export {};