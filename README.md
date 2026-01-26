# Recover Car Value - Diminished Value Calculator

A Next.js web application that helps car owners calculate and recover the diminished value of their vehicles after an accident. The system uses advanced algorithms, linear regression, and comparable vehicle analysis to estimate how much value a car loses after being damaged and repaired.

## 🎯 Overview

When a vehicle is involved in an accident, even after perfect repairs, it loses market value due to its accident history. This application helps users:

1. **Qualify** for a diminished value claim
2. **Calculate** their vehicle's lost value using comparable listings
3. **Generate** professional reports and demand letters
4. **Recover** compensation from at-fault insurance companies

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: React 18, Tailwind CSS, Radix UI components
- **Database**: Supabase (PostgreSQL)
- **Charts**: Chart.js, Recharts, ECharts
- **PDF Generation**: @react-pdf/renderer
- **API Integration**: RCV API (Vehicle listings), PlateToVin API

### Project Structure

```
recover-car-v2-main/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── diminished-value/     # Main calculation endpoint
│   │   ├── vehicle-value/         # Vehicle valuation
│   │   ├── vehicles/              # Vehicle data endpoints
│   │   └── ...
│   ├── qualify/                  # User qualification flow
│   │   ├── step1/                # Qualification questions
│   │   ├── step2/                # Vehicle lookup/selection
│   │   ├── step3/                # Accident details & calculation
│   │   ├── results/              # Results display
│   │   └── thank-you/            # Confirmation page
│   ├── dashboard/                # Admin/user dashboard
│   └── chart/                    # Visualization pages
├── lib/
│   ├── api/                      # External API clients
│   │   ├── marketCheck.ts        # Vehicle listing fetcher
│   │   └── plateToVin.ts        # License plate lookup
│   ├── utils/
│   │   ├── carValueCalculator.ts # Core calculation engine
│   │   ├── diminishedValueEngine.ts # Advanced DV engine
│   │   └── ...
│   └── supabase.ts               # Database client
├── components/                    # React components
│   ├── ui/                       # Reusable UI components
│   ├── CarValueChart.tsx         # Value visualization
│   └── DemandLetterPdf.tsx      # PDF generator
└── public/                       # Static assets
```

## 🔄 User Flow

### Step 1: Qualification (`/qualify/step1`)

Users answer three key questions:
- ✅ Did you have an accident in the last 4 years?
- ✅ Was it not your fault?
- ✅ Do you own the vehicle (not leased)?

**Result**: If all "yes" → proceed to Step 2, else → not qualified page

### Step 2: Vehicle Identification (`/qualify/step2`)

Two methods to identify the vehicle:

**Method A: License Plate Lookup**
- Enter license plate number and state
- System calls PlateToVin API to get VIN
- Automatically populates vehicle details

**Method B: Manual Selection**
- Select year, make, model from dropdowns
- Optionally select trim level
- Uses vehicle models API for options

**Data Stored**: Vehicle info saved to localStorage for Step 3

### Step 3: Accident Details & Calculation (`/qualify/step3`)

User provides:
- Accident date
- Repair cost
- Current mileage (min 3,000)
- Personal information (name, phone, email)
- At-fault party information
- Insurance details

**On Submit**:
1. Calls `/api/diminished-value` endpoint
2. System calculates pre-accident and post-accident values
3. Generates diminished value estimate
4. Saves to Supabase database
5. Redirects to results page

### Step 4: Results (`/qualify/results`)

Displays:
- Estimated diminished value amount
- Pre-accident value
- Post-accident value
- Quality score
- Comparable listings used
- Option to generate PDF report

### Step 5: Confirmation (`/qualify/thank-you`)

Final confirmation page with next steps

## 🧮 Core Calculation Logic

### Calculation Engine (`lib/utils/carValueCalculator.ts`)

The system implements a sophisticated algorithm based on comparable vehicle analysis:

#### 1. **Pre-Accident Value Calculation**

```typescript
// Fetch clean vehicles (no accident history)
const cleanCars = await fetchListings(
  make, model, year,
  is_accident: 0,  // Clean vehicles only
  min_miles: mileage - 15000,
  max_miles: mileage + 15000
);

// Select 10 nearest by mileage
const preNear = pickNearestByMileage(cleanCars, mileage, 10);

// Calculate linear regression (constrained: slope ≤ 0)
const preRegression = safeRegression(preMiles, prePrices);
const preValue = preRegression.slope * mileage + preRegression.intercept;
```

**Key Features**:
- Searches within ±15,000 miles of subject vehicle
- Falls back to no-trim search if trim-specific results < 3
- Uses constrained regression (slope cannot be positive)
- Ensures realistic depreciation model

#### 2. **Post-Accident Value Calculation**

```typescript
// Fetch damaged vehicles (with accident history)
const damagedCars = await fetchListings(
  make, model, year,
  is_accident: 1,  // Damaged vehicles
  min_miles: mileage - 15000,
  max_miles: mileage + 15000
);

// Filter to 75-90% of pre-value range
const minPostPrice = preValue * 0.75;
const maxPostPrice = preValue * 0.90;
const filteredPostComps = filterByPriceBand(
  damagedCars, minPostPrice, maxPostPrice
);

// Select nearest 10 from filtered list
const finalPostComps = pickNearestByMileage(filteredPostComps, mileage, 10);

// Calculate regression or use 90% fallback
if (finalPostComps.length < 2) {
  postValue = preValue * 0.90;  // Fallback
} else {
  const postRegression = safeRegression(postMiles, postPrices);
  postValue = postRegression.slope * mileage + postRegression.intercept;
}
```

**Key Features**:
- Filters damaged vehicles to realistic price range (75-90% of pre-value)
- Uses regression if sufficient comparables exist
- Falls back to 90% of pre-value if insufficient damaged comps
- Ensures post-value is never above pre-value

#### 3. **Diminished Value**

```typescript
const diminishedValue = preValue - postValue;
const diminishedPercentage = (diminishedValue / preValue) * 100;
```

### Constrained Linear Regression

The `safeRegression()` function ensures realistic depreciation:

```typescript
function safeRegression(miles: number[], prices: number[]): RegressionResult {
  // Calculate standard linear regression
  let slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  
  // CONSTRAINT: Slope must be ≤ 0 (vehicles depreciate with mileage)
  if (slope > 0) {
    slope = 0;  // Force to zero if positive
  }
  
  // Recalculate intercept with adjusted slope
  const intercept = meanPrices - slope * meanMiles;
  
  return { slope, intercept };
}
```

**Why this matters**: Prevents unrealistic appreciation models and ensures the calculation reflects real-world vehicle depreciation.

## 📡 API Endpoints

### POST `/api/diminished-value`

Main endpoint for calculating diminished value.

**Request Body**:
```json
{
  "year": 2020,
  "make": "Honda",
  "model": "Civic",
  "trim": "EX",
  "mileage": 45000,
  "state": "CA",
  "zip": "90210",
  "accidentDate": "2023-05-15",
  "repairCost": 5000,
  "accidentMileage": 40000,
  "accidentZip": "90210",
  "client_info": {...},
  "qualify_answers": {...}
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "average_clean_price_top5": 17750,
    "average_damaged_price_bottom5": 16200,
    "estimated_diminished_value": 1550,
    "diminished_value_percentage": "8.73",
    "quality_score": 80,
    "is_within_dv_range": false,
    "pre_accident_r_squared": "0.723",
    "post_accident_r_squared": "0.689",
    "pre_accident_comps": 6,
    "post_accident_comps": 5,
    "top_clean_listings": [...],
    "bottom_damaged_listings": [...],
    "qa_report": "..."
  },
  "valuation": {
    "preAccidentValue": 17750,
    "postAccidentValue": 16200,
    "diminishedValue": 1550,
    "diminishedPercentage": 8.73,
    "qualityScore": 80,
    "isWithinRange": false
  }
}
```

### GET `/api/vehicles`

Fetch vehicle makes/models/years for dropdowns.

**Query Parameters**:
- `field`: `make`, `model`, or `year`
- `year`: Filter by year (optional)
- `make`: Filter by make (optional)
- `model`: Filter by model (optional)

### GET `/api/vehicle/lookup`

Lookup vehicle by VIN or license plate.

### POST `/api/vehicle-value`

Alternative vehicle valuation endpoint (uses MarketCheck API).

## 🗄️ Database Schema

### `diminished_car_value` Table (Supabase)

Stores all calculation results:

```sql
- id (uuid, primary key)
- year, make, model, trim (vehicle info)
- mileage, accident_mileage
- accident_date, accident_zip, repair_cost
- average_clean_price_top5 (pre-accident value)
- average_damaged_price_bottom5 (post-accident value)
- estimated_diminished_value
- diminished_value_percentage
- quality_score
- is_within_dv_range
- pre_accident_r_squared, post_accident_r_squared
- pre_accident_slope, post_accident_slope
- pre_accident_comps, post_accident_comps
- top_clean_listings (JSON array)
- bottom_damaged_listings (JSON array)
- client_info (JSON)
- qualify_answers (JSON)
- qa_report (text)
- created_at (timestamp)
```

## 🔧 Setup & Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (or use existing credentials)
- API keys (see Environment Variables)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd recover-car-v2-main

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Environment Variables

Create `.env.local` file:

```bash
# Required
VEHICLE_API_KEY=your_rcv_api_key
PLATETOVIN_API_KEY=your_platetovin_key

# Optional
RADIUS_INCREMENT=50
MAX_RADIUS=500

# Supabase (currently hardcoded, but recommended)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

See `ENV_VARIABLES.md` for complete list.

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📊 Key Features

### 1. **Intelligent Comparable Selection**
- Filters vehicles by exact match (year, make, model, trim)
- Falls back gracefully when trim-specific data is insufficient
- Prioritizes vehicles closest to subject vehicle's mileage

### 2. **Quality Assurance**
- Calculates quality score based on:
  - Number of comparable listings
  - Regression fit (R²)
  - Diminished value percentage range (15-25% is ideal)
- Generates QA reports for audit trail

### 3. **Data Validation**
- Ensures minimum 3,000 miles
- Validates phone numbers (10+ digits)
- Checks for required fields before calculation

### 4. **Error Handling**
- Graceful fallbacks when API calls fail
- Clear error messages for users
- Fallback to 90% of pre-value if insufficient damaged comps

### 5. **PDF Generation**
- Generates professional demand letters
- Includes calculation details and comparable listings
- Ready for submission to insurance companies

## 🔍 How It Works - Deep Dive

### Data Flow Example

```
User Input:
  Year: 2020
  Make: Honda
  Model: Civic
  Mileage: 45,000
  State: CA

Step 1: Fetch Clean Vehicles
  → API Call: RCV API with is_accident=0
  → Results: 25 clean Honda Civics (2020)
  → Filter: Within 30,000-60,000 miles
  → Select: 10 nearest to 45,000 miles
  → Regression: Price = -0.25 * Mileage + 30,000
  → Pre-Value: $17,750

Step 2: Fetch Damaged Vehicles
  → API Call: RCV API with is_accident=1
  → Results: 12 damaged Honda Civics (2020)
  → Price Filter: $13,312 - $15,975 (75-90% of $17,750)
  → Select: 10 nearest to 45,000 miles
  → Regression: Price = -0.23 * Mileage + 28,500
  → Post-Value: $16,200

Step 3: Calculate Diminished Value
  → Diminished Value: $17,750 - $16,200 = $1,550
  → Percentage: 8.73%
  → Quality Score: 80/100
  → Status: Below ideal range (15-25%), but valid

Step 4: Save to Database
  → Insert into Supabase
  → Return result to frontend
  → Display to user
```

### Regression Constraints

The system enforces **β₁ ≤ 0** constraint:
- **Why**: Vehicles should depreciate with mileage, not appreciate
- **How**: If calculated slope > 0, it's set to 0
- **Impact**: Ensures realistic valuation models

### Price Band Filtering

Post-accident vehicles are filtered to 75-90% of pre-value:
- **Why**: Damaged vehicles should be worth less, but not drastically less
- **Logic**: Prevents outliers from skewing calculations
- **Fallback**: If < 2 vehicles in range, use 90% of pre-value

## 🧪 Testing

### Manual Testing Flow

1. **Qualification Test**
   - Answer all "yes" → should proceed
   - Answer any "no" → should show not qualified

2. **Vehicle Lookup Test**
   - Enter valid license plate → should populate vehicle info
   - Or manually select vehicle → should save to localStorage

3. **Calculation Test**
   - Fill Step 3 form with valid data
   - Submit → should calculate and show results
   - Check quality score and comparable listings

4. **Edge Cases**
   - Very low mileage (< 3,000) → should show error
   - Invalid phone → should show validation error
   - No comparable vehicles → should handle gracefully

## 📝 Key Files Explained

### `lib/utils/carValueCalculator.ts`
Core calculation engine - implements the exact logic from `car__value.py`:
- `fetchListings()` - Gets vehicles from RCV API
- `pickNearestByMileage()` - Selects closest vehicles
- `safeRegression()` - Constrained linear regression
- `calculateAndPlot()` - Main calculation function

### `app/api/diminished-value/route.ts`
Main API endpoint that:
- Validates input
- Calls calculation engine
- Saves to database
- Returns formatted response
- Handles errors gracefully

### `lib/api/marketCheck.ts`
API client for vehicle listings:
- `fetchListings()` - Gets comparable vehicles
- `fetchVinHistory()` - Gets vehicle history
- Handles API key authentication
- Error handling and retries

### `components/CarValueChart.tsx`
Visualization component showing:
- Scatter plot of comparable vehicles
- Regression lines
- Subject vehicle marker
- Pre/post accident values

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Ensure:
- Node.js 18+ runtime
- Environment variables configured
- Supabase connection accessible
- API endpoints publicly accessible

## 📚 Additional Documentation

- `CAR_VALUE_FLOW.md` - Detailed calculation flow
- `PROJECT_STRUCTURE.md` - Component architecture
- `ENV_VARIABLES.md` - Environment configuration
- `DIMINISHED_VALUE_QUICK_START.md` - Quick reference guide

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

[Add your license here]

## 🆘 Support

For issues or questions:
- Check existing documentation
- Review error logs in browser console
- Check API endpoint responses in Network tab
- Verify environment variables are set correctly

---

**Built with ❤️ for helping car owners recover their vehicle's lost value**
