import axios, { AxiosInstance } from 'axios';

const createInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('bancoxyz_token');
    const publicRoutes = ['/login', '/register'];
    const isPublic = publicRoutes.some(route => config.url?.includes(route));
    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('bancoxyz_user');
        localStorage.removeItem('bancoxyz_token');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
// vercel
export const axiosAuth = createInstance(process.env.REACT_APP_API_URL || '');
export const axiosBalance = createInstance(process.env.REACT_APP_BALANCE_URL || '');
export const axiosTransfer = createInstance(process.env.REACT_APP_TRANSFER_URL || '');
export const axiosTransferList = createInstance(process.env.REACT_APP_TRANSFER_LIST_URL || '');