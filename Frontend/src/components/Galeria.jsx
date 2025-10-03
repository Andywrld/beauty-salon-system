'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GetAllPhoto } from '../api/GaleriaApi';

const Galeria = () => {
  const swiperRef = useRef(null);

  const { data: AllPhotos = [] } = GetAllPhoto();

  const AllPhotoSlice = AllPhotos.slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id='trabajos' className='py-20 bg-jetBlack text-gray-100'>
      <div className='max-w-7xl mx-auto px-6 text-center'>
        <div className='mb-16'>
          <h2 className='text-5xl md:text-5xl font-serif font-bold bg-gradient-to-r from-mustard via-yellow-400 to-mustard bg-clip-text text-transparent mb-6'>
            Trabajos Destacados
          </h2>
          <div className='w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto opacity-80'></div>
        </div>

        <div className='relative group'>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className='absolute top-1/2 -left-4 transform -translate-y-1/2 w-12 h-12 bg-amber-400/90 backdrop-blur-sm text-gray-900 rounded-full shadow-2xl hover:bg-amber-300 hover:scale-110 transition-all duration-300 z-20 opacity-0 group-hover:opacity-100 flex items-center justify-center'
          >
            <FaChevronLeft className='text-lg' />
          </button>

          <div className='px-4'>
            <Swiper
              ref={swiperRef}
              modules={[Pagination, A11y]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{
                clickable: true,
                bulletClass:
                  'swiper-pagination-bullet !bg-amber-400/60 !w-3 !h-3',
                bulletActiveClass:
                  'swiper-pagination-bullet-active !bg-amber-400 !scale-125',
              }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 32 },
              }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className='pb-16'
            >
              {AllPhotoSlice.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className='relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-amber-400/20 border border-gray-700/30'>
                    <div className='aspect-[4/3] overflow-hidden'>
                      <img
                        src={item.imag || '/placeholder.svg'}
                        alt={`Imagen ${item.id}`}
                        className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'
                      />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className='absolute top-1/2 -right-4 transform -translate-y-1/2 w-12 h-12 bg-amber-400/90 backdrop-blur-sm text-gray-900 rounded-full shadow-2xl hover:bg-amber-300 hover:scale-110 transition-all duration-300 z-20 opacity-0 group-hover:opacity-100 flex items-center justify-center'
          >
            <FaChevronRight className='text-lg' />
          </button>
        </div>

        <div className='mt-12'>
          <Link
            to='./galeria/'
            className='inline-flex items-center px-8 py-3 bg-transparent border-2 border-amber-400/60 text-amber-400 font-medium rounded-full hover:bg-amber-400 hover:text-gray-900 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/25 backdrop-blur-sm'
          >
            Ver más Imágenes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Galeria;
