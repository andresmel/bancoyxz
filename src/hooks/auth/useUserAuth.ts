import { authService } from "../../services/auth/service-auth";
import type { LoginRequest } from "../../models/models";


import { useAuth } from "../../context/AuthUserContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const authLogin = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);
      try {
        const { token, user } = await authService.login(data);
        localStorage.setItem('bancoxyz_token', token);
        login(user);
        toast.success("bem-sucedido.");
        // navigate("/dashboard");
      } catch (err:any) {
         console.error("Login error:", err);
         const message = err.response?.data?.message || "Login falhou";
         setError(message);
         toast.error(message);
      } finally {
        setLoading(false);
      }
  };

  return {
    authLogin,
    error,
    loading,
  };
};
