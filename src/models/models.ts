export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  photo: string;
}


export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
}



export interface BalanceResponse {
  currency: string;
  accountBalance: number;
}
