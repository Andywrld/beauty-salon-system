import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { schemaservicio } from '../../../schema/models.schema.services';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster } from 'react-hot-toast';
import {
  Pencil,
  Trash2,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useService } from '../../../hook/reactQuery/useService ';
import ConfirmationModal from '../../../ui/confirmGeneric';

const ITEMS_PER_PAGE = 5;

const TServicios = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaservicio),
    defaultValues: {
      nombre: '',
      precio: null,
      descripcion: '',
      imagen: null,
      duracion: '1h',
    },
  });

  const {
    useCreateService,
    useDeleteService,
    useUpdateService,
    useGetAllService,
  } = useService();

  const { data: ServiceAllAdmin = [] } = useGetAllService();

  const { mutate: createService } = useCreateService();
  const { mutate: updateService } = useUpdateService();
  const { mutate: deleteService } = useDeleteService();

  const onSubmit = async (data) => {
    const formData = new FormData();
    const { nombre, precio, descripcion } = data;
    formData.append('nombre', nombre);
    formData.append('precio', precio.toString());
    formData.append('descripcion', descripcion);
    if (data.imagen && data.imagen.length > 0) {
      formData.append('imagen', data.imagen[0]);
    }

    if (editingId) {
      updateService({ id: editingId, data: formData });
      reset({
        nombre: '',
        precio: '',
        descripcion: '',
      });
      setEditingId(null);
    } else {
      createService(formData, {
        onError: (errors) => {
          setError('nombre', {
            type: 'manual',
            message:
              errors.response.data.nombre ,
          });
          throw errors;
        },
        onSuccess: () => {
          toast.success('Servicio agregado correctamente');
          reset();
        },
      });
    }
  };

  const handleEdit = (servicio) => {
    setEditingId(servicio.id);
    reset({
      nombre: servicio.nombre,
      precio: servicio.precio,
      descripcion: servicio.descripcion,
      imagen: null,
    });
  };

  // Paginación
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = ServiceAllAdmin.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ServiceAllAdmin.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className='bg-jetBlack text-lightGray p-6 rounded-lg shadow-lg mt-20'>
      <h2 className='text-3xl font-serif font-bold text-mustard mb-6'>
        Gestión de Servicios
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-gray-800 p-4 rounded-lg shadow mb-6'
      >
        <div className='grid grid-cols-2 gap-4'>
          {/* Nombre */}
          <div>
            <input
              type='text'
              placeholder='Nombre del servicio'
              {...register('nombre')}
              required
              className='p-2 bg-gray-700 text-lightGray rounded-md w-full'
            />
            {errors.nombre && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.nombre.message}
              </p>
            )}
          </div>

          {/* Precio */}
          <div>
            <input
              type='number'
              placeholder='Precio'
              required
              {...register('precio', { valueAsNumber: true })}
              className='p-2 bg-gray-700 text-lightGray rounded-md w-full'
            />
            {errors.precio && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.precio.message}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div className='col-span-2'>
            <textarea
              placeholder='Descripción'
              {...register('descripcion')}
              required
              className='p-2 bg-gray-700 text-lightGray rounded-md w-full'
            />
            {errors.descripcion && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.descripcion.message}
              </p>
            )}
          </div>

          {/* Imagen */}
          <div>
            <input
              type='file'
              required
              accept='image/*'
              {...register('imagen')}
              className='p-2 bg-gray-700 text-lightGray rounded-md w-full'
            />
            {errors.imag && (
              <p className='text-red-500 text-sm mt-1'>{errors.imag.message}</p>
            )}
          </div>
        </div>

        <button
          type='submit'
          className='mt-4 w-full bg-mustard text-jetBlack py-2 rounded-lg font-semibold flex items-center justify-center gap-2'
        >
          <Toaster />
          <PlusCircle size={18} />
          {editingId ? 'Actualizar Servicio' : 'Agregar Servicio'}
        </button>
      </form>

      <div className='overflow-x-auto'>
        <table className='w-full bg-gray-800 rounded-lg'>
          <thead>
            <tr className='text-mustard'>
              <th className='py-2 px-4 text-left'>Imagen</th>
              <th className='py-2 px-4 text-left'>Servicio</th>
              <th className='py-2 px-4 text-left'>ID</th>
              <th className='py-2 px-4 text-left'>Precio</th>
              <th className='py-2 px-4 text-left'>Descripción</th>
              <th className='py-2 px-4 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((servicio) => (
              <tr
                key={servicio.id}
                className='border-t border-gray-700 hover:bg-gray-700 transition'
              >
                <td className='py-2 px-4'>
                  {servicio.imagen && (
                    <img
                      src={servicio.imagen}
                      alt={servicio.nombre}
                      className='h-12 w-12 object-cover rounded-md'
                    />
                  )}
                </td>
                <td className='py-2 px-4'>{servicio.nombre}</td>
                <td className='py-2 px-4'>{servicio.id}</td>
                <td className='py-2 px-4'>${servicio.precio}</td>
                <td className='py-2 px-4'>{servicio.descripcion}</td>
                <td className='py-2 px-4 flex justify-center mt-3 gap-3'>
                  <button
                    onClick={() => handleEdit(servicio)}
                    className='text-mustard hover:text-yellow-500  transition'
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setEditingId(servicio.id);
                    }}
                    className='text-red-500 hover:text-red-400 transition'
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
      {isOpen && (
        <ConfirmationModal
          isOpen={isOpen}
          title='Confirmar Eliminación'
          message='¿Estás seguro de que deseas eliminar este servicio?'
          onConfirm={() => {
            deleteService(editingId);
            setIsOpen(false);
          }}
          onCancel={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default TServicios;
