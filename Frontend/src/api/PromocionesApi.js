import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axios';

export const GetAllPromociones = () => {
  return useQuery({
    queryKey: ['promociones'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/promociones/');

      return data;
    },
  });
};

export const createPromociones = async (data) => {
  const response = axiosInstance.post('/promociones/', data);
  return response;
};

export const updatePromociones = async (id, data) => {
  const response = axiosInstance.patch(`/promociones/${id}/`, data);
  return response;
};

export const deleteromociones = (id) => {
  const response = axiosInstance.delete(`/promociones/${id}/`);
  return response;
};
