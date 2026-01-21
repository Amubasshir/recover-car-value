/**
 * Car Value Chart Component
 * 
 * Visualizes the car value calculation results similar to the Python matplotlib plots
 * Shows scatter plot with regression line and subject vehicle
 */

'use client';

import React from 'react';

interface CarListing {
  price: number;
  mileage: number;
  [key: string]: any;
}

interface RegressionResult {
  slope: number;
  intercept: number;
}

interface CarValueChartProps {
  title: string;
  comps: CarListing[];
  regression: RegressionResult;
  currentMileage: number;
  predictedValue: number;
  width?: number;
  height?: number;
}

export function CarValueChart({
  title,
  comps,
  regression,
  currentMileage,
  predictedValue,
  width = 600,
  height = 400,
}: CarValueChartProps) {
  if (comps.length === 0) {
    return (
      <div className="flex items-center justify-center border rounded-lg p-8" style={{ width, height }}>
        <p className="text-gray-500">No comparable data available</p>
      </div>
    );
  }

  const margin = 60;
  const chartWidth = width - 2 * margin;
  const chartHeight = height - 2 * margin;

  // Calculate data ranges
  const mileages = comps.map(c => c.mileage);
  const prices = comps.map(c => c.price);
  
  const minMileage = Math.min(...mileages, currentMileage) - 1000;
  const maxMileage = Math.max(...mileages, currentMileage) + 1000;
  const minPrice = Math.min(...prices, predictedValue) * 0.9;
  const maxPrice = Math.max(...prices, predictedValue) * 1.1;

  const mileageRange = maxMileage - minMileage || 1000;
  const priceRange = maxPrice - minPrice || 1000;

  // Scale functions
  const scaleX = (x: number) => margin + ((x - minMileage) / mileageRange) * chartWidth;
  const scaleY = (y: number) => height - margin - ((y - minPrice) / priceRange) * chartHeight;

  // Generate regression line points
  const linePoints: Array<{ x: number; y: number }> = [];
  for (let i = 0; i <= 50; i++) {
    const x = minMileage + (i / 50) * mileageRange;
    const y = regression.slope * x + regression.intercept;
    linePoints.push({ x: scaleX(x), y: scaleY(y) });
  }

  const linePath = linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid pattern */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Axes */}
        <line
          x1={margin}
          y1={height - margin}
          x2={width - margin}
          y2={height - margin}
          stroke="#000"
          strokeWidth="2"
        />
        <line
          x1={margin}
          y1={margin}
          x2={margin}
          y2={height - margin}
          stroke="#000"
          strokeWidth="2"
        />

        {/* Data points (comparable cars) */}
        {comps.map((comp, i) => (
          <circle
            key={i}
            cx={scaleX(comp.mileage)}
            cy={scaleY(comp.price)}
            r="4"
            fill="#3b82f6"
            stroke="#1e40af"
            strokeWidth="1"
          />
        ))}

        {/* Regression line */}
        <path
          d={linePath}
          fill="none"
          stroke="#dc2626"
          strokeWidth="3"
          opacity="0.9"
        />

        {/* Subject vehicle point */}
        <circle
          cx={scaleX(currentMileage)}
          cy={scaleY(predictedValue)}
          r="8"
          fill="#f97316"
          stroke="#ea580c"
          strokeWidth="3"
        />

        {/* Legend */}
        <rect
          x={width - 160}
          y={35}
          width="150"
          height="50"
          fill="white"
          stroke="#ccc"
          strokeWidth="1"
          opacity="0.9"
        />
        <line
          x1={width - 150}
          y1={47}
          x2={width - 120}
          y2={47}
          stroke="#dc2626"
          strokeWidth="3"
        />
        <text x={width - 115} y={52} fontSize="12" fill="#333" fontWeight="bold">
          Regression Line
        </text>
        <circle cx={width - 145} cy={67} r="6" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
        <text x={width - 135} y={72} fontSize="12" fill="#333" fontWeight="bold">
          Subject Vehicle
        </text>

        {/* Axis labels */}
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          fontSize="12"
          fill="#333"
        >
          Mileage
        </text>
        <text
          x="20"
          y={height / 2}
          textAnchor="middle"
          fontSize="12"
          fill="#333"
          transform={`rotate(-90, 20, ${height / 2})`}
        >
          Price ($)
        </text>

        {/* Value labels */}
        <text x={margin} y={height - margin + 20} fontSize="10" fill="#666">
          {Math.round(minMileage).toLocaleString()}
        </text>
        <text
          x={width - margin}
          y={height - margin + 20}
          textAnchor="end"
          fontSize="10"
          fill="#666"
        >
          {Math.round(maxMileage).toLocaleString()}
        </text>
        <text
          x={margin - 10}
          y={height - margin}
          textAnchor="end"
          fontSize="10"
          fill="#666"
        >
          ${Math.round(minPrice).toLocaleString()}
        </text>
        <text
          x={margin - 10}
          y={margin}
          textAnchor="end"
          fontSize="10"
          fill="#666"
        >
          ${Math.round(maxPrice).toLocaleString()}
        </text>
      </svg>
    </div>
  );
}
