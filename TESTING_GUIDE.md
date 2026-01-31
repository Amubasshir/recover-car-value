# Testing Guide for Car Value Calculator

## How to Test from the UI

### Prerequisites

1. Start the dev server:
   ```bash
   npm run dev
   ```
2. Open **http://localhost:3000** in your browser.

---

### Option A: Full qualify flow (diminished-value API + results)

This flow calls **`/api/diminished-value`**, saves the result to the database, and shows the estimated diminished value on the results page.

1. **Home** → Click **“Click to see if you qualify”** (or **“Click to see Total Loss”** for total-loss flow).
2. **Step 1 – Qualify** (`/qualify/step1`)  
   - Answer all three questions with **Yes**.  
   - Click **Continue** → you go to Step 2.
3. **Step 2 – Find vehicle** (`/qualify/step2`)  
   - Choose **“Enter vehicle manually”** (or use license plate if you have it).  
   - **Year**: e.g. `2024`  
   - **Make**: e.g. `BMW`  
   - **Model**: e.g. `430`  
   - **Trim**: optional, e.g. `xDrive`  
   - Click **Continue**.
4. **Step 3 – Confirm details** (`/qualify/step3`)  
   - **Accident date**: any date  
   - **State**: e.g. `CA`  
   - **Mileage at accident**: **≥ 3000** (e.g. `15000`)  
   - **First / Last name, Phone, Email**: any valid values  
   - Click **“Receive Instant Diminished Cash Value!”**.

5. **Results** (`/qualify/results`)  
   - You should see the estimated diminished value range (e.g. `$X - $Y`).  
   - The same run is stored in the DB and can be used for the report/PDF.

**Required for diminished-value API:** `year`, `make`, `model`, `mileage`, **`state`**.  
If any of these are missing, the API returns 400.

---

### Option B: Quick test page (calculation + charts only)

This uses **`/api/car-value`** only (no DB, no state required). Good for testing pre/post value logic and charts.

1. Go to **http://localhost:3000/test-car-value**.
2. Use **Quick Tests** or fill the form:
   - **Year**: e.g. `2024`
   - **Make**: e.g. `bmw` (lowercase is fine)
   - **Model**: e.g. `430`
   - **Mileage**: e.g. `20000`
   - **Trim**: optional, e.g. `xDrive`
3. Click **“Calculate Values”**.
4. You should see:
   - **Pre-Accident Value**, **Post-Accident Value**, **Diminished Value**
   - **Pre-Accident** and **Post-Accident** charts (post chart only if ≥2 post comps; otherwise fallback 90% and no post chart)
   - **Raw Response Data** (includes `post_plot_generated`)

**No `state` required** here; only year, make, model, mileage.

---

### Viewing the report PDF (dashboard)

The **dashboard** (`/dashboard`) shows saved valuation records and a **“Download PDF”** button that generates the diminished-value report (pre- and post-accident charts, comps, etc.).  
If **post-accident comps &lt; 2** (fallback 90%), the PDF does **not** include a post-accident chart.  
To test the PDF:

1. Complete **Option A** at least once so a record exists in the DB.
2. Go to **http://localhost:3000/dashboard** (if your app links to it or you open it directly).
3. Find the record and click **Download PDF**.

---

## Quick Test Methods

### 1. Test API Endpoint Directly (Easiest)

#### Using cURL
```bash
curl -X POST http://localhost:3000/api/car-value \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2024,
    "make": "bmw",
    "model": "430",
    "mileage": 20000,
    "trim": "xDrive"
  }'
```

#### Using Postman/Insomnia
- **URL**: `http://localhost:3000/api/car-value`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body** (JSON):
```json
{
  "year": 2024,
  "make": "bmw",
  "model": "430",
  "mileage": 20000,
  "trim": "xDrive"
}
```

#### Using Browser Console (Fetch API)
```javascript
fetch('/api/car-value', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    year: 2024,
    make: 'bmw',
    model: '430',
    mileage: 20000,
    trim: 'xDrive'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

### 2. Test React Hook

Create a test page or add to an existing page:

```tsx
// app/test-car-value/page.tsx
'use client';

import { useCarValueCalculation } from '@/hooks/useCarValueCalculation';
import { useState } from 'react';

export default function TestPage() {
  const { calculate, loading, error, data } = useCarValueCalculation();
  const [result, setResult] = useState(null);

  const testCalculate = async () => {
    const result = await calculate({
      year: 2024,
      make: 'bmw',
      model: '430',
      mileage: 20000,
      trim: 'xDrive'
    });
    setResult(result);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Car Value Calculator Test</h1>
      
      <button 
        onClick={testCalculate} 
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? 'Calculating...' : 'Test Calculate'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {data && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h2 className="font-bold mb-2">Results:</h2>
          <pre className="overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

### 3. Test with Example Component

Simply import and use the provided component:

```tsx
// app/test/page.tsx
import { CarValueCalculator } from '@/components/CarValueCalculator';

export default function TestPage() {
  return <CarValueCalculator />;
}
```

## Test Cases

### Valid Test Cases

#### Test Case 1: Basic Calculation
```json
{
  "year": 2024,
  "make": "bmw",
  "model": "430",
  "mileage": 20000
}
```

#### Test Case 2: With Trim
```json
{
  "year": 2024,
  "make": "bmw",
  "model": "430",
  "mileage": 20000,
  "trim": "xDrive"
}
```

#### Test Case 3: Different Make/Model
```json
{
  "year": 2023,
  "make": "toyota",
  "model": "camry",
  "mileage": 30000
}
```

#### Test Case 4: High Mileage
```json
{
  "year": 2020,
  "make": "honda",
  "model": "accord",
  "mileage": 80000
}
```

### Error Test Cases

#### Missing Required Field
```json
{
  "year": 2024,
  "make": "bmw"
  // Missing model and mileage
}
```
**Expected**: 400 error with message about missing fields

#### Invalid Year
```json
{
  "year": 1990,
  "make": "bmw",
  "model": "430",
  "mileage": 20000
}
```
**Expected**: May return empty results or error

#### Invalid Mileage
```json
{
  "year": 2024,
  "make": "bmw",
  "model": "430",
  "mileage": -1000
}
```
**Expected**: Should handle gracefully (may use min 3000 miles)

## Testing Checklist

- [ ] API endpoint responds correctly
- [ ] Returns pre_value, post_value, diminished_value
- [ ] Returns comparable listings arrays
- [ ] Returns regression data (slope, intercept)
- [ ] Handles missing fields gracefully
- [ ] Handles network errors
- [ ] Loading states work correctly
- [ ] Error messages are clear
- [ ] Charts render correctly
- [ ] Works with different vehicle makes/models
- [ ] Works with and without trim
- [ ] Handles edge cases (very low/high mileage)

## Expected Response Structure

```json
{
  "success": true,
  "pre_value": 45000.00,
  "post_value": 36000.00,
  "diminished_value": 9000.00,
  "pre_comps": [
    {
      "price": 48000,
      "mileage": 18000,
      "make": "bmw",
      "model": "430",
      ...
    }
  ],
  "post_comps": [
    {
      "price": 35000,
      "mileage": 22000,
      "make": "bmw",
      "model": "430",
      ...
    }
  ],
  "pre_regression": {
    "slope": -0.15,
    "intercept": 48000
  },
  "post_regression": {
    "slope": -0.12,
    "intercept": 36500
  }
}
```

## Debugging Tips

1. **Check Network Tab**: Look at the API request/response in browser DevTools
2. **Check Console**: Look for error messages or warnings
3. **Verify API Endpoint**: Make sure the RCV API is accessible
4. **Check Data Format**: Ensure the response matches expected structure
5. **Test Individual Functions**: You can test utility functions directly in Node.js

## Manual Testing Script

Save this as `test-api.js` and run with Node.js:

```javascript
async function testCarValue() {
  try {
    const response = await fetch('http://localhost:3000/api/car-value', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        year: 2024,
        make: 'bmw',
        model: '430',
        mileage: 20000,
        trim: 'xDrive'
      })
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    // Validate response
    if (data.success) {
      console.log('\n✅ Test Passed!');
      console.log(`Pre-value: $${data.pre_value}`);
      console.log(`Post-value: $${data.post_value}`);
      console.log(`Diminished: $${data.diminished_value}`);
      console.log(`Pre comps: ${data.pre_comps.length}`);
      console.log(`Post comps: ${data.post_comps.length}`);
    } else {
      console.log('\n❌ Test Failed:', data.error);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testCarValue();
```

Run with: `node test-api.js` (make sure your Next.js server is running)
