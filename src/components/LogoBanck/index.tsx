import { Link } from "react-router-dom";
export const LogoBanck = () => {
  return (
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <img
        src="https://images.vexels.com/media/users/3/135318/isolated/preview/45939241515a561751ed6222f2012003-icono-cuadrado-de-banco.png"
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
