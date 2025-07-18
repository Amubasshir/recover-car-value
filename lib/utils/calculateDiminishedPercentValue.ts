export interface DiminishedPercentResult {
    isFallbackUsed: boolean;
    diminishedValue: number;
    diminishedPercentage: string;
}

export function calculateDiminishedPercentValue(
    preAccidentValue: number,
    postAccidentValue: number
): DiminishedPercentResult {
    const diminishedValue = preAccidentValue - postAccidentValue;
    const diminishedPercentage = diminishedValue / preAccidentValue;

    // Check if the diminished percentage is between 15% and 25%
    if (diminishedPercentage >= 0.15 && diminishedPercentage <= 0.25) {
        return {
            isFallbackUsed: false,
            diminishedValue: diminishedValue,
            diminishedPercentage: (diminishedPercentage * 100).toFixed(2) + '%'
        };
    }

    // Fallback: use 15% of pre-accident value
    const fallbackValue = preAccidentValue * 0.15;

    return {
        isFallbackUsed: true,
        diminishedValue: fallbackValue,
        diminishedPercentage: '15.00%'
    };
}
