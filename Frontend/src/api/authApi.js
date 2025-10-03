import axiosInstance from './axios';

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/registro/', userData);

    return response.data;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
    throw error;
  }
};

export const LoginApi = async (data) => {
  try {
    const response = await axiosInstance.post('/login/', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
