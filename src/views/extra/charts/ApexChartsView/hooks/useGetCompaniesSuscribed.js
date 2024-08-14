import { useEffect, useState } from 'react';
import api from '../../../../../api/Api.js';

export const useGetCompaniesSuscribed = () => {
  const [companiesSuscribed, setCompaniesSuscribed] = useState(0);

  const handleGetTotalCompaniesSuscribed = async () => {
    try {
      const response = await api.getTotalCompaniesSuscribed();

      setCompaniesSuscribed(response.events);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetTotalCompaniesSuscribed();
  }, []);

  return { companiesSuscribed };
};
