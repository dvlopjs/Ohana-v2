import { useEffect, useState } from 'react';
import api from '../../../../../api/Api.js';

export const useGetTotalDonations = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const getTotalOfDonations = async () => {
    setLoading(true);
    try {
      const response = await api.getTotalDonations();
      setTotalDonations(response.donations);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTotalOfDonations();
  }, []);

  return { totalDonations, getTotalOfDonations, isLoading };
};
