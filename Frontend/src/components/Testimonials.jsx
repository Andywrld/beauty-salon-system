// src/components/Testimonials.jsx
import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ModalNotification } from './Modal';
import { GetAllResennas, useCreateResenna } from '../api/ResennaApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster } from 'react-hot-toast';

const testimonialSchema = z.object({
  usuario_id: z.string().optional(),
  comentario: z.string().max('Debe tener máximo 100 caracteres'),
  clasificacion: z
    .number({ invalid_type_error: 'La clasificación debe ser un número' })
    .min(1, 'La clasificación mínima es 1')
    .max(5, 'La clasificación máxima es 5'),
});

const userid = localStorage.getItem('id');

const Testimonials = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: AllResennas = [] } = GetAllResennas();
  const { mutate: createResenna } = useCreateResenna();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      usuario_id: userid,
      comentario: '',
      clasificacion: 5,
    },
  });

  const onSubmit = (data) => {
    createResenna(data);
    reset();
    setCurrentTestimonial(0);
  };

  useEffect(() => {
    if (!AllResennas.length) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((i) => (i + 1) % AllResennas.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [AllResennas.length]);

  return (
    <section
      id='testimonios'
      className='bg-jetBlack text-lightGray py-16 px-6 md:px-16'
    >
      <Toaster />
      <ModalNotification
        color='#f44336'
        message='Debes estar autenticado primero'
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />

      <h2 className='text-5xl md:text-5xl font-serif font-bold bg-gradient-to-r text-center from-mustard via-yellow-400 to-mustard bg-clip-text text-transparent mb-6'>
        Reseñas
      </h2>
      <div className='w-24 h-1 bg-gradient-to-r from-transparent via-mustard to-transparent mx-auto'></div>

      <div className='flex flex-col lg:flex-row justify-center items-center gap-12'>
        <div className='w-full lg:w-1/2'>
          {AllResennas.length ? (
            <div className='overflow-hidden rounded-2xl shadow-xl bg-jetBlack p-8 flex items-center justify-center'>
              <motion.div
                key={AllResennas[currentTestimonial].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                className='text-center'
              >
                <p className='text-2xl font-serif font-bold text-mustard mb-4'>
                  {AllResennas[currentTestimonial].usuario?.nombre}
                </p>
                <p className='text-lg italic mb-6'>
                  {AllResennas[currentTestimonial]?.comentario}
                </p>
                <div className='flex justify-center'>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < AllResennas[currentTestimonial].clasificacion
                          ? 'text-mustard'
                          : 'text-gray-400'
                      }
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <p>Cargando Reseña...</p>
          )}
        </div>

        {/* Formulario de nueva reseña */}
        <div className='w-full lg:w-1/2 bg-jetBlack p-8 rounded-2xl shadow-xl'>
          <h3 className='text-2xl font-serif font-bold text-mustard mb-6 text-center tracking-wide'>
            Deja tu Reseña
          </h3>
          <form
            className='flex flex-col gap-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor='comentario' className='block mb-2 font-semibold'>
                Comentario:
              </label>
              <textarea
                id='comentario'
                name='comentario'
                rows='5'
                {...register('comentario')}
                required
                className='w-full p-4 rounded-lg bg-gray-800'
                placeholder='Escribe tu testimonio...'
              />
              {errors.comentario && (
                <p className='text-red-400 text-sm mt-2'>
                  {errors.comentario.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='clasificacion'
                className='block mb-2 font-semibold'
              >
                Clasificación:
              </label>
              <select
                id='clasificacion'
                name='clasificacion'
                {...register('clasificacion', {
                  valueAsNumber: true,
                })}
                defaultValue={5}
                required
                className='w-full p-4 rounded-lg bg-gray-800'
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <button
              type='submit'
              className='bg-mustard text-jetBlack p-4 rounded-xl hover:bg-bronze transition mt-6'
            >
              Enviar Reseña
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
