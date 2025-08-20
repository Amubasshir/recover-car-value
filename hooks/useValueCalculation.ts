// hooks/useValueCalculation.js

import { useState } from 'react';

export const useValueCalculation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const calculateValues = async (vehicleData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/calculate-values', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Calculation failed');
      }

      setData(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { calculateValues, loading, error, data };
};