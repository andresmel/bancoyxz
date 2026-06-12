
import { Link } from "react-router-dom";
import { LogoBanck } from "../LogoBanck";
import { CircleUser } from "lucide-react";


export const PublicHeader = () => {
  return (
    <>
      <nav className="relative z-20 flex items-center justify-between flex-wrap bg-sky-700 p-3 shadow-[0_10px_24px_rgba(107,114,128,0.35)]">
        <div>
          <LogoBanck/>
        </div>
        <div className="flex gap-4 text-white font-semibold text-xl mr-5">
          <div className="flex items-center gap-2">
            <CircleUser />
            <Link to="/login"> Iniciar Sesión</Link>
          </div>
        </div>
      </nav>
    </>
  );
};
