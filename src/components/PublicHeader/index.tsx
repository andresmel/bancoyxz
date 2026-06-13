
import { Link } from "react-router-dom";
import { LogoBanck } from "../LogoBanck";
import { CircleUser } from "lucide-react";


export const PublicHeader = () => {
  return (
    <>
      <nav className="relative z-20 flex items-center justify-between flex-wrap bg-sky-700 shadow-[0_10px_24px_rgba(107,114,128,0.35)]">
        <div className="flex items-center flex-shrink-0  hover:bg-sky-600 text-white pt-[2vh] pb-[2vh]  pl-4">
          <LogoBanck/>
        </div>
        <div className="flex gap-4 text-white font-semibold text-xl mr-0 ">
          <div className="flex items-center gap-2  hover:bg-sky-600 px-4 py-2 rounded pt-[2vh] pb-[2vh] ">
            <CircleUser />
            <Link to="/login"> Iniciar Sesión</Link>
          </div>
        </div>
      </nav>
    </>
  );
};
