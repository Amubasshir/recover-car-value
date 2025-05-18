
// app/api/vehicle/lookup/route.ts

import { NextResponse } from 'next/server';
import { lookupLicensePlate } from '@/lib/api/plateToVin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { licensePlate, state } = body;
    
    if (!licensePlate || !state) {
      return NextResponse.json(
        { error: 'License plate and state are required' },
        { status: 400 }
      );
    }
    
    const vehicleInfo = await lookupLicensePlate({ licensePlate, state });
    
    return NextResponse.json(vehicleInfo);
  } catch (error) {
    console.error('License plate lookup error:', error);
    return NextResponse.json(
      { error: 'Failed to lookup license plate' },
      { status: 500 }
    );
  }
}