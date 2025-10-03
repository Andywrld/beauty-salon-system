import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createTrabajador,
  deleteTrabajador,
  updateTrabajador,
} from '../../api/TrabajadorApi';

export const useCreateTrabajador = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => createTrabajador(data),
    onMutate: async (data) => {
      qc.cancelQueries(['Trabajadores']);

      const preview = qc.getQueryData(['Trabajadores']);

      qc.setQueryData(['Trabajadores'], (old = []) => [...old, { ...data }]);

      return preview;
    },
    onSettled: () => qc.invalidateQueries(['Trabajadores']),
  });
};

export const useUpdateTrabajador = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ci, data }) => updateTrabajador(ci, data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey: ['Trabajadores'] });

      const previousItems = queryClient.getQueryData(['Trabajadores']);

      queryClient.setQueryData(['Trabajadores'], (old) =>
        old ? old.map((item) => (item.ci === data.ci ? data : item)) : []
      );

      return previousItems;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['Trabajadores'] });
    },
  });
};

export const useDeleteTrabajador = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ci) => {
      return deleteTrabajador(ci);
    },
    onMutate: async (ci) => {
      await queryClient.cancelQueries({ queryKey: ['Trabajadores'] });

      const previousItems = queryClient.getQueryData(['Trabajadores']);

      queryClient.setQueryData(['Trabajadores'], (old) =>
        old ? old.filter((item) => item.ci !== ci) : []
      );

      return previousItems;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['Trabajadores'] });
    },
  });
};
