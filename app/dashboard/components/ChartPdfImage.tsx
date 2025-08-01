
"use client";

// import React, { useRef, useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import regression from "regression";
import { PDFDownloadLink } from "@react-pdf/renderer";

// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   ScatterController,
// } from "chart.js";
import { PDFDocument } from "./PDFDocument";
import { Download } from "lucide-react";

// // Register Chart.js modules
// ChartJS.register(
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   ScatterController,
// );

// const ChartPdfImage = ({ item }) => {
//   const chartRef1 = useRef(null);
//   const chartRef2 = useRef(null);

//   const [chartImage1, setChartImage1] = useState(null);
//   const [chartImage2, setChartImage2] = useState(null);

//   // First dataset
//   const dataSet1 = item?.top_clean_listings || [];

//   // Second dataset
//   const dataSet2 = item?.bottom_damaged_listings || [];

//   // Create chart data from dataset
//   const createChartData = (dataset) => {
//     const X = dataset.map((d) => d.miles);
//     const Y = dataset.map((d) => d.price);
//     const regressionResult = regression.linear(dataset.map((d) => [d.miles, d.price]));
//     const [a, b] = regressionResult.equation;
//     const minX = Math.min(...X);
//     const maxX = Math.max(...X);
//     const lineX = [minX, maxX];
//     const lineY = lineX.map((x) => a * x + b);

//     return {
//       data: {
//         labels: X,
//         datasets: [
//           {
//             label: "Price vs Mileage",
//             data: Y,
//             borderColor: "blue",
//             backgroundColor: "blue",
//             type: "scatter",
//             showLine: false,
//           },
//           {
//             label: "Regression Line",
//             data: lineX.map((x, i) => ({ x, y: lineY[i] })),
//             borderColor: "red",
//             backgroundColor: "transparent",
//             type: "line",
//             fill: false,
//           },
//         ],
//       },
//       options: {
//         responsive: false,
//         maintainAspectRatio: false,
//         scales: {
//           x: {
//             type: "linear",
//             title: { display: true, text: "Mileage" },
//           },
//           y: {
//             title: { display: true, text: "Price ($)" },
//           },
//         },
//         plugins: {
//           legend: { display: true },
//           tooltip: { enabled: true },
//         },
//         animation: false,
//       },
//     };
//   };

//   const chart1 = createChartData(dataSet1);
//   const chart2 = createChartData(dataSet2);

//   // Capture canvas as image after render
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (chartRef1.current?.canvas) {
//         setChartImage1(chartRef1.current.canvas.toDataURL("image/png"));
//       }
//       if (chartRef2.current?.canvas) {
//         setChartImage2(chartRef2.current.canvas.toDataURL("image/png"));
//       }
//     }, 500); // wait for chart rendering

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <>
//       {/* Hidden charts offscreen with fixed size */}
//       <div style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}>
//         <div style={{ width: "800px", height: "400px" }}>
//           <Line
//             ref={chartRef1}
//             data={chart1.data}
//             options={chart1.options}
//             width={800}
//             height={400}
//           />
//         </div>
//         <div style={{ width: "800px", height: "400px" }}>
//           <Line
//             ref={chartRef2}
//             data={chart2.data}
//             options={chart2.options}
//             width={800}
//             height={400}
//           />
//         </div>
//       </div>

//       {/* PDF download link */}
//       <PDFDownloadLink
//         document={
//           <PDFDocument
//             report={item}
//             topListChartImage={chartImage1}
//             bottomListChartImage={chartImage2}
//           />
//         }
//         fileName="diminished-value-report.pdf"
//         className="inline-flex items-center gap-2 px-4 py-2 rounded-md duration-200 border-2 font-semibold"
//       >
//         {({ loading }) => (
//           <>
//             <Download size={18} />
//             <span>{loading ? "Preparing..." : "Download PDF"}</span>
//           </>
//         )}
//       </PDFDownloadLink>
//     </>
//   );
// };

// export default ChartPdfImage;

















//! v2


// import FairMarketValueChart from '@/components/FairMarketValueChart';

// const Index = () => {
//   // Sample data matching your specification
//   const topCleanListings = [
//     { price: 40332, miles: 10 },
//     { price: 39995, miles: 177 },
//     { price: 36340, miles: 3120 },
//     { price: 36000, miles: 2550 },
//     { price: 35595, miles: 5096 }
//   ];

//   const bottomDamagedListings = [
//     { price: 39568, miles: 4120 },
//     { price: 36340, miles: 3880 },
//     { price: 35393, miles: 3360 },
//     { price: 33750, miles: 2780 },
//     { price: 31994, miles: 1920 }
//   ];

//   // Static regression line as specified
//   const staticRegression: [number, number] = [40332, 35595];

//   return (
//     <div className="min-h-screen bg-background p-8">
//       <div className="max-w-6xl mx-auto">
//         <FairMarketValueChart
//           topCleanListings={topCleanListings}
//           bottomDamagedListings={bottomDamagedListings}
//           staticRegression={staticRegression}
//           subjectMileage={26000}
//         />
//       </div>
//     </div>
//   );
// };

// export default Index;


// import React, { useRef, useEffect, useState } from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ScatterController,
// } from 'chart.js';
// import { Chart } from 'react-chartjs-2';
// import { Card } from '@/components/ui/card';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ScatterController
// );

// interface DataPoint {
//   price: number;
//   miles: number;
// }

// interface FairMarketValueChartProps {
//   topCleanListings: DataPoint[];
//   bottomDamagedListings: DataPoint[];
//   staticRegression?: [number, number];
//   subjectMileage?: number;
// }

// const FairMarketValueChart: React.FC<FairMarketValueChartProps> = ({
//   topCleanListings,
//   bottomDamagedListings,
//   staticRegression = [40332, 35595],
//   subjectMileage = 26000,
// }) => {
//   const chartRef = useRef<ChartJS>(null);

//   // Combine all data points for determining axis ranges
//   const allDataPoints = [...topCleanListings, ...bottomDamagedListings];
//   const allMileages = allDataPoints.map(d => d.miles);
//   const allPrices = allDataPoints.map(d => d.price);
  
//   const minMileage = Math.min(...allMileages) - 1000;
//   const maxMileage = Math.max(...allMileages) + 1000;
//   const minPrice = Math.min(...allPrices) - 1000;
//   const maxPrice = Math.max(...allPrices) + 1000;

//   // Create regression line data points
//   const regressionData = [
//     { x: minMileage, y: staticRegression[0] },
//     { x: maxMileage, y: staticRegression[1] }
//   ];

//   // Subject vehicle line data
//   const subjectLineData = [
//     { x: subjectMileage, y: minPrice },
//     { x: subjectMileage, y: maxPrice }
//   ];

//   const data = {
//     datasets: [
//       {
//         label: 'Market Listings',
//         data: allDataPoints.map(d => ({ x: d.miles, y: d.price })),
//         backgroundColor: 'hsl(var(--chart-point))',
//         borderColor: 'hsl(var(--chart-point))',
//         pointRadius: 6,
//         pointHoverRadius: 8,
//         pointStyle: 'crossRot',
//         pointBorderWidth: 2,
//         showLine: false,
//         type: 'scatter' as const,
//       },
//       {
//         label: 'Linear Regression Response',
//         data: regressionData,
//         borderColor: 'hsl(var(--chart-regression))',
//         backgroundColor: 'transparent',
//         borderWidth: 2,
//         pointRadius: 0,
//         tension: 0,
//         type: 'line' as const,
//       },
//       {
//         label: 'Subject Vehicle Mileage',
//         data: subjectLineData,
//         borderColor: 'hsl(var(--chart-subject-line))',
//         backgroundColor: 'transparent',
//         borderWidth: 2,
//         borderDash: [10, 5],
//         pointRadius: 0,
//         type: 'line' as const,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: {
//       intersect: false,
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: 'Fair Market Value Estimation using Mileage vs. Price',
//         font: {
//           size: 16,
//           weight: 'normal' as const,
//         },
//         color: 'hsl(var(--chart-axis))',
//         padding: {
//           top: 10,
//           bottom: 20,
//         },
//       },
//       legend: {
//         display: true,
//         position: 'right' as const,
//         align: 'start' as const,
//         labels: {
//           usePointStyle: true,
//           pointStyle: 'line',
//           font: {
//             size: 12,
//           },
//           color: 'hsl(var(--chart-axis))',
//           padding: 15,
//           generateLabels: (chart) => {
//             const datasets = chart.data.datasets;
//             return datasets.map((dataset, i) => ({
//               text: dataset.label,
//               fillStyle: dataset.backgroundColor,
//               strokeStyle: dataset.borderColor,
//               lineWidth: dataset.borderWidth || 1,
//               lineDash: dataset.borderDash || [],
//               pointStyle: i === 0 ? 'crossRot' : 'line',
//               datasetIndex: i,
//             }));
//           },
//         },
//       },
//       tooltip: {
//         filter: (tooltipItem) => tooltipItem.datasetIndex === 0,
//         callbacks: {
//           label: (context) => {
//             return `Price: $${context.parsed.y.toLocaleString()}, Mileage: ${context.parsed.x.toLocaleString()}`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         type: 'linear' as const,
//         position: 'bottom' as const,
//         title: {
//           display: true,
//           text: 'Mileage',
//           font: {
//             size: 14,
//           },
//           color: 'hsl(var(--chart-axis))',
//         },
//         min: minMileage,
//         max: maxMileage,
//         ticks: {
//           color: 'hsl(var(--chart-axis))',
//           font: {
//             size: 11,
//           },
//         },
//         grid: {
//           color: 'hsl(var(--chart-grid))',
//           lineWidth: 1,
//         },
//       },
//       y: {
//         type: 'linear' as const,
//         title: {
//           display: true,
//           text: 'Price ($)',
//           font: {
//             size: 14,
//           },
//           color: 'hsl(var(--chart-axis))',
//         },
//         min: minPrice,
//         max: maxPrice,
//         ticks: {
//           color: 'hsl(var(--chart-axis))',
//           font: {
//             size: 11,
//           },
//           callback: function(value) {
//             return typeof value === 'number' ? value.toLocaleString() : value;
//           },
//         },
//         grid: {
//           color: 'hsl(var(--chart-grid))',
//           lineWidth: 1,
//         },
//       },
//     },
//     elements: {
//       point: {
//         hoverBorderWidth: 3,
//       },
//     },
//   };

//   return (
//     <Card className="p-6 w-full">
//       <div className="w-full h-[500px]">
//         <Chart
//           ref={chartRef}
//           type="scatter"
//           data={data}
//           options={options}
//         />
//       </div>
//     </Card>
//   );
// };

// export default FairMarketValueChart;




// ! v3

    

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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Card } from '@/components/ui/card';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterController
);



// import FairMarketValueChart from '@/components/FairMarketValueChart';
// import { useState } from 'react'
// 

function filterAndSortByPriceAndMiles(data) {
  return data
    .map(item => ({
      price: item.price,
      miles: typeof item.miles === 'number' ? item.miles : Math.floor(Math.random() * 5000 + 1000)
    }))
    .sort((a, b) => b.price - a.price);
}

function getFirstAndLastPrice(listings) {
  if (!Array.isArray(listings) || listings.length === 0) {
    return [0, 0];
  }
  return [listings[0].price || 0, listings[listings.length - 1].price || 0]
//   return {
//     firstPrice: listings[0].price,
//     lastPrice: listings[listings.length - 1].price
//   };
};

const Index = ({item}) => {

    const topCleanListings = filterAndSortByPriceAndMiles(item?.top_clean_listings || []);
    const bottomDamagedListings = filterAndSortByPriceAndMiles(item?.bottom_damaged_listings || []);

const priceRange = getFirstAndLastPrice(topCleanListings);

  // Sample data matching your specification
//   const topCleanListings = [
//     { price: 40332, miles: 10 },
//     { price: 39995, miles: 177 },
//     { price: 36340, miles: 3120 },
//     { price: 36000, miles: 2550 },
//     { price: 35595, miles: 5096 }
//   ];

//   const bottomDamagedListings = [
//     { price: 39568, miles: 4120 },
//     { price: 36340, miles: 3880 },
//     { price: 35393, miles: 3360 },
//     { price: 33750, miles: 2780 },
//     { price: 31994, miles: 1920 }
//   ];

  // Static regression line as specified
//   const staticRegression: [number, number] = [40332, 35595];
  const staticRegression = priceRange;
  console.log({staticRegression})

  const [topChartImage, setTopChartImage] = useState<string | null>(null);
  const [bottomChartImage, setBottomChartImage] = useState<string | null>(null);

  return (
    <div className="">
      <div className="max-w-6xl mx-auto space-y-8" style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}>
        <div style={{ width: "800px", height: "400px" }}>
        <FairMarketValueChart
          data={topCleanListings}
          title="Pre-Accident - Mileage vs. Price"
          staticRegression={staticRegression}
          subjectMileage={26000}
          onImageReady={setTopChartImage}
          />
          </div>
        
        <div style={{ width: "800px", height: "400px" }}>
        <FairMarketValueChart
          data={bottomDamagedListings}
          title="Bottom Damaged Listings - Mileage vs. Price"
          staticRegression={staticRegression}
          subjectMileage={26000}
          onImageReady={setBottomChartImage}
          />
          </div>
            
        {/* Display generated images for testing */}
        {topChartImage && (
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
        )}
      </div>

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


// Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ScatterController
// );

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
  const allMileages = data.map(d => d.miles);
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
        data: data.map(d => ({ x: d.miles, y: d.price })),
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


// interface DataPoint {
//   price: number;
//   miles: number;
// }

// interface FairMarketValueChartProps {
//   data: DataPoint[];
//   title: string;
//   staticRegression?: [number, number];
//   subjectMileage?: number;
//   onImageReady?: (image: string) => void;
// }

// const FairMarketValueChart: React.FC<FairMarketValueChartProps> = ({
//   data,
//   title,
//   staticRegression = [40332, 35595],
//   subjectMileage = 26000,
//   onImageReady,
// }) => {
//   const chartRef = useRef<ChartJS>(null);

//   // Determine axis ranges from data
//   const allMileages = data.map(d => d.miles);
//   const allPrices = data.map(d => d.price);
  
//   const minMileage = Math.min(...allMileages) - 1000;
//   const maxMileage = Math.max(...allMileages) + 1000;
//   const minPrice = Math.min(...allPrices) - 1000;
//   const maxPrice = Math.max(...allPrices) + 1000;

//   // Create regression line data points
//   const regressionData = [
//     { x: minMileage, y: staticRegression[0] },
//     { x: maxMileage, y: staticRegression[1] }
//   ];

//   // Subject vehicle line data
//   const subjectLineData = [
//     { x: subjectMileage, y: minPrice },
//     { x: subjectMileage, y: maxPrice }
//   ];

//   // Capture canvas as image after render
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (chartRef.current?.canvas && onImageReady) {
//         const imageData = chartRef.current.canvas.toDataURL("image/png");
//         onImageReady(imageData);
//       }
//     }, 500);

//     return () => clearTimeout(timeout);
//   }, [onImageReady]);

//   const chartData = {
//     datasets: [
//       {
//         label: 'Market Listings',
//         data: data.map(d => ({ x: d.miles, y: d.price })),
//         backgroundColor: 'hsl(var(--chart-point))',
//         borderColor: 'hsl(var(--chart-point))',
//         pointRadius: 6,
//         pointHoverRadius: 8,
//         pointStyle: 'crossRot',
//         pointBorderWidth: 2,
//         showLine: false,
//         type: 'scatter' as const,
//       },
//       {
//         label: 'Linear Regression Response',
//         data: regressionData,
//         borderColor: 'hsl(var(--chart-regression))',
//         backgroundColor: 'transparent',
//         borderWidth: 2,
//         pointRadius: 0,
//         tension: 0,
//         type: 'line' as const,
//       },
//       {
//         label: 'Subject Vehicle Mileage',
//         data: subjectLineData,
//         borderColor: 'hsl(var(--chart-subject-line))',
//         backgroundColor: 'transparent',
//         borderWidth: 2,
//         borderDash: [10, 5],
//         pointRadius: 0,
//         type: 'line' as const,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 0,
//     },
//     interaction: {
//       intersect: false,
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: title,
//         font: {
//           size: 16,
//           weight: 'normal' as const,
//         },
//         color: 'hsl(var(--chart-axis))',
//         padding: {
//           top: 10,
//           bottom: 20,
//         },
//       },
//       legend: {
//         display: true,
//         position: 'right' as const,
//         align: 'start' as const,
//         labels: {
//           usePointStyle: true,
//           pointStyle: 'line',
//           font: {
//             size: 12,
//           },
//           color: 'hsl(var(--chart-axis))',
//           padding: 15,
//           generateLabels: (chart) => {
//             const datasets = chart.data.datasets;
//             return datasets.map((dataset, i) => ({
//               text: dataset.label,
//               fillStyle: dataset.backgroundColor,
//               strokeStyle: dataset.borderColor,
//               lineWidth: dataset.borderWidth || 1,
//               lineDash: dataset.borderDash || [],
//               pointStyle: i === 0 ? 'crossRot' : 'line',
//               datasetIndex: i,
//             }));
//           },
//         },
//       },
//       tooltip: {
//         filter: (tooltipItem) => tooltipItem.datasetIndex === 0,
//         callbacks: {
//           label: (context) => {
//             return `Price: $${context.parsed.y.toLocaleString()}, Mileage: ${context.parsed.x.toLocaleString()}`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         type: 'linear' as const,
//         position: 'bottom' as const,
//         title: {
//           display: true,
//           text: 'Mileage',
//           font: {
//             size: 14,
//           },
//           color: 'hsl(var(--chart-axis))',
//         },
//         min: minMileage,
//         max: maxMileage,
//         ticks: {
//           color: 'hsl(var(--chart-axis))',
//           font: {
//             size: 11,
//           },
//         },
//         grid: {
//           color: 'hsl(var(--chart-grid))',
//           lineWidth: 1,
//         },
//       },
//       y: {
//         type: 'linear' as const,
//         title: {
//           display: true,
//           text: 'Price ($)',
//           font: {
//             size: 14,
//           },
//           color: 'hsl(var(--chart-axis))',
//         },
//         min: minPrice,
//         max: maxPrice,
//         ticks: {
//           color: 'hsl(var(--chart-axis))',
//           font: {
//             size: 11,
//           },
//           callback: function(value) {
//             return typeof value === 'number' ? value.toLocaleString() : value;
//           },
//         },
//         grid: {
//           color: 'hsl(var(--chart-grid))',
//           lineWidth: 1,
//         },
//       },
//     },
//     elements: {
//       point: {
//         hoverBorderWidth: 3,
//       },
//     },
//   };

//   return (
//     <Card className="p-6 w-full">
//       <div className="w-full h-[500px]">
//         <Chart
//           ref={chartRef}
//           type="scatter"
//           data={chartData}
//           options={options}
//           width={800}
//           height={400}
//         />
//       </div>
//     </Card>
//   );
// };

// export default FairMarketValueChart;