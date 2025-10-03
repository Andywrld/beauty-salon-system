import { FaHandshake, FaStar, FaUsers } from 'react-icons/fa';
import imgAbout from '../assets/producto1.jpg'; // Aquí puedes agregar tu imagen

const AboutSection = () => {
  return (
    <section id='sobre-nosotros' className='py-16 bg-jetBlack text-lightGray'>
      <div className='max-w-screen-xl mx-auto text-center '>
        <h2 className='text-5xl md:text-5xl font-serif font-bold bg-gradient-to-r text-center from-mustard via-yellow-400 to-mustard bg-clip-text text-transparent mb-6'>
          Sobre Nosotros
        </h2>
        <div className='w-24 h-1 bg-gradient-to-r from-transparent via-mustard to-transparent mx-auto'></div>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-16 mt-10'>
          <div className='lg:w-1/2'>
            <img
              src={imgAbout}
              alt='Nuestro equipo'
              className='w-full h-[400px] object-cover rounded-lg shadow-lg'
            />
          </div>
          <div className='lg:w-1/2 text-left'>
            <p className='text-lg mb-6'>
              Somos un equipo de profesionales dedicados a brindar un servicio
              de alta calidad para que te sientas y luzcas increíble. Nuestro
              objetivo es ofrecerte una experiencia única y personalizada, ya
              sea para un cambio de look, un cuidado especial o un momento de
              relajación.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
              <div className='flex items-center justify-center space-x-4'>
                <FaHandshake className='text-mustard text-3xl' />
                <div>
                  <h3 className='text-xl font-semibold text-lightGray'>
                    Confianza
                  </h3>
                  <p className='text-md text-lightGray'>
                    Valoramos la confianza que depositas en nosotros.
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center space-x-4'>
                <FaStar className='text-mustard text-3xl' />
                <div>
                  <h3 className='text-xl font-semibold text-lightGray'>
                    Calidad
                  </h3>
                  <p className='text-md text-lightGray'>
                    Ofrecemos lo mejor en servicios y productos.
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center space-x-4'>
                <FaUsers className='text-mustard text-3xl' />
                <div>
                  <h3 className='text-xl font-semibold text-lightGray'>
                    Equipo
                  </h3>
                  <p className='text-md text-lightGray'>
                    Un equipo de expertos comprometidos con tu satisfacción.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
