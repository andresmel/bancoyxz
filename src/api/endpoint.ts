
import {axiosInstance } from './axiosConfig';
import type {LoginRequest,RegisterRequest} from '../models/models';


const endpointAuth = {
  login: (data: LoginRequest) => axiosInstance.post('/login', data),
  register: (data: RegisterRequest) => axiosInstance.post('/register', data)
};


export { endpointAuth};
