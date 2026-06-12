import { MarqeeProducts } from "../MarqueeProducts";
import { SocialNetwork } from "../SocialNetwork";

export const Welcome = () => {
  return (
    <>
      <div className="w-full h-full">
        <div className="onboarding-content  overflow-hidden flex">
          <div className="w-[70%] ">
            <img
              src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1200&q=80"
              alt="Banco XYZ"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[30%] p-10 flex flex-col justify-center ">
            <h1 className="text-3xl font-bold text-gray-500 bg-gray-100 flex justify-center rounded-10 p-4 items-center">
            <img
            src="https://images.vexels.com/media/users/3/135318/isolated/preview/45939241515a561751ed6222f2012003-icono-cuadrado-de-banco.png"
              alt="Logo Banco XYZ"
              className="w-7 h-7 mr-2"
            />
              Bienvenido a XYZ
            </h1>

            <p className="w-full text-gray-600 text-lg leading-relaxed border-3 mt-6 mb-6 text-justify">
              En Banco XYZ trabajamos cada día para ofrecer soluciones
              financieras innovadoras, seguras y accesibles. Nuestro compromiso
              es acompañarte en cada etapa de tu vida, ayudándote a tomar
              mejores decisiones financieras mediante productos diseñados para
              impulsar tus proyectos, proteger tu patrimonio y hacer crecer tus
              oportunidades.
            </p>
            <MarqeeProducts />
            <SocialNetwork />
          </div>
        </div>
      </div>
    </>
  );
};
