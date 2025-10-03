import axiosInstance from './axios';

export const GetAllService = async () => {
  try {
    const { data } = await axiosInstance.get('/servicios/');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (data) => {
  try {
    const response = await axiosInstance.post('/servicios/', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/servicios/${id}/`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deteleService = async (id) => {
  try {
    const response = await axiosInstance.delete(`/servicios/${id}/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
