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


export interface TransferRequest {
  value: number;
  currency: string;
  payeerDocument: string;
  transferDate: string;
}

export interface TransferResponse {
  status: "success" | "error";
}


export interface TransferHistoryResponse {
  message: string;
  transfers: TransferItem[];
}

export interface TransferItem {
  value: number;
  date: string;
  currency: string;
  payeer: Payeer;
}

export interface Payeer {
  document: string;
  name: string;
}