import { useEffect, useState } from 'react';
import api from '../../../../../api/Api.js';

export const useGetLastDonations = ({ valueSwitch }) => {
  const [lastDonations, setLastDonations] = useState([]);

  const handleGetLastDonations = async () => {
    try {
      const response = await api.getLastDonatedEvents();

      const sortedData = !valueSwitch
        ? response.sort((a, b) => b.donations - a.donations)
        : response.sort(
            (a, b) => b.total_donated_amount - a.total_donated_amount
          );
      setLastDonations(sortedData);
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
  }, [valueSwitch]);

  return {
    lastDonations,
    handleGetLastDonations,
    totalDonated: Number(totalDonatedFormatted).toFixed(2),
    totalQuantityDonations
  };
};
