import {  User } from './../../data/repository';
import repository from "../../data/repository";

export interface LoginRequest{
    email:string
    password:string
}

export const authService =()=>{ 

     const { users } = repository();

     const login = (request:LoginRequest)=>{
        const user = users.find((u:User)=>u.email === request.email && u.password === request.password);
        if(!user) throw new Error("Invalid email or password");
        return user;
     }

     return{
        login
     }

};