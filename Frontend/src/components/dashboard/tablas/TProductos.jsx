// TProductos.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Pencil,
  Trash2,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoSchema } from '../../../schema/models.schema.producto';
import { useProducts } from '../../../hook/reactQuery/useProducts';
import { Toaster } from 'react-hot-toast';
import ConfirmationModal from '../../../ui/confirmGeneric';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

const TProductos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre: '',
      precio: '',
      cantidad: '',
    },
    mode: 'onChange',
  });

  const {
    useGetAllProducts,
    useCreateProduct,
    useDeleteProduct,
    useUpdateProduct,
  } = useProducts();

  const { data: productosData = [] } = useGetAllProducts();
  const { mutate: createProducto } = useCreateProduct();
  const { mutate: updateProducto } = useUpdateProduct();
  const { mutate: deleteProducto } = useDeleteProduct();

  const onSubmit = (data) => {
    if (editingId) {
      updateProducto(
        { id: editingId, data: data },
        {
          onSuccess: () => {
            toast.success('Producto actualizado correctamente');
            setEditingId(null);
            reset({
              nombre: '',
              precio: '',
              cantidad: '',
            });
          },
        }
      );
    } else {
      createProducto(data, {
        onError: (errors) => {
          setError('nombre', {
            type: 'manual',
            message: errors.response.data.nombre[0],
          });

          throw errors;
        },
        onSuccess: () => {
          toast.success('Producto creado correctamente');
          reset();
        },
      });
    }
  };

  const handleEdit = (producto) => {
    setEditingId(producto.id);
    reset({
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidad,
    });
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = productosData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productosData.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='bg-jetBlack text-lightGray p-6 rounded-lg shadow-lg mt-20'>
      <h2 className='text-3xl font-serif font-bold text-mustard mb-6'>
        Gestión de Productos
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-gray-800 p-4 rounded-lg shadow mb-6'
      >
        <div className='grid grid-cols-3 gap-4'>
          <Toaster />
          <div>
            <input
              type='text'
              name='nombre'
              disabled={editingId ? true : false}
              placeholder='Nombre del producto'
              {...register('nombre')}
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              required
            />
            {errors.nombre && (
              <span className='text-red-500 text-sm'>
                {errors.nombre.message}
              </span>
            )}
          </div>
          <div>
            <input
              type='number'
              name='precio'
              placeholder='precio'
              {...register('precio')}
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              required
            />
            {errors.precio && (
              <span className='text-red-500 text-sm'>
                {errors.precio.message}
              </span>
            )}
          </div>
          <div>
            <input
              type='number'
              name='cantidad'
              placeholder='Cantidad'
              {...register('cantidad')}
              className='p-2 bg-gray-700 text-lightGray rounded-md block w-full'
              required
            />
            {errors.cantidad && (
              <span className='text-red-500 text-sm'>
                {errors.cantidad.message}
              </span>
            )}
          </div>
        </div>
        <button
          type='submit'
          className='mt-4 w-full bg-mustard text-jetBlack py-2 rounded-lg font-semibold flex items-center justify-center gap-2 '
        >
          <PlusCircle size={18} />
          {editingId ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>

      <div className='overflow-x-auto'>
        <table className='w-full bg-gray-800 rounded-lg'>
          <thead>
            <tr className='text-mustard'>
              <th className='py-2 px-4 text-left'>Producto</th>
              <th className='py-2 px-4 text-left'>Precio</th>
              <th className='py-2 px-4 text-left'>Cantidad</th>
              <th className='py-2 px-4 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((producto) => (
              <tr
                key={producto.id}
                className='border-t border-gray-700 hover:bg-gray-700 transition'
              >
                <td className='py-2 px-4'>{producto.nombre}</td>
                <td className='py-2 px-4'>${producto.precio}</td>
                <td className='py-2 px-4'>{producto.cantidad}</td>
                <td className='py-2 px-4 flex justify-center gap-3'>
                  <button
                    onClick={() => handleEdit(producto)}
                    className='text-mustard hover:text-yellow-500 transition'
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      console.log('Producto a eliminar:', producto);
                      setEditingId(producto.id);
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

      {isOpen && (
        <ConfirmationModal
          isOpen={isOpen}
          title='Confirmar Eliminación'
          message='¿Estás seguro de que deseas eliminar este producto?'
          onConfirm={() => {
            deleteProducto(editingId);
            setIsOpen(false);
            setEditingId(null);
          }}
          onCancel={() => {
            setIsOpen(false);
            setEditingId(null);
          }}
        />
      )}

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

export default TProductos;
