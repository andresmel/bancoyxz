

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

export interface accountDetails {
  id: number;
  id_user: number;
  account_number: string;
  balance: number;
  product_type: string;
  createdAt: Date;
  updatedAt: Date;
}



export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
    id:number, 
    name:string, 
    email:string
}

export interface account_details{
    id:number
    id_user:number
    account_number:string
    balance:number
    product_type:string
    createdAt:Date
    updatedAt:Date
}