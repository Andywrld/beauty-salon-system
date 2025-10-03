import { useState } from 'react';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { GetAllPromociones } from '../../../api/PromocionesApi';

import { useService } from '../../../hook/reactQuery/useService ';
import { useForm } from 'react-hook-form';
import { schemapromociones } from '../../../schema/model.schema.promociones';
import {
  useCreateTPromociones,
  useDeletePromociones,
  useUpdatePromociones,
} from '../../../hook/reactQuery/usePromociones';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import ConfirmationModal from '../../../ui/confirmGeneric';

const ITEMS_PER_PAGE = 5;

const TPromociones = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [editingId, setEditingId] = useState(null);

  const { useGetAllService } = useService();
  const [isOpen, setIsOpen] = useState(false);

  const { data: AllPromociones = [] } = GetAllPromociones();
  const { data: AllService = [] } = useGetAllService();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemapromociones),
  });

  const { mutate: createPromociones } = useCreateTPromociones();
  const { mutate: updatePromociones } = useUpdatePromociones();
  const { mutate: deleteTetimonials } = useDeletePromociones();

  const onSubmit = (data) => {
    if (editingId) {
      updatePromociones(
        { id: editingId, data: data },
        {
          onSuccess: () => {
            setEditingId(null);
            reset({
              nombre: '',
              descripcion: '',
              servicio: '',
              porcientoDesc: '',
            });
            toast.success('Promocion actualizada con éxito');
          },
        }
      );
    } else {
      createPromociones(data, {
        onSettled: () => {
          toast.success('Promoción creada');
          reset();
        },
      });
    }
  };

  // Calcular promociones para la página actual
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = AllPromociones.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(AllPromociones.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='bg-jetBlack text-lightGray p-6 rounded-lg shadow-lg mt-20'>
      <h2 className='text-3xl font-serif font-bold text-mustard mb-6'>
        Gestión de Promociones
      </h2>

      <Toaster />

      {/* Formulario de promoción */}
      <form
        className='bg-gray-800 p-4 rounded-lg shadow mb-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <input
              type='text'
              name='nombre'
              placeholder='Nombre de la promoción'
              className='p-2 bg-gray-700 text-lightGray rounded-md w-full block'
              required
              {...register('nombre')}
            />

            {errors.nombre && (
              <span className='text-red-500'> {errors.nombre.message}</span>
            )}
          </div>
          <select
            name='servicio_id'
            className='p-2 bg-gray-700 text-lightGray rounded-md'
            required
            {...register('servicio_id')}
          >
            <option value=''>Seleccione un servicio</option>
            {AllService.map((servicio) => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.nombre} - ${servicio.precio}
              </option>
            ))}
          </select>
          <textarea
            name='descripcion'
            placeholder='Descripción'
            className='p-2 bg-gray-700 text-lightGray rounded-md'
            required
            {...register('descripcion')}
          />
          <div>
            <input
              type='number'
              name='porcientoDesc'
              placeholder='Porcentaje de descuento'
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              required
              {...register('porcientoDesc')}
            />
            {errors.porcientoDesc && (
              <span className='text-red-500'>
                {errors.porcientoDesc.message}{' '}
              </span>
            )}
          </div>
        </div>
        <button
          type='submit'
          className='mt-4 w-full bg-mustard text-jetBlack py-2 rounded-lg font-semibold'
        >
          {editingId ? 'Actualizar Promoción' : 'Agregar Promoción'}
        </button>
      </form>

      {/* Tabla de promociones */}
      <div className='overflow-x-auto'>
        <table className='w-full bg-gray-800 rounded-lg'>
          <thead>
            <tr className='text-mustard'>
              <th className='py-2 px-4 text-left'>Nombre</th>
              <th className='py-2 px-4 text-left'>Servicio</th>
              <th className='py-2 px-4 text-left'>Descripción</th>
              <th className='py-2 px-4 text-left'>Descuento (%)</th>
              <th className='py-2 px-4 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((promocion) => {
              return (
                <tr
                  key={promocion.id}
                  className='border-t border-gray-700 hover:bg-gray-700 transition'
                >
                  <td className='py-2 px-4'>{promocion.nombre}</td>
                  <td className='py-2 px-4'>
                    {promocion?.servicio?.nombre ?? '-'}
                  </td>
                  <td className='py-2 px-4'>{promocion.descripcion}</td>
                  <td className='py-2 px-4'>{promocion.porcientoDesc}%</td>
                  <td className='py-2 px-4 flex justify-center gap-3'>
                    <button
                      className='text-mustard hover:text-yellow-500 transition'
                      onClick={() => {
                        console.log(promocion.id);
                        setEditingId(promocion.id);
                        reset({
                          nombre: promocion.nombre,
                          descripcion: promocion.descripcion,
                          porcientoDesc: promocion.porcientoDesc,
                          servicio_id: promocion?.servicio.id,
                        });
                      }}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className='text-red-500 hover:text-red-400 transition'
                      onClick={() => {
                        setIsOpen(true);
                        console.log(isOpen);
                        setEditingId(promocion.id);
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {isOpen && (
          <ConfirmationModal
            isOpen={isOpen}
            title='Confirmar Eliminación'
            message='¿Estás seguro de que deseas eliminar este servicio?'
            onConfirm={() => {
              deleteTetimonials(editingId, {
                onSuccess: () => toast.success('Promocion eliminada'),
              });
              setIsOpen(false);
            }}
            onCancel={() => setIsOpen(false)}
          />
        )}
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
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TPromociones;
