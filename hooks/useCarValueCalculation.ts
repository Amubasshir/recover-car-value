/**
 * React Hook for Car Value Calculation
 * 
 * Provides an easy-to-use hook for React components to calculate
 * pre-accident, post-accident, and diminished values
 */

import { useState, useCallback } from 'react';

export interface CarValueInput {
  year: number;
  make: string;
  model: string;
  mileage: number;
  trim?: string;
}

export interface CarValueResult {
  pre_value: number;
  post_value: number;
  diminished_value: number;
  pre_comps: any[];
  post_comps: any[];
  pre_regression: {
    slope: number;
    intercept: number;
  };
  post_regression: {
    slope: number;
    intercept: number;
  };
}

export interface UseCarValueCalculationReturn {
  calculate: (input: CarValueInput) => Promise<CarValueResult | null>;
  loading: boolean;
  error: string | null;
  data: CarValueResult | null;
  reset: () => void;
}

export function useCarValueCalculation(): UseCarValueCalculationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CarValueResult | null>(null);

  const calculate = useCallback(async (input: CarValueInput): Promise<CarValueResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/car-value', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Calculation failed');
      }

      if (result.success) {
        setData(result);
        return result;
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Car value calculation error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    calculate,
    loading,
    error,
    data,
    reset,
  };
}
