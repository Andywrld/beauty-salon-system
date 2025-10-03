import { useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { GetAllPromociones } from '../api/PromocionesApi';
import { useService } from '../hook/reactQuery/useService ';
import { useNavigate } from 'react-router-dom';

// Mock functions

const CalcularPorCiento = (precio, descuento) => {
  const numericPrice = Number.parseFloat(precio.replace('$', ''));
  const discountedPrice = numericPrice - (numericPrice * descuento) / 100;
  return `$${discountedPrice.toFixed(2)}`;
};

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { useGetAllService } = useService();
  const navigate = useNavigate();

  const { data: AllPromotions = [], isLoading } = GetAllPromociones();
  const { data: AllServices = [] } = useGetAllService();

  const promoByServiceId = useMemo(() => {
    const map = new Map();
    AllPromotions.forEach((p) => {
      if (p?.servicio?.id != null) map.set(p.servicio.id, p);
    });
    return map;
  }, [AllPromotions]);

  if (isLoading)
    return (
      <div className='flex items-center justify-center min-h-screen bg-jetBlack'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-mustard'></div>
      </div>
    );

  if (!AllServices.length)
    return (
      <div className='flex items-center justify-center min-h-screen bg-jetBlack text-lightGray text-xl'>
        No hay servicios disponibles.
      </div>
    );

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % AllServices.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + AllServices.length) % AllServices.length
    );

  return (
    <section
      id='servicios'
      className='py-20 bg-jetBlack text-lightGray overflow-hidden'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-5xl md:text-5xl font-serif font-bold bg-gradient-to-r from-mustard via-yellow-400 to-mustard bg-clip-text text-transparent mb-6'>
            Nuestros Servicios
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-transparent via-mustard to-transparent mx-auto'></div>
        </motion.div>

        {/* Carousel Container */}
        <div className='relative max-w-5xl mx-auto'>
          {/* Main Carousel */}
          <div
            className='relative overflow-hidden rounded-3xl shadow-2xl
+                bg-gradient-to-br from-gray-800 to-gray-900
+                backdrop-blur-sm border border-gray-700
+                h-[600px]'
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentSlide}
                className='absolute inset-0 w-full h-full' 
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {AllServices.map((service, index) => {
                  if (index !== currentSlide) return null;

                  const promotion = promoByServiceId.get(service.id);
                  const precioConDescuento = promotion
                    ? CalcularPorCiento(service.precio, promotion.porcientoDesc)
                    : service.precio;

                  return (
                    <div
                      key={service.id}
                      className='grid md:grid-cols-2 gap-0 min-h-[600px]'
                    >
                      {/* Image Section */}
                      <div className='relative overflow-hidden group'>
                        <motion.img
                          src={service.imagen}
                          alt={service.nombre}
                          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.8 }}
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>

                        {/* Precio Promocion */}
                        {promotion && (
                          <motion.div
                            className='absolute top-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg'
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              delay: 0.5,
                              type: 'spring',
                              stiffness: 300,
                            }}
                          >
                            -{promotion.porcientoDesc}% OFF
                          </motion.div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className='p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm'>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                        >
                          <h3 className='text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-mustard to-yellow-400 bg-clip-text text-transparent mb-6'>
                            {service.nombre}
                          </h3>

                          <p className='text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light'>
                            {service.descripcion}
                          </p>

                          {/* Pricing */}
                          <div className='space-y-4'>
                            <div className='flex items-center gap-4'>
                              <span
                                className={`text-xl font-semibold ${
                                  promotion
                                    ? 'line-through text-gray-500'
                                    : 'text-mustard'
                                }`}
                              >
                                $ {''} {service.precio}
                              </span>
                              {promotion && (
                                <motion.span
                                  className='text-2xl font-bold text-mustard'
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    delay: 0.6,
                                    type: 'spring',
                                    stiffness: 300,
                                  }}
                                >
                                  {precioConDescuento}
                                </motion.span>
                              )}
                            </div>

                            {promotion && (
                              <motion.div
                                className='inline-block bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-medium'
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                              >
                                ¡Oferta Especial!
                              </motion.div>
                            )}
                          </div>

                          {/* CTA Button */}
                          <motion.button
                            className='mt-8 bg-gradient-to-r from-mustard to-yellow-500 text-jetBlack px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-yellow-400 hover:to-mustard'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/reserva')}
                          >
                            Reservar Ahora
                          </motion.button>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            className='absolute top-1/2 -left-6 -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-mustard to-yellow-500 text-jetBlack rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110 z-10'
          >
            <FaChevronLeft className='text-xl group-hover:-translate-x-0.5 transition-transform' />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className='absolute top-1/2 -right-6 -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-mustard to-yellow-500 text-jetBlack rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110 z-10'
          >
            <FaChevronRight className='text-xl group-hover:translate-x-0.5 transition-transform' />
          </motion.button>

          {/* Slide Indicators */}
          <div className='flex justify-center mt-8 space-x-3'>
            {AllServices.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-mustard shadow-lg scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className='mt-6 w-full bg-gray-700 rounded-full h-1 overflow-hidden'>
            <motion.div
              className='h-full bg-gradient-to-r from-mustard to-yellow-500'
              initial={{ width: 0 }}
              animate={{
                width: `${((currentSlide + 1) / AllServices.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Service Counter */}
        <motion.div
          className='text-center mt-8 text-gray-400'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className='text-mustard font-bold text-lg'>
            {currentSlide + 1}
          </span>
          <span className='mx-2'>/</span>
          <span>{AllServices.length}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
