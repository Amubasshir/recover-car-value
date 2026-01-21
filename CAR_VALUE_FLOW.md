# Car Value Calculation Flow Documentation

## Overview
The `car__value.py` file implements a diminished value calculation system that estimates vehicle values before and after an accident using comparable listings and linear regression.

## Main Flow

### 1. **fetch_listings()** (Lines 10-28)
- **Purpose**: Fetches car listings from RCV API
- **Input**: make, model, year, is_accident (0/1), min_miles, max_miles, trim (optional), limit
- **Output**: Array of car listings
- **API Endpoint**: `https://rcv.btkdeals.com/api/fetchSimilarCars.php`
- **Key Parameters**:
  - `is_accidental`: 0 for clean cars, 1 for damaged cars
  - `sort`: "price"
  - `order`: "desc"

### 2. **pick_nearest_by_mileage()** (Lines 33-38)
- **Purpose**: Selects N cars closest to target mileage
- **Logic**: Sorts by absolute difference from current mileage
- **Returns**: Top N closest cars

### 3. **filter_by_price_band()** (Lines 43-47)
- **Purpose**: Filters cars within a price range
- **Used for**: Post-accident filtering (75-90% of pre-value)

### 4. **safe_regression()** (Lines 52-66)
- **Purpose**: Performs linear regression with constraint (slope ≤ 0)
- **Key Logic**:
  - If slope > 0, sets slope to 0 (ensures depreciation)
  - Recalculates intercept with adjusted slope
- **Returns**: (slope, intercept) tuple

### 5. **plot_svg()** (Lines 71-103)
- **Purpose**: Creates scatter plot with regression line
- **Features**:
  - Scatter points for comparable cars
  - Regression line
  - Subject vehicle marked with "X"
- **Output**: SVG file saved to `Plots/` directory
- **Returns**: Predicted price (rounded to 2 decimals)

### 6. **calculate_and_plot()** - MAIN FUNCTION (Lines 108-190)

#### Pre-Accident Calculation:
1. Fetch clean cars (is_accident=0) within ±15,000 miles
2. If trim specified and < 5 results, retry without trim
3. Pick nearest 10 by mileage
4. Calculate regression (slope, intercept)
5. Generate pre-accident value
6. Create SVG plot

#### Post-Accident Calculation:
1. Fetch damaged cars (is_accident=1) within ±30,000 miles
2. Calculate price bounds: 75-90% of pre-value
3. Filter damaged cars within price band
4. Pick nearest 10 from filtered list
5. Fill remaining slots if < 10 (from all damaged cars)
6. Calculate regression
7. Cap post-value between 75-90% of pre-value
8. Adjust intercept if value was capped
9. Create SVG plot

#### Return Value:
```python
{
    "pre_value": float,
    "post_value": float,
    "diminished_value": float,
    "pre_svg": "path/to/pre.svg",
    "post_svg": "path/to/post.svg"
}
```

## Key Constants
- **Mileage Window (Pre)**: ±15,000 miles
- **Mileage Window (Post)**: ±30,000 miles
- **Min Mileage**: 3,000 miles
- **Price Band (Post)**: 75-90% of pre-value
- **Comparables Count**: 10 for both pre and post

## Data Flow Diagram
```
Input: (year, make, model, mileage, trim?)
    ↓
[Fetch Clean Cars] → [Pick Nearest 10] → [Regression] → [Pre Value]
    ↓
[Fetch Damaged Cars] → [Filter 75-90%] → [Pick Nearest 10] → [Regression] → [Post Value]
    ↓
[Calculate Diminished Value] → [Generate Plots] → [Return Results]
```
