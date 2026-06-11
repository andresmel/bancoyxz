import { Link } from "react-router-dom";


export const PublicHeader = () => {
  return (
    <>
      <nav className="relative z-20 flex items-center justify-between flex-wrap bg-sky-700 p-3 shadow-[0_10px_24px_rgba(107,114,128,0.35)]">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img 
          src="https://cdn3d.iconscout.com/3d/premium/thumb/banco-3d-icon-png-download-5407863.png" 
          width={40}
          height={40}
          loading="lazy"
          alt="Logo" 
          className="mr-2"
          />
          <Link to="/onboarding" className="font-semibold text-xl tracking-tight">
            Bienvenido Al banco XYZ
          </Link>
        </div>
        <div className="flex gap-4 text-white font-semibold text-xl mr-5">
          <Link to="/login">Login</Link>
        </div>
      </nav>
    </>
  );
};
