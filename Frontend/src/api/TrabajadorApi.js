import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axios';

export const GetAllWorket = () => {
  return useQuery({
    queryKey: ['Trabajadores'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/trabajadores/');
      return data;
    },
  });
};

export const createTrabajador = async (data) => {
  const response = await axiosInstance.post('/trabajadores/', data);

  return response;
};

export const updateTrabajador = async (ci, data) => {
  const response = await axiosInstance.patch(`/trabajadores/${ci}/`, data);

  return response;
};

export const deleteTrabajador = async (ci) => {
  const response = await axiosInstance.delete(`/trabajadores/${ci}/`);
  return response;
};
