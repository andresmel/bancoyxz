import type { LoginRequest, LoginResponse } from "../../models/models";
import { endpointAuth } from "../../api/endpoint";

  const login = async (request: LoginRequest): Promise<LoginResponse> => {
     const response = await endpointAuth.login(request);
     console.log("Login response:", response);
     return response.data;

  };

  export const authService = {
    login,
  };


  