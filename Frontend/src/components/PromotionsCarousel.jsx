import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GetAllPromociones } from '../api/PromocionesApi';

const PromotionsBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: AllPromotions = [] } = GetAllPromociones();

  // Actualizar la promoción cada 7 segundos
  useEffect(() => {
    if (AllPromotions.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AllPromotions.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [AllPromotions.length]);

  if (AllPromotions.length === 0) return null;

  return (
    <div className='w-full px-8 py-4 bg-jetBlack shadow-md '>
      <div className=' mx-auto text-center'>
        <h2 className='text-5xl md:text-5xl font-serif font-bold bg-gradient-to-r from-mustard via-yellow-400 to-mustard bg-clip-text text-transparent mb-6'>
          Promociones 
        </h2>
         <div className='w-24 h-1 bg-gradient-to-r from-transparent via-mustard to-transparent mx-auto'></div>
      </div>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className='flex items-center justify-between space-x-8'
        >
          {/* Contenedor de la Promoción */}
          <div className='flex flex-col space-y-2'>
            <span className='text-lg md:text-2xl font-semibold text-mustard uppercase tracking-wide'>
              {AllPromotions[currentIndex].nombre}
            </span>
            <span className='text-sm md:text-base text-lightGray'>
              {AllPromotions[currentIndex].descripcion}
            </span>
          </div>

          {/* Información del Servicio y Descuento */}
          <div className='flex flex-col items-end space-y-2'>
            <span className='block text-2xl font-bold text-mustard'>
              {AllPromotions[currentIndex].porcientoDesc}% OFF
            </span>
            <span className='text-sm md:text-base text-lightGray'>
              <span className='font-semibold text-white'>Servicio:</span>{' '}
              {AllPromotions[currentIndex]?.servicio.nombre || 'Cargando...'}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PromotionsBar;
