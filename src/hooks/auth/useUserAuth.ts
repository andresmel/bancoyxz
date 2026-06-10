import { authService, LoginRequest } from "../../services/auth/service-auth";
import { useAuth } from "../../context/AuthUserContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const authLogin = (data: LoginRequest) => {
    setLoading(true);
    setError(null);
    //simular tiempo de la peticion al servicio
    setTimeout(() => {
      try {
        const user = authService().login(data);
        login(user);
        toast.success("Login successful");
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return {
    authLogin,
    error,
    loading,
  };
};
