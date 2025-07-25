// // "use client";

// // import React, { useRef, useEffect, useState } from "react";
// // import { Line } from "react-chartjs-2";
// // import regression from "regression";
// // import {
// //   Document,
// //   Page,
// //   View,
// //   StyleSheet,
// //   PDFDownloadLink,
// //   Image as PdfImage,
// // } from "@react-pdf/renderer";

// // // Chart.js registration
// // import {
// //   Chart as ChartJS,
// //   LineElement,
// //   PointElement,
// //   LinearScale,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// // } from "chart.js";
// // import { TableBody, TableCell, TableRow } from "@/components/ui/table";
// // import { PDFDocument } from "./PDFDocument";
// // import { Download } from "lucide-react";

// // ChartJS.register(
// //   LineElement,
// //   PointElement,
// //   LinearScale,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   CategoryScale
// // );

// // const ChartPdfImage = ({ item }) => {
// //   const chartRef = useRef(null);
// //   const chartRef2 = useRef(null);
// //   const [chartImage, setChartImage] = useState(null);
// //   const [chartImage2, setChartImage2] = useState(null);

// //   // Data
// //   const dataSet = [
// //     { miles: 4264, price: 94995 },
// //     { miles: 5935, price: 92499 },
// //     { miles: 7074, price: 89439 },
// //     { miles: 2605, price: 87980 },
// //     { miles: 6863, price: 86600 },
// //   ];

// //   const X = dataSet.map((d) => d.miles);
// //   const Y = dataSet.map((d) => d.price);

// //   // Run linear regression
// //   const regressionResult = regression.linear(
// //     dataSet.map((d) => [d.miles, d.price])
// //   );
// //   const [a, b] = regressionResult.equation; // Y = aX + b

// //   // Generate regression line data
// //   const minX = Math.min(...X);
// //   const maxX = Math.max(...X);
// //   const lineX = [minX, maxX];
// //   const lineY = lineX.map((x) => a * x + b);

// //   const chartData = {
// //     labels: X,
// //     datasets: [
// //       {
// //         label: "Price vs Mileage",
// //         data: Y,
// //         borderColor: "blue",
// //         backgroundColor: "blue",
// //         type: "scatter",
// //         showLine: false,
// //       },
// //       {
// //         label: "Regression Line",
// //         data: lineX.map((x, i) => ({ x, y: lineY[i] })),
// //         borderColor: "red",
// //         backgroundColor: "transparent",
// //         type: "line",
// //         fill: false,
// //       },
// //     ],
// //   };

// //   const options2 = { 
// //     scales: {
// //       x: {
// //         type: "linear",
// //         title: { display: true, text: "Mileage" },
// //       },
// //       y: {
// //         title: { display: true, text: "Price ($)" },
// //       },
// //     },
// //     plugins: {
// //       legend: { display: true },
// //       tooltip: { enabled: true },
// //     },
// //   };

// //   // Convert chart to image after rendering
// //   useEffect(() => {
// //     if (chartRef.current) {
// //       const chartInstance = chartRef.current;
// //       const chartCanvas = chartInstance.canvas;
// //       setChartImage(chartCanvas.toDataURL("image/png"));
// //     }
// //   }, []);

// //   return (
// //     <>
// //       <div className="">
// //         <Line ref={chartRef} data={chartData} options={options} />
// //         <Line ref={chartRef2} data={chartData2} options={options2} />
// //       </div>
// //       <PDFDownloadLink
// //         // document={<PDFDocument report={sampleReport} />}
// //         document={
// //           <PDFDocument
// //             report={item}
// //             topListChartImage={chartImage}
// //             bottomListChartImage={chartImage2}
// //           />
// //         }
// //         fileName="diminished-value-report.pdf"
// //         className="inline-flex items-center gap-2 px-4 py-2 rounded-md duration-200 border-2 font-semibold"
// //       >
// //         {({ loading }) => (
// //           <>
// //             <Download size={18} />
// //             <span>{loading ? "Preparing..." : "Download PDF"}</span>
// //           </>
// //         )}
// //       </PDFDownloadLink>
// //     </>
// //   );
// // };

// // export default ChartPdfImage;




// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import regression from "regression";
// import { PDFDownloadLink } from "@react-pdf/renderer";

// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
// } from "chart.js";
// import { PDFDocument } from "./PDFDocument";
// import { Download } from "lucide-react";

// // Register Chart.js components
// ChartJS.register(
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale
// );

// const ChartPdfImage = ({ item }) => {
//   const chartRef1 = useRef(null);
//   const chartRef2 = useRef(null);

//   const [chartImage1, setChartImage1] = useState(null);
//   const [chartImage2, setChartImage2] = useState(null);

//   // First chart dataset
//   const dataSet1 = [
//     { miles: 4264, price: 94995 },
//     { miles: 5935, price: 92499 },
//     { miles: 7074, price: 89439 },
//     { miles: 2605, price: 87980 },
//     { miles: 6863, price: 86600 },
//   ];

//   const dataSet2 = [
//     { miles: 1500, price: 105000 },
//     { miles: 3000, price: 102000 },
//     { miles: 5000, price: 97000 },
//     { miles: 7000, price: 94000 },
//     { miles: 9000, price: 91000 },
//   ];

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

//   // Capture both charts to image
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (chartRef1.current) {
//         const canvas1 = chartRef1.current.canvas;
//         setChartImage1(canvas1.toDataURL("image/png"));
//       }
//       if (chartRef2.current) {
//         const canvas2 = chartRef2.current.canvas;
//         setChartImage2(canvas2.toDataURL("image/png"));
//       }
//     }, 500); // slight delay for rendering

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <>
//       {/* Hidden charts for image generation */}
//       <div style={{ position: "absolute", top: "-9999px", left: "-9999px", height: "400px", width: "600px", visibility: "hidden" }}>
//         <Line ref={chartRef1} data={chart1.data} options={chart1.options} />
//         <Line ref={chartRef2} data={chart2.data} options={chart2.options} />
//       </div>

//       {/* PDF download button */}
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
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import regression from "regression";
import { PDFDownloadLink } from "@react-pdf/renderer";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { PDFDocument } from "./PDFDocument";
import { Download } from "lucide-react";

// Register Chart.js modules
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const ChartPdfImage = ({ item }) => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  const [chartImage1, setChartImage1] = useState(null);
  const [chartImage2, setChartImage2] = useState(null);

  // First dataset
  const dataSet1 = item?.top_clean_listings || [];

  // Second dataset
  const dataSet2 = item?.bottom_damaged_listings || [];

  // Create chart data from dataset
  const createChartData = (dataset) => {
    const X = dataset.map((d) => d.miles);
    const Y = dataset.map((d) => d.price);
    const regressionResult = regression.linear(dataset.map((d) => [d.miles, d.price]));
    const [a, b] = regressionResult.equation;
    const minX = Math.min(...X);
    const maxX = Math.max(...X);
    const lineX = [minX, maxX];
    const lineY = lineX.map((x) => a * x + b);

    return {
      data: {
        labels: X,
        datasets: [
          {
            label: "Price vs Mileage",
            data: Y,
            borderColor: "blue",
            backgroundColor: "blue",
            type: "scatter",
            showLine: false,
          },
          {
            label: "Regression Line",
            data: lineX.map((x, i) => ({ x, y: lineY[i] })),
            borderColor: "red",
            backgroundColor: "transparent",
            type: "line",
            fill: false,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "linear",
            title: { display: true, text: "Mileage" },
          },
          y: {
            title: { display: true, text: "Price ($)" },
          },
        },
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
        animation: false,
      },
    };
  };

  const chart1 = createChartData(dataSet1);
  const chart2 = createChartData(dataSet2);

  // Capture canvas as image after render
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (chartRef1.current?.canvas) {
        setChartImage1(chartRef1.current.canvas.toDataURL("image/png"));
      }
      if (chartRef2.current?.canvas) {
        setChartImage2(chartRef2.current.canvas.toDataURL("image/png"));
      }
    }, 500); // wait for chart rendering

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Hidden charts offscreen with fixed size */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}>
        <div style={{ width: "800px", height: "400px" }}>
          <Line
            ref={chartRef1}
            data={chart1.data}
            options={chart1.options}
            width={800}
            height={400}
          />
        </div>
        <div style={{ width: "800px", height: "400px" }}>
          <Line
            ref={chartRef2}
            data={chart2.data}
            options={chart2.options}
            width={800}
            height={400}
          />
        </div>
      </div>

      {/* PDF download link */}
      <PDFDownloadLink
        document={
          <PDFDocument
            report={item}
            topListChartImage={chartImage1}
            bottomListChartImage={chartImage2}
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
    </>
  );
};

export default ChartPdfImage;
