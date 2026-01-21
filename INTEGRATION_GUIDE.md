# Car Value Calculator - React Integration Guide

## Overview

This guide explains how to integrate the car value calculation functionality (originally from `car__value.py`) into your React/Next.js application.

## Files Created

### 1. Core Utility (`lib/utils/carValueCalculator.ts`)
- Contains the main calculation logic matching the Python implementation
- Functions: `fetchListings`, `pickNearestByMileage`, `filterByPriceBand`, `safeRegression`, `calculateAndPlot`

### 2. API Route (`app/api/car-value/route.ts`)
- Next.js API endpoint that handles car value calculations
- Accepts POST requests with vehicle information
- Returns pre-value, post-value, and diminished value

### 3. React Hook (`hooks/useCarValueCalculation.ts`)
- Custom React hook for easy integration
- Provides `calculate`, `loading`, `error`, and `data` states
- Handles API calls and state management

### 4. Chart Component (`components/CarValueChart.tsx`)
- Visualizes calculation results with scatter plots
- Shows regression lines and subject vehicle
- Similar to Python matplotlib plots

### 5. Example Component (`components/CarValueCalculator.tsx`)
- Complete example showing how to use the calculator
- Includes form inputs and result display

## Usage Examples

### Basic Usage with Hook

```tsx
import { useCarValueCalculation } from '@/hooks/useCarValueCalculation';

function MyComponent() {
  const { calculate, loading, error, data } = useCarValueCalculation();

  const handleCalculate = async () => {
    const result = await calculate({
      year: 2024,
      make: 'BMW',
      model: '430',
      mileage: 20000,
      trim: 'xDrive' // optional
    });

    if (result) {
      console.log('Pre-value:', result.pre_value);
      console.log('Post-value:', result.post_value);
      console.log('Diminished value:', result.diminished_value);
    }
  };

  return (
    <div>
      <button onClick={handleCalculate} disabled={loading}>
        Calculate
      </button>
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <p>Pre-Accident: ${data.pre_value}</p>
          <p>Post-Accident: ${data.post_value}</p>
          <p>Diminished: ${data.diminished_value}</p>
        </div>
      )}
    </div>
  );
}
```

### Direct API Call

```tsx
async function calculateCarValue() {
  const response = await fetch('/api/car-value', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      year: 2024,
      make: 'BMW',
      model: '430',
      mileage: 20000,
      trim: 'xDrive'
    })
  });

  const result = await response.json();
  return result;
}
```

### Using the Chart Component

```tsx
import { CarValueChart } from '@/components/CarValueChart';

function ResultsDisplay({ data }) {
  return (
    <div className="grid grid-cols-2">
      <CarValueChart
        title="Pre-Accident Value"
        comps={data.pre_comps}
        regression={data.pre_regression}
        currentMileage={20000}
        predictedValue={data.pre_value}
      />
      <CarValueChart
        title="Post-Accident Value"
        comps={data.post_comps}
        regression={data.post_regression}
        currentMileage={20000}
        predictedValue={data.post_value}
      />
    </div>
  );
}
```

## API Response Format

```typescript
{
  success: true,
  pre_value: number,           // Pre-accident value
  post_value: number,           // Post-accident value
  diminished_value: number,     // Difference
  pre_comps: CarListing[],      // Comparable clean cars
  post_comps: CarListing[],     // Comparable damaged cars
  pre_regression: {
    slope: number,
    intercept: number
  },
  post_regression: {
    slope: number,
    intercept: number
  }
}
```

## Key Differences from Python

1. **No SVG File Generation**: Instead of saving SVG files, the chart component renders directly in React
2. **TypeScript Types**: All functions are fully typed
3. **Async/Await**: Uses modern JavaScript async patterns
4. **React Integration**: Designed for React component usage

## Algorithm Details

The calculation follows the exact same logic as the Python version:

1. **Pre-Accident**:
   - Fetches clean cars (is_accident=0) within ±15,000 miles
   - Picks nearest 10 by mileage
   - Calculates regression with slope ≤ 0 constraint
   - Predicts value at current mileage

2. **Post-Accident**:
   - Fetches damaged cars (is_accident=1) within ±30,000 miles
   - Filters to 75-90% of pre-value
   - Picks nearest 10 from filtered list
   - Calculates regression and caps value

3. **Diminished Value**:
   - Simple difference: pre_value - post_value

## Error Handling

The hook and API route include comprehensive error handling:
- Validation of required fields
- Network error handling
- API error responses
- Loading states

## Next Steps

1. Import the hook or component where needed
2. Customize the UI to match your design system
3. Add additional validation or business logic as needed
4. Integrate with your existing forms and workflows
