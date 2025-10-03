// src/hooks/useCreateAppointment.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../api/axios';

export const useCreateAppointment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post('/citas/', payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['availability'] });
    },
  });
};
