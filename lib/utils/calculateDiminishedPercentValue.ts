export interface DiminishedPercentResult {
    isFallbackUsed: boolean;
    diminishedValue: number;
    diminishedPercentage: string;
}

// export function calculateDiminishedPercentValue(
//     preAccidentValue: number,
//     postAccidentValue: number
// ): DiminishedPercentResult {
//     const diminishedValue = preAccidentValue - postAccidentValue;
//     const diminishedPercentage = diminishedValue / preAccidentValue;

//     // Check if the diminished percentage is between 15% and 25%
//     if (diminishedPercentage >= 0.15 && diminishedPercentage <= 0.25) {
//         return {
//             isFallbackUsed: false,
//             diminishedValue: diminishedValue,
//             diminishedPercentage: (diminishedPercentage * 100).toFixed(2) + '%'
//         };
//     }

//     // Fallback: use 15% of pre-accident value
//     const fallbackValue = preAccidentValue * 0.15;

//     return {
//         isFallbackUsed: true,
//         diminishedValue: fallbackValue,
//         diminishedPercentage: '15.00%'
//     };
// }


interface Listing {
  price: number;
  is_accidental: number;
}


export function calculateDiminishedPercentValue(
  preAccidentListings,
  postAccidentListings
): DiminishedPercentResult {
  // Filter: pre-accident listings should be non-accidental (is_accidental = 0)
  const preFiltered = preAccidentListings.filter((l) => l.is_accidental === 0);

  // Filter: post-accident listings should be accidental (is_accidental = 1)
  const postFiltered = postAccidentListings.filter((l) => l.is_accidental === 1);

  if (preFiltered.length === 0 || postFiltered.length === 0) {
    throw new Error("Not enough listings for calculation.");
  }

  // Compute average prices
  const avg = (arr: Listing[]) => arr.reduce((sum, l) => sum + l.price, 0) / arr.length;
  const preAccidentValue = avg(preFiltered);
  const postAccidentValue = avg(postFiltered);

  // Calculate diminished value and percentage
  const diminishedValue = preAccidentValue - postAccidentValue;
  const diminishedPercentage = diminishedValue / preAccidentValue;

  if (diminishedPercentage >= 0.15 && diminishedPercentage <= 0.25) {
    return {
      isFallbackUsed: false,
      diminishedValue,
      diminishedPercentage: (diminishedPercentage * 100).toFixed(2) + "%"
    };
  }

  // Fallback: 15% of pre-accident value
  const fallbackValue = preAccidentValue * 0.15;
  return {
    isFallbackUsed: true,
    // diminishedValue: fallbackValue,
    diminishedValue: Math.floor(fallbackValue) + 0.00,
    diminishedPercentage: "15.00%"
  };
}
