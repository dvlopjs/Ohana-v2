import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useLastLocation = () => {
  const location = useLocation();

  useEffect(() => {
    // Guardar la ruta actual en localStorage
    localStorage.setItem('lastPath', location.pathname);
  }, [location]);

  // Función para obtener la última ruta guardada
  const getLastPath = () => {
    return localStorage.getItem('lastPath');
  };

  return getLastPath;
};

export default useLastLocation;
