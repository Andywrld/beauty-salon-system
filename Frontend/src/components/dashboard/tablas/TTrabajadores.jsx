import { useState } from 'react';
import {
  Pencil,
  Trash2,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { GetAllWorket } from '../../../api/TrabajadorApi';
import {
  useCreateTrabajador,
  useDeleteTrabajador,
  useUpdateTrabajador,
} from '../../../hook/reactQuery/useTrabajador';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schematrabajador } from '../../../schema/models.schema.trabajador';
import ConfirmationModal from '../../../ui/confirmGeneric';

// cuantos elementos se vana  mostrar por pagina
const ITEMS_PER_PAGE = 5;

const TTrabajadores = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCi, setEditingCi] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schematrabajador),
  });

  const { data: AllTrabajadores = [] } = GetAllWorket();
  const { mutate: createTrabajadorMutate } = useCreateTrabajador();
  const { mutate: updateTrabajadorMutate } = useUpdateTrabajador();
  const { mutate: deleteTrabajadorMutate } = useDeleteTrabajador();

  const onSubmit = (data) => {
    if (editingCi) {
      updateTrabajadorMutate(
        { ci: editingCi, data: data },
        {
          onSuccess: () => {
            toast.success('Actualizado con éxito'),
              reset({
                nombre: '',
                apellidos: '',
                salario: '',
                puesto: '',
                ci: '',
              });
            setEditingCi(null);
          },
        }
      );
    } else {
      createTrabajadorMutate(data, {
        onSuccess: () => {
          toast.success('Trabajador creado');
          reset();
        },
        onError: (error) => {
          setError('ci', {
            type: 'manual',
            message: error.response.data.ci[0],
          });
          throw error;
        },
      });
    }
  };

  // Calcular trabajadores para la página actual
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = AllTrabajadores.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(AllTrabajadores.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='bg-jetBlack text-lightGray p-6 rounded-lg shadow-lg mt-20'>
      <h2 className='text-3xl font-serif font-bold text-mustard mb-6'>
        Gestión de Trabajadores
      </h2>
      <Toaster />

      {/* Formulario de Trabajador */}
      <form
        className='bg-gray-800 p-4 rounded-lg shadow mb-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <input
              type='text'
              disabled={editingCi ? true : false}
              name='ci'
              placeholder='ci'
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              required
              {...register('ci')}
            />
            {errors.ci && (
              <span className='text-red-500'> {errors.ci.message} </span>
            )}
          </div>
          <div>
            <input
              type='text'
              name='nombre'
              placeholder='Nombre'
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              required
              {...register('nombre')}
            />
            {errors.nombre && (
              <span className='text-red-500'> {errors.nombre.message} </span>
            )}
          </div>
          <div>
            <input
              type='text'
              name='apellidos'
              placeholder='Apellidos'
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              required
              {...register('apellidos')}
            />
          </div>
          <div>
            <input
              type='number'
              name='salario'
              placeholder='Salario'
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              required
              {...register('salario', { valueAsNumber: true })}
            />

            {errors.salario && (
              <span className='text-red-500'> {errors.salario.message} </span>
            )}
          </div>
          <div>
            <input
              type='text'
              name='puesto'
              placeholder='Puesto'
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              required
              {...register('puesto')}
            />
          </div>
        </div>
        <button
          type='submit'
          className='mt-4 w-full bg-mustard text-jetBlack py-2 rounded-lg font-semibold flex items-center justify-center gap-2'
        >
          <PlusCircle size={18} />
          {editingCi ? 'Actualizar Trabajador' : 'Agregar Trabajador'}
        </button>
      </form>
      {/* Tabla de Trabajadores */}
      <div className='overflow-x-auto'>
        <table className='w-full bg-gray-800 rounded-lg'>
          <thead>
            <tr className='text-mustard'>
              <th className='py-2 px-4 text-left'>C.I.</th>
              <th className='py-2 px-4 text-left'>Nombre</th>
              <th className='py-2 px-4 text-left'>Apellidos</th>
              <th className='py-2 px-4 text-left'>Salario</th>
              <th className='py-2 px-4 text-left'>Puesto</th>
              <th className='py-2 px-4 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((trabajador) => (
              <tr
                key={trabajador.ci}
                className='border-t border-gray-700 hover:bg-gray-700 transition'
              >
                <td className='py-2 px-4'>{trabajador.ci}</td>
                <td className='py-2 px-4'>{trabajador.nombre}</td>
                <td className='py-2 px-4'>{trabajador.apellidos}</td>
                <td className='py-2 px-4'>${trabajador.salario}</td>
                <td className='py-2 px-4'>{trabajador.puesto}</td>
                <td className='py-2 px-4 flex justify-center gap-3'>
                  <button
                    onClick={() => {
                      setEditingCi(trabajador.ci);
                      reset({
                        nombre: trabajador.nombre,
                        apellidos: trabajador.apellidos,
                        puesto: trabajador.puesto,
                        ci: trabajador.ci,
                        salario: trabajador.salario,
                      });
                    }}
                    className='text-mustard hover:text-yellow-500 transition'
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setEditingCi(trabajador.ci);
                      setOpen(true);
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
        {isOpen && (
          <ConfirmationModal
            isOpen={isOpen}
            title='Confirmar Eliminación'
            message='¿Estás seguro de que deseas eliminar este trabajador?'
            onConfirm={() => {
              deleteTrabajadorMutate(editingCi, {
                onSuccess: () =>
                  toast.success('Trabajador eliminado con éxito'),
              });
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
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

export default TTrabajadores;
