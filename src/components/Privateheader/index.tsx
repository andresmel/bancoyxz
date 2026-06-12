import { LogOut, Mail, UserRound } from "lucide-react";
import { useAuth } from "../../context/AuthUserContext";
import { LogoBanck } from "../LogoBanck";
import { useNavigate } from "react-router-dom";
export const PrivateHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  console.log("User in PrivateHeader:", user);
  return (
    <>
      <nav className="relative z-20 flex items-center justify-between flex-wrap bg-sky-700 p-3 shadow-[0_10px_24px_rgba(107,114,128,0.35)]">
        <div>
          <LogoBanck />
        </div>
        <div className="flex items-center">
          <span className="text-white text-xl tracking-tight flex items-center">
            <UserRound className="mr-2" /> Bienvenido, {user?.name}
          </span>
          <span className="text-white text-xl flex items-center ml-6">
            <Mail className="mr-2" />
            {user?.email}
          </span>

          <button
            onClick={handleLogout}
            className="ml-6  hover:bg-slate-500 text-white text-gray py-2 text-xl px-4 rounded flex items-center"
          >
            <LogOut className="mr-2" /> cerrar sesion
          </button>

          <div className="ml-4 rounded-full overflow-hidden">
            <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff&size=50`} alt="Avatar" className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </nav>
    </>
  );
};
