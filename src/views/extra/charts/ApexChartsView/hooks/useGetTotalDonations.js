import { useEffect, useState } from 'react';
import api from '../../../../../api/Api.js';

export const useGetTotalDonations = () => {
  const [totalDonations, setTotalDonations] = useState(0);

  const getTotalOfDonations = async () => {
    try {
      const response = await api.getTotalDonations();
      console.log(response);
      // setTotalDonations(response.data.totalDonations);
      setTotalDonations(response.donations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalOfDonations();
  }, []);

  return { totalDonations, getTotalOfDonations };
};
