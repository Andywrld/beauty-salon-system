import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/Logo1.svg'

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolling
          ? 'bg-charcoal bg-opacity-95 shadow-lg'
          : 'bg-white bg-opacity-10 backdrop-blur-md'
      }`}
    >
      <div className='flex justify-between items-center px-6 md:px-12 py-2'>
        <h1 className='text-2xl md:text-4xl font-serif font-bold text-mustard tracking-wider'>
          <Link to='/'> 
            <img src={logo} alt="Nuestro equipo" className="w-[200px] h-[80px] object-cover"/>
          </Link>
        </h1>

        <button
          className='md:hidden text-mustard focus:outline-none'
          onClick={toggleMenu}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        c

        <nav className='hidden md:block'>
          <ul className='flex space-x-4 md:space-x-8 items-center'>
            {['Inicio', 'Servicios', 'Contacto'].map((item) => (
              <li key={item}>
                <a
                  href={`/#${item.toLowerCase()}`}
                  className='text-lightGray uppercase text-sm md:text-base tracking-wider hover:text-mustard transition-colors duration-300'
                >
                  {item}
                </a>
              </li>
            ))}

            {/* Muestra el enlace "Admin" si el usuario está logueado y tiene rol de admin */}
            {user && user.rol === 'admin' && (
              <li>
                <Link
                  to='/dashboard/tusuario'
                  className='text-lightGray uppercase text-sm md:text-base tracking-wider hover:text-mustard transition-colors duration-300'
                >
                  Admin
                </Link>
              </li>
            )}

            {user ? (
              <>
                <li className='text-lightGray text-sm md:text-base font-semibold'>
                  {user.usuario}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className='text-lightGray border border-mustard px-3 md:px-4 py-1 md:py-2 rounded-lg text-sm md:text-base hover:bg-mustard hover:text-jetBlack transition-all duration-300'
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to='/LoginForm'
                    className='text-lightGray border border-mustard px-3 md:px-4 py-1 md:py-2 rounded-lg text-sm md:text-base hover:bg-mustard hover:text-jetBlack transition-all duration-300'
                  >
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link
                    to='/clienteform'
                    className='text-lightGray bg-mustard px-3 md:px-4 py-1 md:py-2 rounded-lg text-sm md:text-base hover:bg-bronze transition-all duration-300'
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className='md:hidden bg-jetBlack bg-opacity-95 backdrop-blur-md shadow-lg absolute top-16 left-0 w-full'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className='flex flex-col space-y-6 items-center py-8'>
              {['Inicio', 'Servicios', 'Contacto'].map((item) => (
                <li key={item}>
                  <a
                    href={`/#${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className='text-lightGray uppercase text-lg tracking-wider hover:text-mustard transition-colors duration-300'
                  >
                    {item}
                  </a>
                </li>
              ))}

              {user && user.rol === 'admin' && (
                <li>
                  <Link
                    to='/dashboard'
                    onClick={() => setIsOpen(false)}
                    className='text-lightGray uppercase text-sm md:text-base tracking-wider hover:text-mustard transition-colors duration-300'
                  >
                    Admin
                  </Link>
                </li>
              )}

              {user ? (
                <>
                  <li className='text-lightGray text-lg font-semibold'>
                    {user.usuario}
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className='text-lightGray border border-mustard px-4 py-2 rounded-lg text-lg hover:bg-mustard hover:text-jetBlack transition-all duration-300'
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to='/LoginForm'
                      onClick={() => setIsOpen(false)}
                      className='text-lightGray border border-mustard px-4 py-2 rounded-lg text-lg hover:bg-mustard hover:text-jetBlack transition-all duration-300'
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/clienteform'
                      onClick={() => setIsOpen(false)}
                      className='text-lightGray bg-mustard px-4 py-2 rounded-lg text-lg hover:bg-bronze transition-all duration-300'
                    >
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
