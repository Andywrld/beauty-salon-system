import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axios';

export const GetAllUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/usuarios/');
      return data;
    },
  });
};

export const updateUser = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/usuarios/${id}/`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/usuarios/${id}/`);
  return response.data;
};
