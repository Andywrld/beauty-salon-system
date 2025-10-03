import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { LoginApi } from '../api/authApi';
import { zodResolver } from '@hookform/resolvers/zod';

function LoginForm() {
  const schemaLogin = z.object({
    username: z.string(),
    password: z.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schemaLogin),
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await LoginApi(data);

      localStorage.setItem('accessToken', response.access);
      localStorage.setItem('refreshToken', response.refresh);

      login(response.username);
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.response?.data?.non_field_errors) {
        setError('username', {
          type: 'manual',
          message: error.response.data.non_field_errors[0],
        });
        setError('password', {
          type: 'manual',
          message: error.response.data.non_field_errors[0],
        });
      } else {
        console.error('Error desconocido:', error);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className='min-h-screen bg-jetBlack py-16 px-6 flex items-center justify-center'>
      <motion.div
        className='max-w-md w-full bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl p-8'
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='text-4xl text-mustard font-serif font-bold text-center mb-10'>
          Iniciar Sesión
        </h2>

        {errors && errors.m}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label
              className='block text-lightGray font-medium mb-2'
              htmlFor='username'
            >
              Usuario
            </label>
            <input
              type='text'
              name='username'
              id='username'
              className='w-full p-4 rounded-lg bg-transparent border border-bronze text-lightGray placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mustard transition-all'
              required
              {...register('username')}
            />
            {errors.username && (
              <p className='text-red-400 text-sm'>{errors.username.message}</p>
            )}
          </div>

          <div>
            <label
              className='block text-lightGray font-medium mb-2'
              htmlFor='password'
            >
              Contraseña
            </label>
            <input
              type='password'
              name='password'
              id='password'
              {...register('password')}
              className='w-full p-4 rounded-lg bg-transparent border border-bronze text-lightGray placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mustard transition-all'
              required
            />
            {errors.password && (
              <p className='text-red-400 text-sm'>{errors.password.message}</p>
            )}
          </div>
          <div className='flex justify-center'>
            <button className='bg-mustard  text-jetBlack font-bold py-4 px-8 rounded-lg'>
              Iniciar Sesión
            </button>
          </div>
          <div className='flex justify-center'>
            <Link to={'/clienteform'} className='text-lightGray  py-6  '>
              No tengo una cuenta
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginForm;
