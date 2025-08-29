
"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";

import { PDFDocument } from "./PDFDocument";
import { Download } from "lucide-react";

import React, { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
  LineController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Card } from '@/components/ui/card';
import PreAccidentMarketChart from "@/app/chart/page";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
  LineController,
);



function filterAndSortByPriceAndMiles(data) {
  return data
    .map(item => ({
      price: item.price,
      miles: typeof item.mileage === 'number' ? item.mileage : typeof item.mileage === 'string' ? Number(item?.accident_mileage) : Math.floor(Math.random() * 5000 + 1000)
    }))
    .sort((a, b) => b.price - a.price);
}

function getFirstAndLastPrice(listings) {
  if (!Array.isArray(listings) || listings.length === 0) {
    return [0, 0];
  }
  return [listings[0].price || 0, listings[listings.length - 1].price || 0]
};

const Index = ({item}) => {
    console.log({pre: item?.top_clean_listings, post: item?.bottom_damaged_listings})
    const topCleanListings = filterAndSortByPriceAndMiles(item?.top_clean_listings || []);
    const bottomDamagedListings = filterAndSortByPriceAndMiles(item?.bottom_damaged_listings || []);
    
    const sortedTop = topCleanListings?.sort((a, b) => b.mileage - a.mileage);
    const sortedBottom = bottomDamagedListings?.sort((a, b) => b.mileage - a.mileage);

// Find middle index
const middleIndex = Math.floor(sortedTop?.length / 2);
const middleIndexBottom = Math.floor(sortedBottom?.length / 2);

// Get only the middle miles
const middleMilesTop = sortedTop[middleIndex]?.mileage;

console.log({middleMilesTop})
const middleMilesBottom = sortedBottom[middleIndexBottom]?.mileage;

const priceRange = getFirstAndLastPrice(topCleanListings);

  // Static regression line as specified
  const staticRegression = priceRange;
//   console.log({staticRegression})

  const [topChartImage, setTopChartImage] = useState<string | null>(null);
  const [bottomChartImage, setBottomChartImage] = useState<string | null>(null);


  return (
    <div className="">
      {/* <div className="max-w-6xl mx-auto space-y-8" style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}> */}
      <div className="max-w-6xl mx-auto space-y-8" style={{ }}>
        <div style={{ width: "1000px", height: "600px" }}>
            <PreAccidentMarketChart
          data={topCleanListings}
          title="Pre-Accident Market Listings"
        //   staticRegression={staticRegression}
          subjectMileage={middleMilesTop}
          onImageReady={setTopChartImage}
          />
          </div>
        
        <div style={{ width: "1000px", height: "600px" }}>
        {/* <FairMarketValueChart
          data={bottomDamagedListings}
          title="Bottom Damaged Listings - Mileage vs. Price"
          staticRegression={staticRegression}
          subjectMileage={26000}
          onImageReady={setBottomChartImage}
          /> */}
        <PreAccidentMarketChart
          data={bottomDamagedListings}
          title="Post-Accident Market Listings"
          subjectMileage={middleMilesBottom}
          onImageReady={setBottomChartImage}
          />
          </div>
            
        {/* Display generated images for testing */}
        {/* {topChartImage && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Top Chart Image Generated:</h3>
            <img src={topChartImage} alt="Top Chart" className="border rounded" />
          </div>
        )}
        
        {bottomChartImage && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Bottom Chart Image Generated:</h3>
            <img src={bottomChartImage} alt="Bottom Chart" className="border rounded" />
          </div>
        )} */}
      </div>

      {/* <img src={topChartImage || null} alt="" /> */}

        {/* PDF download link */}
      <PDFDownloadLink
        document={
          <PDFDocument
            report={item}
            topListChartImage={topChartImage}
            bottomListChartImage={bottomChartImage}
          />
        }
        fileName="diminished-value-report.pdf"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md duration-200 border-2 font-semibold"
      >
        {({ loading }) => (
          <>
            <Download size={18} />
            <span>{loading ? "Preparing..." : "Download PDF"}</span>
          </>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default Index;


interface DataPoint {
  price: number;
  miles: number;
}

interface FairMarketValueChartProps {
  data: DataPoint[];
  title: string;
  staticRegression?: [number, number];
  subjectMileage?: number;
  onImageReady?: (image: string) => void;
}

const FairMarketValueChart: React.FC<FairMarketValueChartProps> = ({
  data,
  title,
  staticRegression = [40332, 35595],
  subjectMileage = 26000,
  onImageReady,
}) => {
  const chartRef = useRef<ChartJS>(null);

  // Determine axis ranges from data
  const allMileages = data.map(d => d.mileage);
  const allPrices = data.map(d => d.price);
  
  const minMileage = Math.min(...allMileages) - 1000;
  const maxMileage = Math.max(...allMileages) + 1000;
  const minPrice = Math.min(...allPrices) - 1000;
  const maxPrice = Math.max(...allPrices) + 1000;

  // Create regression line data points
  const regressionData = [
    { x: minMileage, y: staticRegression[0] },
    { x: maxMileage, y: staticRegression[1] }
  ];

  // Subject vehicle line data
  const subjectLineData = [
    { x: subjectMileage, y: minPrice },
    { x: subjectMileage, y: maxPrice }
  ];

  // Capture canvas as image after render
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (chartRef.current?.canvas && onImageReady) {
        const imageData = chartRef.current.canvas.toDataURL("image/png");
        onImageReady(imageData);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [onImageReady]);

  const chartData = {
    datasets: [
      {
        label: 'Market Listings',
        data: data.map(d => ({ x: d.mileage, y: d.price })),
        backgroundColor: 'hsl(var(--chart-point))',
        borderColor: 'hsl(var(--chart-point))',
        pointRadius: 6,
        pointHoverRadius: 8,
        pointStyle: 'crossRot',
        pointBorderWidth: 2,
        showLine: false,
        type: 'scatter' as const,
      },
      {
        label: 'Linear Regression Response',
        data: regressionData,
        borderColor: 'hsl(var(--chart-regression))',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0,
        type: 'line' as const,
      },
      {
        label: 'Subject Vehicle Mileage',
        data: subjectLineData,
        borderColor: 'hsl(var(--chart-subject-line))',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [10, 5],
        pointRadius: 0,
        type: 'line' as const,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    interaction: {
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'normal' as const,
        },
        color: 'hsl(var(--chart-axis))',
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        display: true,
        position: 'right' as const,
        align: 'start' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'line',
          font: {
            size: 12,
          },
          color: 'hsl(var(--chart-axis))',
          padding: 15,
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
              strokeStyle: dataset.borderColor,
              lineWidth: dataset.borderWidth || 1,
              lineDash: dataset.borderDash || [],
              pointStyle: i === 0 ? 'crossRot' : 'line',
              datasetIndex: i,
            }));
          },
        },
      },
      tooltip: {
        filter: (tooltipItem) => tooltipItem.datasetIndex === 0,
        callbacks: {
          label: (context) => {
            return `Price: $${context.parsed.y.toLocaleString()}, Mileage: ${context.parsed.x.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: 'Mileage',
          font: {
            size: 14,
          },
          color: 'hsl(var(--chart-axis))',
        },
        min: minMileage,
        max: maxMileage,
        ticks: {
          color: 'hsl(var(--chart-axis))',
          font: {
            size: 11,
          },
          stepSize: 1000,
        },
        grid: {
          color: 'hsl(var(--chart-grid) / 0.3)',
          lineWidth: 1,
        },
      },
      y: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'Price ($)',
          font: {
            size: 14,
          },
          color: 'hsl(var(--chart-axis))',
        },
        min: minPrice,
        max: maxPrice,
        ticks: {
          color: 'hsl(var(--chart-axis))',
          font: {
            size: 11,
          },
          stepSize: 1000,
          callback: function(value) {
            return typeof value === 'number' ? value.toLocaleString() : value;
          },
        },
        grid: {
          color: 'hsl(var(--chart-grid) / 0.3)',
          lineWidth: 1,
        },
      },
    },
    elements: {
      point: {
        hoverBorderWidth: 3,
      },
    },
  };

  return (
    <Card className="p-6 w-full">
      <div className="w-full h-[500px]">
        <Chart
          ref={chartRef}
          type="scatter"
          data={chartData}
          options={options}
          width={800}
          height={400}
        />
      </div>
    </Card>
  );
};

