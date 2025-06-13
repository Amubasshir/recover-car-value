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
  state: string;
}

export async function lookupLicensePlate({ licensePlate, state }: PlateToVinRequest): Promise<VehicleInfo> {
  const apiKey = process.env.PLATETOVIN_API_KEY;
  
  if (!apiKey) {
    throw new Error('PlateToVin API key not configured');
  }

  const url = 'https://platetovin.com/api/convert';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apiKey}`
      },
      body: JSON.stringify({
        plate: licensePlate,
        state: state
      })
    });

    
    const data = await response.json();
    console.log("😶😶😶😶", data);
    if (!data.success) {
      throw new Error('Failed to lookup license plate');
    }

    // const data = await response.json();
    
    // return {};
    return {
      vin: data.vin.vin,
      year: parseInt(data.vin.year, 10),
      make: data.vin.make,
      model: data.vin.model,
      trim: data.vin.trim || '',
      state: state || ''
    };
  } catch (error) {
    throw error;
  }
}