import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Services = () => {
  const [services, setServices] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/servicios/") // Ajusta la URL si es necesario
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error al cargar servicios:", error));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section id="servicios" className="py-16 bg-jetBlack text-lightGray">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-mustard mb-12 animate-fade-in-up">
          Nuestros Servicios
        </h2>
        <div className="relative">
          {/* Carrusel de imágenes con animaciones */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            <motion.div
              className="flex"
              animate={{ x: -currentSlide * 100 + "%" }}
              transition={{ type: "tween", duration: 0.5 }}
            >
              {services.map((service) => (
                <div key={service.id} className="w-full flex-shrink-0">
                  <motion.img
                    src={service.imag}
                    alt={service.nombre}
                    className="w-full h-96 object-cover rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-semibold text-mustard mb-4">
                      {service.nombre}
                    </h3>
                    <p className="text-lg text-lightGray mb-4">
                      {service.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Botones de Navegación */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4">
            <button
              onClick={prevSlide}
              className="bg-mustard text-jetBlack p-2 rounded-full shadow-lg hover:bg-bronze transition-all duration-300"
            >
              <FaChevronLeft className="text-xl" />
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4">
            <button
              onClick={nextSlide}
              className="bg-mustard text-jetBlack p-2 rounded-full shadow-lg hover:bg-bronze transition-all duration-300"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
