# API Documentation & React Integration Guide

Complete guide for all API endpoints and React integration examples.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [API Endpoints](#api-endpoints)
3. [React Integration](#react-integration)
4. [TypeScript Types](#typescript-types)
5. [Complete Examples](#complete-examples)

---

## 🚀 Quick Start

### Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

### Environment Variables
```env
VEHICLE_API_KEY=your_api_key_here
PLATETOVIN_API_KEY=your_platetovin_key_here
```

---

## 📡 API Endpoints

### 1. POST `/api/diminished-value`

Calculate diminished value after an accident.

**Request:**
```typescript
{
  year: number;              // Required: Vehicle year (e.g., 2020)
  make: string;              // Required: Vehicle make (e.g., "Honda")
  model: string;             // Required: Vehicle model (e.g., "Civic")
  trim?: string;             // Optional: Trim level
  mileage: number;           // Required: Current mileage
  state: string;             // Required: State code (e.g., "CA")
  zip?: string;             // Optional: ZIP code
  accidentMileage?: number;  // Optional: Mileage at accident
  accidentZip?: string;     // Optional: Accident ZIP
  accidentDate?: string;     // Optional: Accident date (ISO)
  repairCost?: number;      // Optional: Repair cost
  vin?: string;             // Optional: VIN
  client_info?: {           // Optional: Client info
    name: string;
    phone: string;
    email: string;
    insuranceCompanyName?: string;
    insuranceCompanyAddress?: string;
    insuredName?: string;
    claimNumber?: string;
  };
  qualify_answers?: any;    // Optional: Qualification data
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    id: string;
    average_clean_price_top5: number;        // Pre-accident value
    average_damaged_price_bottom5: number;   // Post-accident value
    estimated_diminished_value: number;      // Diminished value
    diminished_value_percentage: string;      // Percentage lost
    quality_score: number;                   // 0-100 quality score
    is_within_dv_range: boolean;            // Within ideal 15-25% range
    pre_accident_comps: number;              // Comparables used
    post_accident_comps: number;
    top_clean_listings: Array<ComparableListing>;
    bottom_damaged_listings: Array<ComparableListing>;
    qa_report: string;
  };
  valuation: {
    preAccidentValue: number;
    postAccidentValue: number;
    diminishedValue: number;
    diminishedPercentage: number;
    qualityScore: number;
    isWithinRange: boolean;
  };
}
```

---

### 2. POST `/api/car-value`

Calculate pre/post accident values (simplified).

**Request:**
```typescript
{
  year: number;      // Required
  make: string;      // Required
  model: string;     // Required
  mileage: number;   // Required
  trim?: string;     // Optional
}
```

**Response:**
```typescript
{
  success: boolean;
  pre_value: number;
  post_value: number;
  diminished_value: number;
  pre_comps: Array<CarListing>;
  post_comps: Array<CarListing>;
  pre_regression: { slope: number; intercept: number };
  post_regression: { slope: number; intercept: number };
}
```

---

### 3. POST `/api/vehicle/lookup`

Lookup vehicle by license plate or VIN.

**Request:**
```typescript
{
  licensePlate?: string;  // License plate
  state?: string;         // State code (required with licensePlate)
  vin?: string;           // VIN (alternative)
}
```

**Response:**
```typescript
{
  vin: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
}
```

---

### 4. GET `/api/vehicle/models`

Get vehicle years, makes, models, or trims.

**Query Parameters:**
- `type`: `"years"` | `"makes"` | `"models"` | `"trims"` (required)
- `year`: number (required for makes/models/trims)
- `make`: string (required for models/trims)
- `model`: string (required for trims)

**Examples:**
```
GET /api/vehicle/models?type=years
GET /api/vehicle/models?type=makes&year=2020
GET /api/vehicle/models?type=models&year=2020&make=Honda
GET /api/vehicle/models?type=trims&year=2020&make=Honda&model=Civic
```

**Response:**
```typescript
// For years
{ years: Array<{ value: number; label: string }> }

// For makes
{ makes: Array<{ value: string; label: string }> }

// For models
{ models: Array<{ value: string; label: string; make: string; year: number }> }

// For trims
{ trims: Array<{ value: string; label: string; make: string; model: string; year: number }> }
```

---

### 5. GET `/api/vehicles/trims`

Get trims for a vehicle.

**Query Parameters:**
- `year`: number (required)
- `make`: string (required)
- `model`: string (required)
- `field`: string (optional, default: "trim")

**Response:**
```typescript
{ data: Array<string> }
```

---

### 6. GET `/api/vehicles/options`

Get vehicle options/facets.

**Query Parameters:**
- `field`: `"make"` | `"model"` | `"year"` | `"trim"` (required)
- `year`: number (optional filter)
- `make`: string (optional filter)
- `model`: string (optional filter)

**Response:**
```typescript
{ data: Array<string> }
```

---

### 7. GET `/api/vin-history`

Get vehicle history by VIN.

**Query Parameters:**
- `vin`: string (required)
- `order`: `"asc"` | `"desc"` (optional, default: "desc")
- `page`: number (optional, default: 1)

---

### 8. POST `/api/vehicle-value`

Calculate vehicle value (alternative method).

**Request:**
```typescript
{
  year: number;
  make: string;
  model: string;
  mileage: number;
  trim?: string;
  vehicleId?: string;
}
```

**Response:**
```typescript
{
  pre_predicted: number;
  post_predicted: number;
  diminished_value: number;
  diminished_percentage: number | null;
  pre_selected_listings: Array<VehicleListing>;
  post_selected_listings: Array<VehicleListing>;
  preSvg: string;  // SVG chart
  postSvg: string; // SVG chart
}
```

---

### 9. POST `/api/reports/generate`

Generate PDF reports.

**Request:**
```typescript
{
  reportType: string;              // Required: "DV"
  sourceSystem: string;            // Required
  sourceRecordId: string;          // Required
  client: {                        // Required
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  };
  vehicle: {                       // Required
    year: number;
    make: string;
    model: string;
    mileage: number;
    zip: string;
    state: string;
    vin?: string;
    trim?: string;
  };
  claim: {                         // Required
    claimNumber: string;
    dateOfLoss: string;
    repairCost?: number;
  };
  options?: {
    rerun?: boolean;
  };
}
```

**Response:**
```typescript
{
  status: "success" | "error";
  summary: {
    preAccidentFMV: number;
    postAccidentFMV: number;
    diminishedValue: number;
    dvPercent: number;
    compsUsed: number;
    method: string;
    r2: number;
    confidence: "high" | "medium" | "low";
  };
  pdf: {
    filename: string;
    base64: string;
    size: number;
  };
  cached?: boolean;
}
```

---

## ⚛️ React Integration

### Using Custom Hooks

#### useCarValueCalculation Hook

```typescript
import { useCarValueCalculation } from '@/hooks/useCarValueCalculation';

function MyComponent() {
  const { calculate, loading, error, data, reset } = useCarValueCalculation();

  const handleCalculate = async () => {
    const result = await calculate({
      year: 2020,
      make: 'Honda',
      model: 'Civic',
      mileage: 45000,
      trim: 'EX'
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
        {loading ? 'Calculating...' : 'Calculate Value'}
      </button>
      
      {error && <div className="error">Error: {error}</div>}
      
      {data && (
        <div className="results">
          <p>Pre-Accident: ${data.pre_value?.toLocaleString()}</p>
          <p>Post-Accident: ${data.post_value?.toLocaleString()}</p>
          <p>Diminished: ${data.diminished_value?.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
```

#### useValueCalculation Hook

```typescript
import { useValueCalculation } from '@/hooks/useValueCalculation';

function CalculateComponent() {
  const { calculateValues, loading, error, data } = useValueCalculation();

  const handleSubmit = async (formData: VehicleFormData) => {
    try {
      const result = await calculateValues({
        year: formData.year,
        make: formData.make,
        model: formData.model,
        mileage: formData.mileage,
        trim: formData.trim
      });
      console.log('Result:', result);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Calculate'}
      </button>
    </form>
  );
}
```

---

### Direct Fetch Calls

#### Diminished Value Calculation

```typescript
async function calculateDiminishedValue(vehicleData: {
  year: number;
  make: string;
  model: string;
  mileage: number;
  state: string;
  trim?: string;
  accidentDate?: string;
  repairCost?: number;
  client_info?: any;
}) {
  try {
    const response = await fetch('/api/diminished-value', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vehicleData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Calculation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage
const handleCalculate = async () => {
  try {
    const result = await calculateDiminishedValue({
      year: 2020,
      make: 'Honda',
      model: 'Civic',
      mileage: 45000,
      state: 'CA',
      trim: 'EX',
      accidentDate: '2023-05-15',
      repairCost: 5000,
      client_info: {
        name: 'John Doe',
        phone: '555-1234',
        email: 'john@example.com'
      }
    });

    console.log('Diminished Value:', result.valuation.diminishedValue);
    console.log('Quality Score:', result.valuation.qualityScore);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Vehicle Lookup

```typescript
async function lookupVehicle(licensePlate: string, state: string) {
  try {
    const response = await fetch('/api/vehicle/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licensePlate, state }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Lookup failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage
const handleLookup = async () => {
  try {
    const vehicleInfo = await lookupVehicle('ABC1234', 'CA');
    setVehicleData({
      year: vehicleInfo.year,
      make: vehicleInfo.make,
      model: vehicleInfo.model,
      vin: vehicleInfo.vin,
      trim: vehicleInfo.trim
    });
  } catch (error) {
    setError('Failed to lookup vehicle');
  }
};
```

#### Fetch Vehicle Models (Cascading Dropdowns)

```typescript
async function fetchVehicleData(
  type: 'years' | 'makes' | 'models' | 'trims',
  filters?: { year?: number; make?: string; model?: string }
) {
  try {
    const params = new URLSearchParams({ type });
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.make) params.append('make', filters.make);
    if (filters?.model) params.append('model', filters.model);

    const response = await fetch(`/api/vehicle/models?${params.toString()}`);
    
    if (!response.ok) throw new Error('Failed to fetch');

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage in component
function VehicleSelector() {
  const [years, setYears] = useState<Array<{value: number, label: string}>>([]);
  const [makes, setMakes] = useState<Array<{value: string, label: string}>>([]);
  const [models, setModels] = useState<Array<{value: string, label: string}>>([]);
  const [trims, setTrims] = useState<Array<{value: string, label: string}>>([]);
  
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // Load years on mount
  useEffect(() => {
    fetchVehicleData('years').then(data => setYears(data.years));
  }, []);

  // Load makes when year changes
  useEffect(() => {
    if (selectedYear) {
      fetchVehicleData('makes', { year: selectedYear })
        .then(data => setMakes(data.makes));
    }
  }, [selectedYear]);

  // Load models when make changes
  useEffect(() => {
    if (selectedYear && selectedMake) {
      fetchVehicleData('models', { year: selectedYear, make: selectedMake })
        .then(data => setModels(data.models));
    }
  }, [selectedYear, selectedMake]);

  // Load trims when model changes
  useEffect(() => {
    if (selectedYear && selectedMake && selectedModel) {
      fetchVehicleData('trims', { 
        year: selectedYear, 
        make: selectedMake, 
        model: selectedModel 
      }).then(data => setTrims(data.trims));
    }
  }, [selectedYear, selectedMake, selectedModel]);

  return (
    <div>
      <select value={selectedYear || ''} onChange={(e) => setSelectedYear(Number(e.target.value))}>
        <option value="">Select Year</option>
        {years.map(year => (
          <option key={year.value} value={year.value}>{year.label}</option>
        ))}
      </select>

      {selectedYear && (
        <select value={selectedMake || ''} onChange={(e) => setSelectedMake(e.target.value)}>
          <option value="">Select Make</option>
          {makes.map(make => (
            <option key={make.value} value={make.value}>{make.label}</option>
          ))}
        </select>
      )}

      {selectedMake && (
        <select value={selectedModel || ''} onChange={(e) => setSelectedModel(e.target.value)}>
          <option value="">Select Model</option>
          {models.map(model => (
            <option key={model.value} value={model.value}>{model.label}</option>
          ))}
        </select>
      )}

      {selectedModel && (
        <select>
          <option value="">Select Trim</option>
          {trims.map(trim => (
            <option key={trim.value} value={trim.value}>{trim.label}</option>
          ))}
        </select>
      )}
    </div>
  );
}
```

---

### Error Handling

```typescript
async function apiCallWithErrorHandling<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      switch (response.status) {
        case 400:
          throw new Error(errorData.error || 'Invalid request');
        case 404:
          throw new Error('Endpoint not found');
        case 500:
          throw new Error(errorData.error || 'Server error');
        default:
          throw new Error(errorData.error || `HTTP ${response.status}`);
      }
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
}

// Usage
try {
  const result = await apiCallWithErrorHandling('/api/diminished-value', {
    method: 'POST',
    body: JSON.stringify(vehicleData),
  });
  console.log('Success:', result);
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message);
    setErrorMessage(error.message);
  }
}
```

---

## 📝 TypeScript Types

```typescript
// types/api.ts

export interface DiminishedValueRequest {
  year: number;
  make: string;
  model: string;
  trim?: string;
  mileage: number;
  state: string;
  zip?: string;
  accidentMileage?: number;
  accidentZip?: string;
  accidentDate?: string;
  repairCost?: number;
  vin?: string;
  heading?: string;
  selectedMethod?: string;
  client_info?: ClientInfo;
  qualify_answers?: any;
}

export interface ClientInfo {
  name: string;
  phone: string;
  email: string;
  insuranceCompanyName?: string;
  insuranceCompanyAddress?: string;
  insuredName?: string;
  claimNumber?: string;
}

export interface ComparableListing {
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  vin: string;
  title_status: string;
  is_accidental: number;
  dealer_name: string;
  dealer_city: string;
  dealer_state: string;
  dealer_zip: string;
}

export interface DiminishedValueResponse {
  success: boolean;
  data: {
    id: string;
    year: number;
    make: string;
    model: string;
    trim: string;
    average_clean_price_top5: number;
    average_damaged_price_bottom5: number;
    estimated_diminished_value: number;
    diminished_value_percentage: string;
    quality_score: number;
    is_within_dv_range: boolean;
    pre_accident_r_squared: string;
    post_accident_r_squared: string;
    pre_accident_comps: number;
    post_accident_comps: number;
    top_clean_listings: ComparableListing[];
    bottom_damaged_listings: ComparableListing[];
    qa_report: string;
    created_at: string;
  };
  valuation: {
    preAccidentValue: number;
    postAccidentValue: number;
    diminishedValue: number;
    diminishedPercentage: number;
    qualityScore: number;
    isWithinRange: boolean;
  };
}

export interface CarValueRequest {
  year: number;
  make: string;
  model: string;
  mileage: number;
  trim?: string;
}

export interface CarValueResponse {
  success: boolean;
  pre_value: number;
  post_value: number;
  diminished_value: number;
  pre_comps: CarListing[];
  post_comps: CarListing[];
  pre_regression: RegressionResult;
  post_regression: RegressionResult;
}

export interface CarListing {
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  vin?: string;
}

export interface RegressionResult {
  slope: number;
  intercept: number;
}

export interface VehicleLookupRequest {
  licensePlate?: string;
  state?: string;
  vin?: string;
}

export interface VehicleLookupResponse {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
}
```

---

## 🎯 Complete Examples

### Diminished Value Calculator Component

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { DiminishedValueRequest, DiminishedValueResponse } from '@/types/api';

export function DiminishedValueCalculator() {
  const [formData, setFormData] = useState<Partial<DiminishedValueRequest>>({
    year: undefined,
    make: '',
    model: '',
    mileage: undefined,
    state: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiminishedValueResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/diminished-value', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Calculation failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Diminished Value Calculator</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={formData.year || ''}
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              required
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state || ''}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="make">Make</Label>
            <Input
              id="make"
              value={formData.make || ''}
              onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={formData.model || ''}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="mileage">Mileage</Label>
            <Input
              id="mileage"
              type="number"
              value={formData.mileage || ''}
              onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
              required
            />
          </div>

          <div>
            <Label htmlFor="trim">Trim (Optional)</Label>
            <Input
              id="trim"
              value={formData.trim || ''}
              onChange={(e) => setFormData({ ...formData, trim: e.target.value })}
            />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Calculating...' : 'Calculate Diminished Value'}
        </Button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Results</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Pre-Accident Value</p>
              <p className="text-2xl font-bold">
                ${result.valuation.preAccidentValue.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Post-Accident Value</p>
              <p className="text-2xl font-bold">
                ${result.valuation.postAccidentValue.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Diminished Value</p>
              <p className="text-2xl font-bold text-red-600">
                ${result.valuation.diminishedValue.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Quality Score</p>
              <p className="text-2xl font-bold">
                {result.valuation.qualityScore}/100
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm">
              Diminished Percentage: {result.valuation.diminishedPercentage.toFixed(2)}%
            </p>
            <p className="text-sm">
              Comparables Used: {result.data.pre_accident_comps} clean, {result.data.post_accident_comps} damaged
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## ✅ Best Practices

1. **Always handle errors**: Wrap API calls in try-catch blocks
2. **Show loading states**: Provide user feedback during API calls
3. **Validate input**: Validate data before sending to API
4. **Use TypeScript**: Define types for request/response objects
5. **Debounce rapid calls**: Use debouncing for search/autocomplete
6. **Cache responses**: Cache vehicle model data to reduce API calls
7. **Handle network errors**: Provide fallback UI for network failures
8. **Use custom hooks**: Encapsulate API logic in reusable hooks

---

## 📚 Additional Resources

- Main README.md for project setup
- Check browser console for error logs
- Verify environment variables are configured
- Check Network tab for API responses

---

**Built for helping car owners recover their vehicle's lost value** 🚗
