import { useState, useEffect } from 'react';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { GetAllResennas, useDeleteResennas } from '../../../api/ResennaApi';
import ConfirmationModal from '../../../ui/confirmGeneric';
import toast, { Toaster } from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

const TResennas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // Mejor nombrar selectedId y tipar como null o número
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setOpen] = useState(false);

  // Obtener todas las reseñas
  const { data: AllResennas = [] } = GetAllResennas();
  const { mutate: deleteResenna } = useDeleteResennas();

  // Cálculo de paginación
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = AllResennas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(
    1,
    Math.ceil(AllResennas.length / ITEMS_PER_PAGE)
  );

  // Si cambian los datos (AllResennas) y la página actual excede el totalPages,
  // reajustamos la página a totalPages para no quedar en página vacía.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [AllResennas.length, totalPages, currentPage]);

  const handlePageChange = (pageNumber) => {
    // Validar límites
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const openConfirmModal = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteResenna(selectedId, {
      onSuccess: () => {
        toast.success('Reseña eliminada');
      },
    });
    setOpen(false);
  };

  const handleCancelDelete = () => {
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <div className='bg-jetBlack text-lightGray p-6 rounded-lg shadow-lg mt-20'>
      {/* Toaster para notificaciones */}
      <Toaster />

      <h2 className='text-3xl font-serif font-bold text-mustard mb-6'>
        Gestión de Reseñas
      </h2>

      {/* Aquí podrías tener formulario de creación/edición de reseña si aplica */}

      {/* Tabla de reseñas */}
      <div className='overflow-x-auto'>
        <table className='w-full bg-gray-800 rounded-lg'>
          <thead>
            <tr className='text-mustard'>
              <th className='py-2 px-4 text-left'>Usuario</th>
              <th className='py-2 px-4 text-left'>Clasificación</th>
              <th className='py-2 px-4 text-left'>Comentario</th>
              <th className='py-2 px-4 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={4} className='py-4 text-center text-gray-400'>
                  No hay reseñas en esta página.
                </td>
              </tr>
            ) : (
              currentItems.map((reseña) => (
                <tr
                  key={reseña.id}
                  className='border-t border-gray-700 hover:bg-gray-700 transition'
                >
                  <td className='py-2 px-4'>{reseña.usuario.nombre}</td>
                  <td className='py-2 px-4'>{reseña.clasificacion}</td>
                  <td className='py-2 px-4'>{reseña.comentario}</td>
                  <td className='py-2 px-4 flex justify-center gap-3'>
                    <button
                      onClick={() => openConfirmModal(reseña.id)}
                      className='text-red-500 hover:text-red-400 transition'
                      aria-label={`Eliminar reseña ${reseña.id}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de Paginación */}
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

      {/* Modal de confirmación */}
      {isOpen && (
        <ConfirmationModal
          isOpen={isOpen}
          title='Confirmar Eliminación'
          message='¿Estás seguro de que deseas eliminar esta reseña?'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default TResennas;
