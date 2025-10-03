import axiosInstance from './axios';

export const GetAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/productos/');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (data) => {
  const response = await axiosInstance.post('/productos/', data);

  return response.data;
};

export const updateProduct = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/productos/${id}/`, data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/productos/${id}/`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
