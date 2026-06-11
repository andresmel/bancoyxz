import { Link } from "react-router-dom";
export const LogoBanck = () => {
  return (
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
       Banco XYZ
      </Link>
    </div>
  );
};
