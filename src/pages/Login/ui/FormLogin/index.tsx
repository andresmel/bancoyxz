
import { Link } from "react-router-dom";
import { HeaderForm } from "../headerLogin";
import { useUserAuth } from "../../../../hooks/auth/useUserAuth";
import { useState } from "react";
import type {LoginRequest} from "../../../../models/models";
import { Loading } from "../../../../components/loading";


export const Form = () => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const {authLogin,error,loading} = useUserAuth();
   const [formData, setFormData] = useState<LoginRequest>({ email: "", password: "" });
   const email = formData.email.trim();
   const password = formData.password;
   const isEmailValid = emailRegex.test(email);
   const isPasswordValid = password.trim().length >= 3;
   const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || loading) return;
    authLogin(formData);
  }



  return (
    <>
      {loading && <Loading/>}
      <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-lg-gray-300 mt-[3vh]" onSubmit={handleSubmit}>
        <HeaderForm/>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          {formData.email.length > 0 && !isEmailValid && (
            <p className="mt-2 text-sm text-red-500">Ingrese un correo electronico valido.</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña
          </label>
          <input
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            type="password"
            placeholder="********"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            minLength={3}
            required
          />
          {formData.password.length > 0 && !isPasswordValid && (
            <p className="mt-2 text-sm text-red-500">La contrasena debe tener al menos 6 caracteres.</p>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="rounded border-gray-300" />
            Recordarme
          </label>

          <Link to="#" className="text-sm text-blue-600 hover:text-blue-700">
            ¿Olvidó su contraseña?
          </Link>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full text-white font-semibold py-3 rounded-lg transition duration-300 ${
            !isFormValid || loading
              ? "bg-[lightgray] cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Ingresar
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </>
  );
};
