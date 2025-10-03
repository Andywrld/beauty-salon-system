import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col overflow-hidden'>
      <Header />

      <main className='flex-grow'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
