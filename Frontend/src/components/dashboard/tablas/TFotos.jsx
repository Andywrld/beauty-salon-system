import { useState } from 'react';
import {
  Pencil,
  Trash2,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { GetAllPhoto } from '../../../api/GaleriaApi';
import {
  useCreatePhoto,
  useDeleteGallery,
  useUpdateGAllery,
} from '../../../hook/reactQuery/useGallery';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemafoto } from '../../../schema/model.schema.foto';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmationModal from '../../../ui/confirmGeneric';

const ITEMS_PER_PAGE = 5;

const TFotos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState();
  const [editingId, setEditingId] = useState(null);

  const { data: AllPhoto = [] } = GetAllPhoto();
  const { mutate: createPhotoMutate } = useCreatePhoto();
  const { mutate: updatePhotoMutate } = useUpdateGAllery();
  const { mutate: deltePhotoMutate } = useDeleteGallery();

  

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemafoto),
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append('nombre', data.nombre);
    formData.append('imag', data.imag[0]);

    if (editingId) {
      updatePhotoMutate(
        { id: editingId, data: formData },
        {
          onSuccess: () => {
            setEditingId(null);
            reset({
              nombre: '',
              imag: null,
            });
            toast.success('Foto actualizada con éxito ');
          },
        }
      );
    } else {
      createPhotoMutate(formData, {
        onSuccess: () => {
          reset({
            nombre: '',
            imag: null,
          });
        },
      });
    }
  };

  // Calcular fotos para la página actual
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = AllPhoto.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(AllPhoto.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='bg-jetBlack text-lightGray p-6 rounded-lg shadow-lg mt-20'>
      <h2 className='text-3xl font-serif font-bold text-mustard mb-6'>
        Gestión de Fotos
      </h2>
      <Toaster />

      {/* Formulario */}
      <form
        className='bg-gray-800 p-4 rounded-lg shadow mb-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <input
              type='text'
              name='nombre'
              placeholder='Nombre de la foto'
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
              type='file'
              name='imag'
              accept='image/*'
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              {...register('imag')}
              required
            />
            {errors.imag && (
              <span className='text-red-500'> {errors.imag.message} </span>
            )}
          </div>
        </div>
        <button
          type='submit'
          className='mt-4 w-full bg-mustard text-jetBlack py-2 rounded-lg font-semibold flex items-center justify-center gap-2'
        >
          <PlusCircle size={18} />
          {editingId ? 'Actualizar Foto' : 'Agregar Foto'}
        </button>
      </form>

      {/* Tabla de Fotos */}
      <div className='overflow-x-auto'>
        <table className='w-full bg-gray-800 rounded-lg'>
          <thead>
            <tr className='text-mustard'>
              <th className='py-2 px-4 text-left'>Imagen</th>
              <th className='py-2 px-4 text-left'>Nombre</th>
              <th className='py-2 px-4 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((foto) => (
              <tr
                key={foto.id}
                className='border-t border-gray-700 hover:bg-gray-700 transition'
              >
                <td className='py-2 px-4'>
                  {foto.imag && (
                    <img
                      src={foto.imag}
                      alt={foto.nombre}
                      className='h-12 w-12 object-cover rounded-md'
                    />
                  )}
                </td>
                <td className='py-2 px-4'>{foto.nombre}</td>
                <td className='py-2 px-4 flex justify-center gap-3'>
                  <button
                    onClick={() => {
                      setEditingId(foto.id);
                      console.log(foto.id);
                      reset({
                        nombre: foto.nombre,
                        imag: foto.image,
                      });
                    }}
                    className='text-mustard hover:text-yellow-500 transition'
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(foto.id);
                      setIsOpen(true);
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
            message='¿Estás seguro de que deseas eliminar esta imagen?'
            onConfirm={() => {
              deltePhotoMutate(editingId, {
                onSuccess: () => toast.success('Foto eliminada con éxito'),
              });
              setIsOpen(false);
              setEditingId(null);
            }}
            onCancel={() => {
              setIsOpen(false);
              setEditingId(null);
            }}
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

export default TFotos;
