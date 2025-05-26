/**
 * Diminished Value Calculator - JavaScript Implementation
 * Converted from Python script
 */

// -------------------------------
// CONFIGURATION
// -------------------------------
const CONFIG = {
  API_KEY: "YOUR_API_KEY", // <-- Set your API Key here
  subject_year: 2022,
  subject_make: "Toyota",
  subject_model: "Camry",
  subject_trim: "XSE",
  subject_mileage: 28000,
  subject_zip: "30301",
  
  BASE_CLEAN_RADIUS: 50,
  BASE_DAMAGED_RADIUS: 100,
  RADIUS_INCREMENT: 50,
  MAX_RADIUS: 200,
  
  API_URL: "https://api.marketcheck.com/v2/search/car/recents"
};

// -------------------------------
// HELPER FUNCTIONS
// -------------------------------

/**
 * Fetch listings from the API with automatic radius adjustment
 * @param {Object} params - API parameters
 * @param {number} minCount - Minimum number of listings to fetch
 * @param {number} baseRadius - Starting radius for search
 * @returns {Promise<Array>} - Array containing listings and the radius used
 */
async function fetchListings(params, minCount = 5, baseRadius = 50) {
  let radius = baseRadius;
  
  while (radius <= CONFIG.MAX_RADIUS) {
    params.radius = radius;
    
    try {
      const response = await fetch(CONFIG.API_URL + "?" + new URLSearchParams(params));
      const data = await response.json();
      const listings = data.listings || [];
      
      if (listings.length >= minCount) {
        return [listings, radius];
      }
      
      radius += CONFIG.RADIUS_INCREMENT;
    } catch (error) {
      console.error("Error fetching listings:", error);
      return [[], radius];
    }
  }
  
  // If we couldn't find enough listings, return what we found
  try {
    params.radius = radius - CONFIG.RADIUS_INCREMENT;
    const response = await fetch(CONFIG.API_URL + "?" + new URLSearchParams(params));
    const data = await response.json();
    return [data.listings || [], radius - CONFIG.RADIUS_INCREMENT];
  } catch (error) {
    console.error("Error in final fetch attempt:", error);
    return [[], radius - CONFIG.RADIUS_INCREMENT];
  }
}

/**
 * Clean and standardize listing data
 * @param {Array} listings - Raw listings from API
 * @returns {Array} - Cleaned listings
 */
function cleanCompData(listings) {
  return listings.map(car => ({
    year: car.year,
    make: car.make,
    model: car.model,
    trim: car.trim,
    price: car.price,
    miles: car.miles,
    vin: car.vin,
    exterior_color: car.exterior_color,
    drivetrain: car.drivetrain,
    transmission: car.transmission,
    title_status: car.title_status,
    dealer_name: car.dealer?.name,
    dealer_city: car.dealer?.city,
    dealer_state: car.dealer?.state,
    dealer_zip: car.dealer?.zip
  }));
}

/**
 * Calculate the average of an array of numbers
 * @param {Array} arr - Array of numbers
 * @returns {number} - Average rounded to 2 decimal places
 */
function calculateAverage(arr) {
  if (!arr || arr.length === 0) return 0;
  const sum = arr.reduce((total, num) => total + num, 0);
  return Math.round((sum / arr.length) * 100) / 100;
}

/**
 * Main function to calculate diminished value
 * @returns {Promise<Object>} - Result object with all data
 */
async function calculateDiminishedValue() {
  // -------------------------------
  // FETCH CLEAN COMPS
  // -------------------------------
  const paramsClean = {
    api_key: CONFIG.API_KEY,
    zip: CONFIG.subject_zip,
    year: CONFIG.subject_year,
    make: CONFIG.subject_make,
    model: CONFIG.subject_model,
    trim: CONFIG.subject_trim,
    miles_range: `${CONFIG.subject_mileage - 10000},${CONFIG.subject_mileage + 10000}`,
    history: "clean",
    rows: 10
  };

  const [cleanListingsRaw, radiusClean] = await fetchListings(
    paramsClean, 
    5, 
    CONFIG.BASE_CLEAN_RADIUS
  );

  // Sort by price descending
  const sortedCleanListings = cleanListingsRaw
    .filter(car => car.price)
    .sort((a, b) => b.price - a.price);

  const topCleanListingsRaw = sortedCleanListings.slice(0, 5);
  const topCleanPrices = topCleanListingsRaw.map(car => car.price);

  // Clean top clean comps
  const topCleanListings = cleanCompData(topCleanListingsRaw);

  // -------------------------------
  // FETCH DAMAGED COMPS
  // -------------------------------
  const paramsDamaged = {
    api_key: CONFIG.API_KEY,
    zip: CONFIG.subject_zip,
    year: CONFIG.subject_year,
    make: CONFIG.subject_make,
    model: CONFIG.subject_model,
    trim: CONFIG.subject_trim,
    miles_range: `${CONFIG.subject_mileage - 10000},${CONFIG.subject_mileage + 10000}`,
    title_status: "salvage,rebuild",
    rows: 10
  };

  const [damagedListingsRaw, radiusDamaged] = await fetchListings(
    paramsDamaged, 
    5, 
    CONFIG.BASE_DAMAGED_RADIUS
  );

  // Sort by price ascending
  const sortedDamagedListings = damagedListingsRaw
    .filter(car => car.price)
    .sort((a, b) => a.price - b.price);

  const bottomDamagedListingsRaw = sortedDamagedListings.slice(0, 5);
  const bottomDamagedPrices = bottomDamagedListingsRaw.map(car => car.price);

  // Clean bottom damaged comps
  const bottomDamagedListings = cleanCompData(bottomDamagedListingsRaw);

  // -------------------------------
  // CALCULATE AVERAGES
  // -------------------------------
  const avgCleanPrice = calculateAverage(topCleanPrices);
  const avgDamagedPrice = calculateAverage(bottomDamagedPrices);

  // -------------------------------
  // CALCULATE DIMINISHED VALUE
  // -------------------------------
  const diminishedValue = avgCleanPrice && avgDamagedPrice ? 
    Math.round((avgCleanPrice - avgDamagedPrice) * 100) / 100 : 0;

  // -------------------------------
  // BUILD FINAL RESULT
  // -------------------------------
  const result = {
    vehicle_info_input: {
      year: CONFIG.subject_year,
      make: CONFIG.subject_make,
      model: CONFIG.subject_model,
      trim: CONFIG.subject_trim,
      accident_mileage: CONFIG.subject_mileage,
      accident_zip: CONFIG.subject_zip
    },
    search_parameters: {
      clean_radius_used_miles: radiusClean,
      damaged_radius_used_miles: radiusDamaged,
      mileage_range_searched: `${CONFIG.subject_mileage - 10000}-${CONFIG.subject_mileage + 10000}`
    },
    valuation: {
      average_clean_price_top5: avgCleanPrice,
      average_damaged_price_bottom5: avgDamagedPrice,
      estimated_diminished_value: diminishedValue
    },
    comps_data: {
      top_clean_listings: topCleanListings,
      bottom_damaged_listings: bottomDamagedListings
    },
    comps_found_summary: {
      number_of_clean_listings: cleanListingsRaw.length,
      number_of_damaged_listings: damagedListingsRaw.length
    }
  };

  return result;
}

// Function to trigger the calculation and return JSON
async function getDiminishedValueReport() {
  try {
    const result = await calculateDiminishedValue();
    return result;
  } catch (error) {
    console.error("Error calculating diminished value:", error);
    return {
      error: true,
      message: "Failed to calculate diminished value",
      details: error.message
    };
  }
}

// Example usage:
// getDiminishedValueReport().then(result => console.log(JSON.stringify(result, null, 4)));

// Function for updating configuration
function updateConfig(newConfig) {
  Object.assign(CONFIG, newConfig);
  return CONFIG;
}

// Export functions if using as a module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateDiminishedValue,
    getDiminishedValueReport,
    updateConfig,
    CONFIG
  };
}