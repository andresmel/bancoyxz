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

  return (
    <>
      <nav className="relative flex items-center justify-between flex-wrap bg-sky-700 shadow-[0_10px_24px_rgba(107,114,128,0.35)]">
        <div className="p-[2vh] bg-sky-900">
          <LogoBanck />
        </div>
        <div className="flex items-center">
          <span className="text-white text-xl tracking-tight flex items-center p-[2vh]  bg-sky-600">
            <UserRound className="mr-2" /> {user?.name}
          </span>
          <span className="text-white text-xl flex items-center pt-[2vh] p-[2vh]   bg-sky-800">
            <Mail className="mr-2" />
            {user?.email}
          </span>

          <button
            onClick={handleLogout}
            className="  hover:bg-slate-500 text-white text-gray p-[2vh]  text-xl px-4 rounded flex items-center bg-sky-900"
          >
            <LogOut className="mr-2" /> cerrar sesion
          </button>

          <div className="mr-2 ml-3 rounded-full overflow-hidden ">
            <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff&size=50`} title={user?.name} alt="Avatar" className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </nav>
    </>
  );
};
