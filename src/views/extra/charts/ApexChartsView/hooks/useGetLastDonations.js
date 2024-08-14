import { useEffect, useState } from 'react';
import api from '../../../../../api/Api.js';

export const useGetLastDonations = () => {
  const [lastDonations, setLastDonations] = useState([]);

  const handleGetLastDonations = async () => {
    try {
      const response = await api.getLastDonatedEvents();

      setLastDonations(response);
    } catch (err) {
      console.error(err);
    }
  };

  const totalDonated = lastDonations.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.total_donated_amount),
    0
  );

  const totalQuantityDonations = lastDonations.reduce(
    (accumulator, currentValue) => accumulator + currentValue.donations,
    0
  );

  const totalDonatedFormatted = totalDonated.toLocaleString('es-AR');
  useEffect(() => {
    handleGetLastDonations();
  }, []);

  return {
    lastDonations,
    handleGetLastDonations,
    totalDonated: Number(totalDonatedFormatted).toFixed(2),
    totalQuantityDonations
  };
};
