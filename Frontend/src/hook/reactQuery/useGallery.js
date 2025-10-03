import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPhoto, updatePhoto, deletePhoto } from '../../api/GaleriaApi';

export const useCreatePhoto = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => createPhoto(data),
    onMutate: async (data) => {
      await qc.cancelQueries(['fotos']);

      const preview = qc.getQueryData(['fotos']);

      qc.setQueryData('fotos', (old = []) => [...old, { ...data }]);

      return preview;
    },

    onSettled: qc.invalidateQueries(['fotos']),
  });
};

export const useUpdateGAllery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updatePhoto(id, data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey: ['fotos'] });

      const previousItems = queryClient.getQueryData(['fotos']);

      queryClient.setQueryData(['fotos'], (old) =>
        old ? old.map((item) => (item.id === data.id ? data : item)) : []
      );

      return previousItems;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['fotos'] });
    },
  });
};

export const useDeleteGallery = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => deletePhoto(id),
    onMutate: async (id) => {
      await qc.cancelQueries(['fotos']);

      const preview = qc.getQueryData(['fotos']);

      qc.setQueryData(['fotos'], (old = []) =>
        old ? old.map((item) => item.id != id) : []
      );

      return preview;
    },

    onSettled: () => qc.invalidateQueries(['fotos']),
  });
};
