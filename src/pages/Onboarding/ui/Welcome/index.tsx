export const Welcome = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100" >
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden" style={{ marginTop: '-50px' }}>
          <div className="grid md:grid-cols-2">
            <div>
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                alt="Sector bancario"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="p-10 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Bienvenido al Banco XYZ
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed">
                En Banco XYZ trabajamos cada día para ofrecer soluciones
                financieras innovadoras, seguras y accesibles. Nuestro
                compromiso es acompañarte en cada etapa de tu vida, brindándote
                productos de ahorro, inversión y crédito diseñados para ayudarte
                a alcanzar tus metas personales y empresariales con confianza y
                tranquilidad.
              </p>
              <button className="mt-6 w-48 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Conocer más
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
