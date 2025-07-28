
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
  ScatterController,
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
  CategoryScale,
  ScatterController,
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
