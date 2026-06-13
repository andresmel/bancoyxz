import { useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    title: "CDT Banco XYZ",
    description: "Invierta en CDT con rentabilidad competitiva y respaldo financiero."
  },
  {
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1200&q=80",
    title: "Cajita de Ahorro",
    description: "Obtenga una tasa de hasta 11.4% E.A. y haga crecer su dinero."
  },
  {
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
    title: "Préstamo Libre Inversión",
    description: "Financie sus proyectos personales con tasas preferenciales."
  }
];

export const BalanceCarousel = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-[70%] mx-auto mt-[10vh]">
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <img
          src={slides[current].image}
          alt={slides[current].title}
          className="w-full h-[30vh] object-cover"
          fetchPriority="high"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
          <h2 className="text-3xl font-bold text-white">
            {slides[current].title}
          </h2>

          <p className="text-white mt-2">
            {slides[current].description}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              current === index
                ? "bg-blue-600"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};