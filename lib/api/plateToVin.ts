// lib/api/plateToVin.ts

/**
 * PlateToVin API client for license plate lookups
 */

interface PlateToVinRequest {
  licensePlate: string;
  state: string;
}

interface VehicleInfo {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
}

export async function lookupLicensePlate({ licensePlate, state }: PlateToVinRequest): Promise<VehicleInfo> {
  const apiKey = process.env.PLATETOVIN_API_KEY;
  
  if (!apiKey) {
    throw new Error('PlateToVin API key not configured');
  }

  const url = 'https://platetovin.com/api/v1/lookup';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        plate: licensePlate,
        state: state
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to lookup license plate');
    }

    const data = await response.json();
    
    return {
      vin: data.vin,
      year: parseInt(data.year, 10),
      make: data.make,
      model: data.model,
      trim: data.trim || ''
    };
  } catch (error) {
    console.error('License plate lookup failed:', error);
    throw error;
  }
}