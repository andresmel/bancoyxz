import { axiosInstance } from './axiosConfig';
import type { LoginRequest, RegisterRequest } from '../models/models';

export const endpointAuth = {
  login: (data: LoginRequest) => axiosInstance.post('/login', data),
  register: (data: RegisterRequest) => axiosInstance.post('/register', data)
};

export const endpointBalance = {
  getBalance: () => axiosInstance.get('/balance'),  // ← proxy maneja la URL
};
