import { useState } from 'react';
import {
  Pencil,
  Trash2,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { GetAllUser } from '../../../api/UsuarioApi';
import { useForm } from 'react-hook-form';
import { schemausuario } from '../../../schema/models.schema.user';
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
} from '../../../hook/reactQuery/useUsuario';
import { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import ConfirmationModal from '../../../ui/confirmGeneric';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

const TUsuarios = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemausuario),
  });

  const { data: AllUser = [] } = GetAllUser();
  const { mutate: createUserMutate } = useCreateUser();
  const { mutate: updateUserMutate } = useUpdateUser();
  const { mutate: deleteUserMutate } = useDeleteUser();

  const [editingId, setEditingId] = useState(null);
  const [isOpen, setIsopen] = useState(false);

  //aqui se jecuta la logica de enviar y editar el usuario
  const onSubmit = (data) => {
    if (editingId) {
      // aqui ejecuta la laogica de actualizar (ver api)
      updateUserMutate(
        { id: editingId, data: data },
        {
          onSuccess: () => {
            toast.success('Usuario actualizado correctamente');
            setEditingId(null);
            reset({
              nombre: '',
              apellidos: '',
              correo: '',
              usuario: '',
              telefono: '',
            });
          },
        }
      );
    } else {
      //aqui ejecuta la logicad e crear (ver api )
      createUserMutate(
        { password: '123456', ...data },
        {
          onSuccess: () => {
            toast.success('Usuario creado correctamente');
            reset();
          },
          onError: (error) => {
            setError('usuario', {
              type: 'manual',
              message: error.response.data.usuario,
            });

            setError('correo', {
              type: 'manual',
              message: error.response.data.correo,
            });
            throw error;
          },
        }
      );
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    reset({
      nombre: user.nombre,
      apellidos: user.apellidos,
      correo: user.correo,
      telefono: user.telefono,
      usuario: user.usuario,
      rol: user.rol,
    });
  };

  // Calcular usuarios para la página actual
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = AllUser.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(AllUser.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='bg-jetBlack text-lightGray p-6 rounded-lg shadow-lg mt-20'>
      <h2 className='text-3xl font-serif font-bold text-mustard mb-6'>
        Gestión de Usuarios
      </h2>

      {/* Formulario de Usuario */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-gray-800 p-4 rounded-lg shadow mb-6'
      >
        <Toaster />
        <div className='grid grid-cols-2 gap-4'>
          <input
            type='text'
            name='nombre'
            required
            placeholder='Nombre'
            {...register('nombre')}
            className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
          />

          {errors.nombre && (
            <span className='text-red-500'> {errors.nombre.message}</span>
          )}

          <div>
            <input
              id='apellidos'
              required
              type='text'
              name='apellidos'
              placeholder='Apellidos'
              {...register('apellidos')}
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
            />
            {errors.apellidos && (
              <span className='text-red-500'> {errors.apellidos.message}</span>
            )}
          </div>
          <div>
            <input
              id='usuario'
              disabled={editingId ? true : false}
              type='text'
              required
              name='usuario'
              placeholder='Usuario'
              {...register('usuario')}
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
            />
            {errors.usuario && (
              <span className='text-red-500'> {errors.usuario.message}</span>
            )}
          </div>
          <div>
            <input
              type='text'
              name='correo'
              placeholder='Correo'
              {...register('correo')}
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              required
              disabled={editingId ? true : false}
            />
            {errors.correo && (
              <span className='text-red-500'> {errors.correo.message}</span>
            )}
          </div>
          <div>
            <input
              type='text'
              name='telefono'
              placeholder='Teléfono'
              {...register('telefono', { valueAsNumber: true })}
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              required
            />

            {errors.telefono && (
              <span className='text-red-500'> {errors?.telefono.message}</span>
            )}
          </div>

          {/* Selector de rol */}
          <select
            name='rol'
            {...register('rol')}
            className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
          >
            <option value='cliente'>Cliente</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <button
          type='submit'
          className='mt-4 w-full bg-mustard text-jetBlack py-2 rounded-lg font-semibold flex items-center justify-center gap-2'
        >
          <PlusCircle size={18} />
          {editingId ? 'Actualizar Usuario' : 'Agregar Usuario'}
        </button>
      </form>

      {/* Tabla de Usuarios */}
      <div className='overflow-x-auto'>
        <table className='w-full bg-gray-800 rounded-lg'>
          <thead>
            <tr className='text-mustard'>
              <th className='py-2 px-4 text-left'>ID</th>
              <th className='py-2 px-4 text-left'>Nombre</th>
              <th className='py-2 px-4 text-left'>Usuario</th>
              <th className='py-2 px-4 text-left'>Correo</th>
              <th className='py-2 px-4 text-left'>Teléfono</th>
              <th className='py-2 px-4 text-left'>Rol</th>
              <th className='py-2 px-4 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr
                key={user.id}
                className='border-t border-gray-700 hover:bg-gray-700 transition'
              >
                <td className='py-2 px-4'>{user.id}</td>
                <td className='py-2 px-4'>
                  {user.nombre} {user.apellidos}
                </td>
                <td className='py-2 px-4'>{user.usuario}</td>
                <td className='py-2 px-4'>{user.correo}</td>
                <td className='py-2 px-4'>{user.telefono}</td>
                <td className='py-2 px-4'>{user.rol}</td>
                <td className='py-2 px-4 flex justify-center gap-3'>
                  <button
                    onClick={() => handleEdit(user)}
                    className='text-mustard hover:text-yellow-500 transition'
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setIsopen(true);
                      setEditingId(user.id);
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
        {isOpen && (
          <ConfirmationModal
            isOpen={isOpen}
            title='Confirmar Eliminación'
            message='¿Estás seguro de que deseas eliminar este usuario?'
            onConfirm={() => {
              deleteUserMutate(editingId);
              setIsopen(false);
            }}
            onCancel={() => setIsopen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TUsuarios;
