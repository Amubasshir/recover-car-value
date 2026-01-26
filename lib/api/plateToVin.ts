
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
  
  const url = 'https://platetovin.com/api/convert';
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Only add Authorization header if API key is provided
    if (apiKey) {
      headers['Authorization'] = apiKey;
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        plate: licensePlate,
        state: state
      })
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      const errorText = await response.text();
      throw new Error(`PlateToVin API error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    console.log({data})
    
    // Handle "No Result Found" case (404 or success:false)
    if (response.status === 404 || (data && data.success === false && (data.message === "No Result Found" || data.message?.includes("No Result")))) {
      throw new Error('No vehicle found for this license plate. Please verify the license plate number and state, or use the "Select Vehicle" tab to enter details manually.');
    }
    
    if (!response.ok) {
      const errorText = JSON.stringify(data);
      throw new Error(`PlateToVin API error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    if (!data || !data.vin) {
      throw new Error('Invalid response from PlateToVin API: missing vin data');
    }

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