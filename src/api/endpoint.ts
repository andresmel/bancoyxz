import { axiosAuth, axiosBalance, axiosTransfer } from './axiosConfig';
import type { LoginRequest, RegisterRequest, TransferRequest } from '../models/models';

export const endpointAuth = {
  login: (data: LoginRequest) => axiosAuth.post('/login', data),
  register: (data: RegisterRequest) => axiosAuth.post('/register', data)
};

export const endpointBalance = {
  getBalance: () => axiosBalance.get('/balance'),  // ← proxy maneja la URL
};


export const endpointTransfer = {
  setTransfer: (data: TransferRequest) => axiosTransfer.post('/transfer', data),  // ← proxy maneja la URL
};
