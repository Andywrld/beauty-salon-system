import { useState, useEffect } from 'react';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../../api/axios';

const ITEMS_PER_PAGE = 5;

const TCitas = () => {
  const [citas, setCitas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    usuarioid: '',
    servicioid: '',
    fecha: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga inicial
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        await Promise.all([fetchUsuarios(), fetchServicios()]);
        await fetchCitas();
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  //peticiones con axios
  const fetchUsuarios = async () => {
    const res = await api.get('/usuarios/');
    setUsuarios(res.data);
  };

  const fetchServicios = async () => {
    const res = await api.get('/servicios/');
    setServicios(res.data);
  };

  const fetchCitas = async () => {
    const res = await api.get('/citas/');
    setCitas(res.data);
  };

  //actualiza la data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  //si editing esta activo actualiza
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { usuarioid, servicioid, fecha } = formData;
    if (!usuarioid || !servicioid || !fecha) {
      setError('Usuario, servicio y fecha son obligatorios');
      return;
    }
    const payload = {
      customer: Number(usuarioid),
      service: Number(servicioid),
      start: new Date(fecha).toISOString(),
    };
    try {
      if (editingId) {
        await api.put(`/citas/${editingId}/`, payload);
      } else {
        await api.post('/citas/', payload);
      }
      setEditingId(null);
      setFormData({ usuarioid: '', servicioid: '', fecha: '' });
      await fetchCitas();
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al guardar la cita');
    }
  };
  
  //edita la cita
  const handleEdit = (cita) => {
    setEditingId(cita.id);
    const usuario = usuarios.find((u) => u.id === cita.customer);
    const servicio = servicios.find((s) => s.id === cita.service);

    setFormData({
      usuarioid: usuario.id.toString(),
      servicioid: servicio.id.toString(),
      fecha: cita.start.slice(0, 16),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/citas/${id}/`);
      await fetchCitas();
    } catch {
      setError('No se pudo eliminar la cita');
    }
  };

  // Paginación
  const lastIdx = currentPage * ITEMS_PER_PAGE;
  const firstIdx = lastIdx - ITEMS_PER_PAGE;
  const currentItems = citas.slice(firstIdx, lastIdx);
  const totalPages = Math.ceil(citas.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <p className='text-mustard text-xl'>Cargando datos…</p>
      </div>
    );
  }

  return (
    <div className='bg-jetBlack text-lightGray p-6 rounded-lg shadow-lg mt-20'>
      <h2 className='text-3xl font-serif font-bold text-mustard mb-6'>
        Gestión de Citas
      </h2>

      {error && (
        <div className='bg-red-500 text-white p-3 rounded-lg mb-4'>{error}</div>
      )}

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className='bg-gray-800 p-4 rounded-lg shadow mb-6'
      >
        <div className='grid grid-cols-2 gap-4'>
          <select
            name='usuarioid'
            value={formData.usuarioid}
            onChange={handleInputChange}
            className='p-2 bg-gray-700 text-lightGray rounded-md'
            required
          >
            <option value=''>Seleccione un usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} {u.apellidos}
              </option>
            ))}
          </select>

          <select
            name='servicioid'
            value={formData.servicioid}
            onChange={handleInputChange}
            className='p-2 bg-gray-700 text-lightGray rounded-md'
            required
          >
            <option value=''>Seleccione un servicio</option>
            {servicios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre} — ${s.precio}
              </option>
            ))}
          </select>

          <input
            type='datetime-local'
            name='fecha'
            value={formData.fecha}
            onChange={handleInputChange}
            className='p-2 bg-gray-700 text-lightGray rounded-md'
            required
          />
        </div>

        <button
          type='submit'
          className='mt-4 w-full bg-mustard text-jetBlack py-2 rounded-lg font-semibold hover:bg-yellow-600 transition'
        >
          {editingId ? 'Actualizar Cita' : 'Agregar Cita'}
        </button>
      </form>

      {/* Tabla de citas */}
      <div className='overflow-x-auto'>
        <table className='w-full bg-gray-800 rounded-lg'>
          <thead>
            <tr className='text-mustard'>
              <th className='py-2 px-4 text-left'>Usuario</th>
              <th className='py-2 px-4 text-left'>Servicio</th>
              <th className='py-2 px-4 text-left'>Fecha</th>
              <th className='py-2 px-4 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length ? (
              currentItems.map((cita) => {
                const usuarioObj = usuarios.find((u) => u.id === cita.customer);
                const servicioObj = servicios.find(
                  (s) => s.id === cita.service
                );

                return (
                  <tr
                    key={cita.id}
                    className='border-t border-gray-700 hover:bg-gray-700 transition'
                  >
                    <td className='py-2 px-4'>
                      {usuarioObj
                        ? `${usuarioObj.nombre} ${usuarioObj.apellidos}`
                        : `ID ${cita.customer}`}
                    </td>
                    <td className='py-2 px-4'>
                      {servicioObj ? servicioObj.nombre : `ID ${cita.service}`}
                    </td>
                    <td className='py-2 px-4'>
                      {new Date(cita.start).toLocaleString()}
                    </td>
                    <td className='py-2 px-4 flex justify-center gap-3'>
                      <button
                        onClick={() => handleEdit(cita)}
                        className='text-mustard hover:text-yellow-500 transition'
                        aria-label='Editar'
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(cita.id)}
                        className='text-red-500 hover:text-red-400 transition'
                        aria-label='Eliminar'
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan='4' className='py-4 text-center'>
                  No hay citas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {citas.length > ITEMS_PER_PAGE && (
        <div className='flex justify-center items-center gap-4 mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-mustard text-jetBlack hover:bg-yellow-500'
            }`}
            aria-label='Página anterior'
          >
            <ChevronLeft size={20} />
          </button>

          <span className='text-lightGray'>
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-mustard text-jetBlack hover:bg-yellow-500'
            }`}
            aria-label='Página siguiente'
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TCitas;
