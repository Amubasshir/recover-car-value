

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Type for vehicle data from the CSV
interface VehicleData {
  year: number;
  make: string;
  model: string;
  trim: string;
}

// Cache for vehicle data
let vehicleDataCache: VehicleData[] | null = null;

// Helper function to load and parse vehicle data
async function loadVehicleData(): Promise<VehicleData[]> {
  // If we already have the data in cache, return it
  if (vehicleDataCache) {
    return vehicleDataCache;
  }
  
  // For demonstration, we're assuming a JSON file in the public directory
  // In production, you would import the CSV using a CSV parser
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', 'vehicle-models.json');
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const vehicleData = JSON.parse(fileContent) as VehicleData[];
    
    // Store in cache
    vehicleDataCache = vehicleData;
    
    return vehicleData;
  } catch (error) {
    console.error('Error loading vehicle data:', error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  if (!type) {
    return NextResponse.json(
      { error: 'Type parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    const vehicleData = await loadVehicleData();
    
    switch (type) {
      case 'years': {
        // Extract unique years
        const years = [...new Set(vehicleData.map(v => v.year))].sort((a, b) => b - a);
        return NextResponse.json({ years: years.map(year => ({ value: year, label: year.toString() })) });
      }
      
      case 'makes': {
        const year = parseInt(searchParams.get('year') || '', 10);
        if (isNaN(year)) {
          return NextResponse.json(
            { error: 'Valid year parameter is required for makes' },
            { status: 400 }
          );
        }
        
        // Filter by year and extract unique makes
        const filteredData = vehicleData.filter(v => v.year === year);
        const makes = [...new Set(filteredData.map(v => v.make))].sort();
        
        return NextResponse.json({
          makes: makes.map(make => ({ value: make, label: make }))
        });
      }
      
      case 'models': {
        const year = parseInt(searchParams.get('year') || '', 10);
        const make = searchParams.get('make');
        
        if (isNaN(year) || !make) {
          return NextResponse.json(
            { error: 'Valid year and make parameters are required for models' },
            { status: 400 }
          );
        }
        
        // Filter by year and make, then extract unique models
        const filteredData = vehicleData.filter(v => v.year === year && v.make === make);
        const models = [...new Set(filteredData.map(v => v.model))].sort();
        
        return NextResponse.json({
          models: models.map(model => ({
            value: model,
            label: model,
            make,
            year
          }))
        });
      }
      
      case 'trims': {
        const year = parseInt(searchParams.get('year') || '', 10);
        const make = searchParams.get('make');
        const model = searchParams.get('model');
        
        if (isNaN(year) || !make || !model) {
          return NextResponse.json(
            { error: 'Valid year, make, and model parameters are required for trims' },
            { status: 400 }
          );
        }
        
        // Filter by year, make, and model, then extract unique trims
        const filteredData = vehicleData.filter(
          v => v.year === year && v.make === make && v.model === model
        );
        const trims = [...new Set(filteredData.map(v => v.trim))].sort();
        
        return NextResponse.json({
          trims: trims.map(trim => ({
            value: trim,
            label: trim,
            make,
            model,
            year
          }))
        });
      }
      
      default:
        return NextResponse.json(
          { error: 'Invalid type parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error processing vehicle model data:', error);
    return NextResponse.json(
      { error: 'Failed to process vehicle model data' },
      { status: 500 }
    );
  }
}