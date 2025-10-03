import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPromociones,
  updatePromociones,
  deleteromociones,
} from '../../api/PromocionesApi';
export const useCreateTPromociones = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => createPromociones(data),
    onMutate: async (data) => {
      await qc.cancelQueries(['promociones']);

      const preview = qc.getQueryData(['promociones']);

      qc.setQueryData(['promociones'], (old = []) => [...old, { ...data }]);

      return preview;
    },
    onSettled: () => qc.invalidateQueries(['promociones']),
  });
};

export const useUpdatePromociones = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updatePromociones(id, data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey: ['promociones'] });

      const previousItems = queryClient.getQueryData(['promociones']);

      queryClient.setQueryData(['promociones'], (old) =>
        old ? old.map((item) => (item.id === data.id ? data : item)) : []
      );

      return previousItems;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['promociones'] });
    },
  });
};

export const useDeletePromociones = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      return deleteromociones(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['promociones'] });

      const previousItems = queryClient.getQueryData(['promociones']);

      queryClient.setQueryData(['promociones'], (old) =>
        old ? old.filter((item) => item.id !== id) : []
      );

      return previousItems;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['promociones'] });
    },
  });
};
