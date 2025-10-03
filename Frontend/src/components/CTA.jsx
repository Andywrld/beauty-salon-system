import { FaArrowRight } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CTA = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleReservationClick = () => {
    if (user) {
      navigate('/reserva');
    } else {
      navigate('/LoginForm');
    }
  };

  return (
    <section className='py-20 bg-jetBlack text-center text-lightGray'>
      <div className='max-w-screen-xl mx-auto px-6'>
        <h2 className='text-5xl md:text-5xl font-serif font-bold bg-gradient-to-r from-mustard via-yellow-400 to-mustard bg-clip-text text-transparent mb-6'>
          Transforma tu Estilo con Nuestros Servicios Exclusivos
        </h2>

        <p className='text-lg md:text-xl mb-8'>
          Descubre la experiencia exclusiva de nuestros servicios y lleva tu
          look al siguiente nivel. ¡Reserva ahora y disfruta de un trato VIP!
        </p>
        <button
          onClick={handleReservationClick}
          className='inline-flex items-center bg-mustard text-jetBlack px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-bronze hover:text-lightGray'
        >
          Reservar Ahora
          <FaArrowRight className='ml-2' />
        </button>
      </div>
    </section>
  );
};

export default CTA;
