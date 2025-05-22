import { fetchVinHistory } from '@/lib/api/marketCheck';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
    try {
        // Get URL parameters
        const { searchParams } = new URL(request.url);
        const vin = searchParams.get('vin');
        const order = (searchParams.get('order') as 'asc' | 'desc') || 'desc';
        const page = parseInt(searchParams.get('page') || '1', 10);

        // Validate VIN
        if (!vin) {
            return NextResponse.json(
                { error: 'VIN parameter is required' },
                { status: 400 }
            );
        }

        // Fetch VIN history
        const data = await fetchVinHistory({ vin, order, page });

        return NextResponse.json(data);
    } catch (error) {
        console.error('VIN history API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch VIN history' },
            { status: 500 }
        );
    }
}