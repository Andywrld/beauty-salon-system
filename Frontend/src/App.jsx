import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClienteForm from './components/ClienteForm';
import Gallery from './components/Gallery';
import LoginForm from './components/Login';
import Dashboard from './components/dashboard/Dasboard';
import ProtectedRoute from './routes/Protecred';
import { Layout } from './Layout/MainLayout';
import Main from './components/Main';
import { NotFound } from './components/NotFound';
import TUsuarios from './components/dashboard/tablas/TUsuarios';
import TTrabajadores from './components/dashboard/tablas/TTrabajadores';
import TProductos from './components/dashboard/tablas/TProductos';
import TServicios from './components/dashboard/tablas/TServicios';
import TCitas from './components/dashboard/tablas/TCitas';
import TPromociones from './components/dashboard/tablas/Tpromociones';
import TReseñas from './components/dashboard/tablas/TReseñas';
import TFotos from './components/dashboard/tablas/TFotos';
import ReservationForm from './components/ReservationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Página de inicio */}
          <Route index element={<Main />} />
          <Route path='reserva' element={<ReservationForm />} />
          <Route path='clienteform' element={<ClienteForm />} />
          <Route path='LoginForm' element={<LoginForm />} />
          <Route path='galeria' element={<Gallery />} />
          <Route
            path='dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path='tusuario' element={<TUsuarios />} />
            <Route path='ttrabajadores' element={<TTrabajadores />} />
            <Route path='tproductos' element={<TProductos />} />
            <Route path='tservicios' element={<TServicios />} />
            <Route path='tcitas' element={<TCitas />} />
            <Route path='tpromociones' element={<TPromociones />} />
            <Route path='treseñas' element={<TReseñas />} />
            <Route path='tfotos' element={<TFotos />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
