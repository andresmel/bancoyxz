import { Link } from "react-router-dom";

export const PublicHeader = () => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-sky-700 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/onboarding" className="font-semibold text-xl tracking-tight">
            Bienvenido Al banco XYZ
          </Link>
        </div>
        <div className="flex gap-4 text-white font-semibold text-xl">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
    </>
  );
};
