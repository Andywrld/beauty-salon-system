// src/hooks/useAvailability.js
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios'; // o de donde importes axios

export const useAvailability = (serviceId, date) => {
  return useQuery({
    queryKey: ['availability', serviceId, date],
    queryFn: async () => {
      const { data } = await axios.get('/availability/', {
        params: { service_id: serviceId, date },
      });
      return data.free; // array de "HH:MM"
    },
    enabled: Boolean(serviceId && date),
  });
};
