"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { SimpleLinearRegression } from 'ml-regression-simple-linear';
import { Download } from "lucide-react";
import { PDFDocument } from "./PDFDocument";

import PreAccidentMarketChart from "@/app/chart/page";
import { Card } from "@/components/ui/card";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  ScatterController,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Chart } from "react-chartjs-2";

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
  LineController
);

function filterAndSortByPriceAndMiles(
  data: any[]
): { price: number; miles: number }[] {
  return data
    .map((item) => ({
      price: item.price,
      miles:
        typeof item.miles === "number"
          ? item.miles
          : typeof item.miles === "string"
          ? Number(String(item.miles).replace(/,/g, "")) || 0
          : typeof item.mileage === "number"
          ? item.mileage
          : typeof item.mileage === "string"
          ? Number(String(item.mileage).replace(/,/g, "")) || 0
          : Math.floor(Math.random() * 5000 + 1000),
    }))
    .sort((a, b) => b.price - a.price);
}

function getFirstAndLastPrice(listings: { price: number }[]): [number, number] {
  if (!Array.isArray(listings) || listings.length === 0) {
    return [0, 0];
  }
  return [listings[0].price || 0, listings[listings.length - 1].price || 0];
}

const Index = ({ item }: { item: any }) => {
  const topCleanListings = filterAndSortByPriceAndMiles(
    item?.top_clean_listings || []
  );
  const bottomDamagedListings = filterAndSortByPriceAndMiles(
    item?.bottom_damaged_listings || []
  );
  // Only show post-accident chart when ≥2 comps and regression was performed (no fallback 90%)
  const showPostAccidentChart = item?.post_plot_generated === true || (bottomDamagedListings?.length >= 2 && item?.post_plot_generated !== false);

  const sortedTop = topCleanListings?.sort(
    (a: { miles: number }, b: { miles: number }) => b.miles - a.miles
  );
  const sortedBottom = bottomDamagedListings?.sort(
      (a: { miles: number }, b: { miles: number }) => b.miles - a.miles
    );

//   const topPrices = topCleanListings?.map((a) => a.price);
//   const topMileage = topCleanListings?.map((a) => a.miles);
//   const bottomPrices = bottomDamagedListings?.map((a) => a.price);
//   const bottomMileage = bottomDamagedListings?.map((a) => a.miles);

//   console.log("hi I am from pdf chart", {topPrices, topMileage, bottomPrices, bottomMileage})
//   const regressionTop = new SimpleLinearRegression(topMileage, topPrices);
//   const regressionBottom = new SimpleLinearRegression(bottomMileage, bottomPrices);


//   const topRegLine = regressionTop.predict(Number(item?.accident_mileage));
//   const bottomRegLine = regressionBottom.predict(Number(item?.accident_mileage));
//   console.log("i am regrassion log", regressionBottom, regressionTop, bottomRegLine, topRegLine)


  // Find middle index
  const middleIndex = Math.floor(sortedTop?.length / 2);
  const middleIndexBottom = Math.floor(sortedBottom?.length / 2);

  // Get only the middle miles
  const middleMilesTop = sortedTop[middleIndex]?.miles;

//   console.log({ middleMilesTop });
  const middleMilesBottom = sortedBottom[middleIndexBottom]?.miles;

  const priceRange = getFirstAndLastPrice(topCleanListings);

  // Static regression line as specified
  const staticRegression = priceRange;
  //   console.log({staticRegression})

  const [topChartImage, setTopChartImage] = useState<string | null>(null);
  const [bottomChartImage, setBottomChartImage] = useState<string | null>(null);

  return (
    <div className="">
      <div className="max-w-6xl mx-auto space-y-8" style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}>
      {/* <div className="max-w-6xl mx-auto space-y-8" style={{}}> */}
        <div style={{ width: "1000px", height: "600px" }}>
          <PreAccidentMarketChart
            data={topCleanListings}
            title="Pre-Accident Market Listings"
            //   staticRegression={staticRegression}
            // subjectMileage={middleMilesTop}
            subjectMileage={Number(item?.accident_mileage || 0)}
            onImageReady={setTopChartImage}
          />
        </div>

        {showPostAccidentChart && (
          <div style={{ width: "1000px", height: "600px" }}>
            <PreAccidentMarketChart
              data={bottomDamagedListings}
              title="Post-Accident Market Listings"
              subjectMileage={Number(item?.accident_mileage || 0)}
              onImageReady={setBottomChartImage}
            />
          </div>
        )}

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
            topListChartImage={topChartImage ?? undefined}
            bottomListChartImage={showPostAccidentChart ? (bottomChartImage ?? undefined) : undefined}
          />
        }
        fileName="diminished-value-report.pdf"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md duration-200 border-2 font-semibold"
      >
        {({ loading }) => (
          <>
            <Download size={18} />
            <span>{loading ? "Preparing..." : item?.selected_method === "total_loss" ? "Download Loss Report" : "Download PDF" }</span>
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

