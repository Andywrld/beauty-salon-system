import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GetAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../api/ProductsApi';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const useGetAllProducts = () => {
    return useQuery({
      queryKey: ['products'],
      queryFn: () => GetAllProducts(),
    });
  };

  const useCreateProduct = () => {
    return useMutation({
      mutationFn: (data) => createProduct(data),

      onMutate: async (data) => {
        await queryClient.cancelQueries({ queryKey: ['products'] });

        const previousItems = queryClient.getQueryData(['products']);

        queryClient.setQueryData(['products'], (old) =>
          old ? old.map((item) => (item.id === data.id ? data : item)) : []
        );

        return previousItems;
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      },
    });
  };

  const useUpdateProduct = () => {
    return useMutation({
      mutationFn: ({ id, data }) => updateProduct(id, data),

      onMutate: async ({ data }) => {
        await queryClient.cancelQueries({ queryKey: ['products'] });

        const previousItems = queryClient.getQueryData(['products']);

        queryClient.setQueryData(['products'], (old) =>
          old ? old.map((item) => (item.id === data.id ? data : item)) : []
        );

        return previousItems;
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      },
    });
  };

  const useDeleteProduct = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id) => deleteProduct(id),

      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['products'] });

        const previousItems = queryClient.getQueryData(['products']);

        queryClient.setQueryData(['products'], (old) =>
          old ? old.filter((item) => item.id !== id) : []
        );

        return previousItems;
      },
      onSuccess: () => toast.success('Producto eliminado correctamente'),
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      },
    });
  };

  return {
    useGetAllProducts,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
  };
};
