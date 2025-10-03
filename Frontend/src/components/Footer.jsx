import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
// import Logo from '../assets/icons.png';
import logo from '../assets/Logo1.svg'

const Footer = () => {
  return (
    <footer className='bg-jetBlack text-lightGray py-12 px-6'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Logo y Descripción */}
        <div className='col-span-1 flex flex-col items-center sm:items-start'>
          <div className='flex items-center mb-4 justify-center sm:justify-start'>
            <img src={logo} alt="Nuestro equipo" className="w-[200px] h-[80px] object-cover"/>
          </div>
          <p className='text-center sm:text-start text-lightGray text-lg font-medium'>
            Un oasis de belleza y bienestar. Déjanos resaltar tu belleza con
            nuestros servicios exclusivos.
          </p>
        </div>

        {/* Enlaces Rápidos */}
        <div className='sm:col-span-1 flex flex-col items-center sm:items-start'>
          <h3 className='text-lg font-semibold text-mustard mb-4'>
            Enlaces Rápidos
          </h3>
          <ul>
            <li>
              <a
                href='#services'
                className='hover:text-mustard block text-lightGray'
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href='#about'
                className='hover:text-mustard block text-lightGray'
              >
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a
                href='#faq'
                className='hover:text-mustard block text-lightGray'
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div className='col-span-1 flex flex-col items-center sm:items-start'>
          <h3 className='text-lg font-semibold text-mustard mb-4'>Síguenos</h3>
          <div className='flex space-x-6 justify-center sm:justify-start'>
            <a
              href='https://facebook.com'
              className='text-lightGray hover:text-mustard'
            >
              <FaFacebookF className='w-6 h-6' />
            </a>
            <a
              href='https://twitter.com'
              className='text-lightGray hover:text-mustard'
            >
              <FaTwitter className='w-6 h-6' />
            </a>
            <a
              href='https://instagram.com'
              className='text-lightGray hover:text-mustard'
            >
              <FaInstagram className='w-6 h-6' />
            </a>
          </div>
        </div>

        {/* Información de Contacto */}
        <div
          className='col-span-1 flex flex-col items-center sm:items-start'
          id='contacto'
        >
          <h3 className='text-lg font-semibold text-mustard mb-4'>
            Contáctanos
          </h3>
          <ul>
            <li className='mb-2 text-lightGray'>
              <span className='font-bold'>Dirección:</span> Calle Falsa 123,
              Ciudad de Belleza
            </li>
            <li className='mb-2 text-lightGray'>
              <span className='font-bold'>Teléfono:</span> +53 5555555
            </li>
            <li className='text-lightGray'>
              <span className='font-bold'>Email:</span> contacto@ryal.com
            </li>
          </ul>
        </div>
      </div>

      <div className='border-t border-gray-700 mt-8 pt-4'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center text-center sm:text-start'>
          <p className='text-lightGray'>
            © 2025 RYAL. Todos los derechos reservados.
          </p>
          <div className='flex space-x-6 mt-4 md:mt-0'>
            <a href='#privacy' className='hover:text-mustard text-lightGray'>
              Política de Privacidad
            </a>
            <a href='#terms' className='hover:text-mustard text-lightGray'>
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
