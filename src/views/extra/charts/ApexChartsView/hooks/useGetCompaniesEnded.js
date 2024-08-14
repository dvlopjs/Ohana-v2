import { useEffect, useState } from 'react';
import api from '../../../../../api/Api.js';

export const useGetCompaniesEnded = () => {
  const [companiesEnded, setCompaniesEnded] = useState({
    percentage_finished: 0,
    finished_events: 0,
    total_events: 0
  });

  const handleGetCompaniesEnded = async () => {
    try {
      const response = await api.getCompaniesEnded();

      setCompaniesEnded(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetCompaniesEnded();
  }, []);

  return { companiesEnded };
};
