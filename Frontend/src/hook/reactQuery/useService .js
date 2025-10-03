import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  GetAllService,
  createService,
  updateService,
  deteleService,
} from '../../api/ServiceApi';

export const useService = () => {
  const useUpdateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, data }) => updateService(id, data),
      onMutate: async ({ data }) => {
        await queryClient.cancelQueries({ queryKey: ['service'] });

        const previousItems = queryClient.getQueryData(['service']);

        queryClient.setQueryData(['service'], (old) =>
          old ? old.map((item) => (item.id === data.id ? data : item)) : []
        );

        return previousItems;
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['service'] });
      },
      onSuccess: () => toast.success('Servicio actualizado correctamente'),
    });
  };

  const useGetAllService = () => {
    return useQuery({
      queryKey: ['service'],
      queryFn: () => GetAllService(),
    });
  };

  const useCreateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => createService(data),
      onMutate: async (data) => {
        await queryClient.cancelQueries({ queryKey: ['service'] });

        const previousItems = queryClient.getQueryData(['service']);

        queryClient.setQueryData(['service'], (old = []) => [
          ...old,
          { ...data },
        ]);

        return previousItems;
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['service'] });
      },
    });
  };

  const useDeleteService = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id) => {
        toast.success('Servicio eliminado correctamente');
        return deteleService(id);
      },
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['service'] });

        const previousItems = queryClient.getQueryData(['service']);

        queryClient.setQueryData(['service'], (old) =>
          old ? old.filter((item) => item.id !== id) : []
        );

        return previousItems;
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['service'] });
      },
    });
  };

  return {
    useGetAllService,
    useCreateService,
    useUpdateService,
    useDeleteService,
  };
};
