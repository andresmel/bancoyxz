import { MarqeeProducts } from "../MarqueeProducts";
import { SocialNetwork } from "../SocialNetwork";

export const Welcome = () => {
  return (
    <>
      <div className="w-full h-full overflow-y-hidden">
        <div className="onboarding-content flex">
          <div className="w-[70%] h-[93vh]">
            <img
              src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1200&q=80"
              alt="Banco XYZ"
              className="w-full  object-cover"
            />
          </div>
          <div className="w-[30%] p-10 flex flex-col justify-center ">
            <h1 className="text-4xl font-bold text-gray-800  flex justify-center rounded-10 p-4 items-center mb-[4vh]">
            <img
            src="https://images.vexels.com/media/users/3/135318/isolated/preview/45939241515a561751ed6222f2012003-icono-cuadrado-de-banco.png"
              alt="Logo Banco XYZ"
              className="w-7 h-7 mr-2 rounded-full"
            />
              Bienvenido a XYZ
            </h1>

            <p className="w-full text-gray-600 text-lg leading-relaxed border-3 text-justify mb-[4vh] mt-[4vh]">
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
