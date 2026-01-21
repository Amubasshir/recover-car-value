// "use client";

// import * as echarts from "echarts";
// import { useEffect, useRef } from "react";

// const PreAccidentMarketChart = ({
//   data: dataProp = [],
//   subjectMileage,
//   title = "Pre-Accident Market Listings",
//   onImageReady,
// }: {
//   data?: any[];
//   subjectMileage?: number;
//   title?: string;
//   onImageReady?: (img: string) => void;
// }) => {
//   const chartRef = useRef(null);

//   // Use provided data or fall back to default example data
//   const preAccidentListings = dataProp && dataProp.length > 0 ? dataProp : [];

//   // const preAccidentListings = [{"vin": "WP0AF2A92RS273793", "make": "Porsche", "trim": "S/T", "year": 2024, "miles": 489, "model": "911", "price": 749996, "dealer_zip": "28217", "dealer_name": "McLaren Charlotte"}, {"vin": "ZHWUM6ZD4MLA10608", "make": "Lamborghini", "trim": "Coupe", "year": 2021, "miles": 15680, "model": "Aventador SVJ", "price": 749995, "dealer_zip": "60435", "dealer_name": "Motor Cars of Chicago"}, {"vin": "WP0AF2A95RS273321", "make": "Porsche", "trim": "GT3 RS", "year": 2024, "miles": 767, "model": "911", "price": 749881, "dealer_zip": "94941", "dealer_name": "Porsche Marin"}, {"vin": "ZHWUC1ZM6RLA00997", "make": "Lamborghini", "trim": "Base", "year": 2024, "miles": 152, "model": "Revuelto", "price": 699950, "dealer_zip": "33181", "dealer_name": "Prestige Imports"}, {"vin": "ZFFKW66AX90166793", "make": "Ferrari", "trim": "Spider F1", "year": 2009, "miles": 25785, "model": "F430", "price": 649900, "dealer_zip": "33426", "dealer_name": "Ilusso Palm Beach"}]

//   useEffect(() => {
//     if (preAccidentListings.length === 0) return;

//     const chartDom = chartRef.current;
//     const myChart = echarts.init(chartDom);

//     console.log({ preAccidentListings });
//     // Prepare data points
//     const dataPoints = preAccidentListings.map((item) => [
//       item.miles,
//       item.price,
//     ]);

//     // Calculate dynamic axis ranges with padding
//     const mileages = dataPoints.map((point) => point[0]);
//     const prices = dataPoints.map((point) => point[1]);

//     // const minMileage = Math.min(...mileages) > 10000 ? Math.min(...mileages) - 10000 : Math.min(...mileages);
//     // const maxMileage = Math.max(...mileages) + 10000;
//     const minMileage = Math.min(...mileages);
//     const maxMileage = Math.max(...mileages);
//     const minPrice = Math.min(...prices);
//     const maxPrice = Math.max(...prices);

//     // Add padding to ranges
//     const mileagePadding = (maxMileage - minMileage) * 0.1 || 5000;
//     const pricePadding = (maxPrice - minPrice) * 0.1 || 1000;
//     // const mileagePadding = (maxMileage - minMileage) * 1 || 5000;
//     // const pricePadding = (maxPrice - minPrice) * 1 || 1000;
//     // const mileagePadding = (maxMileage + minMileage) / 2;
//     // const pricePadding = (maxPrice + minPrice) / 2;

//     // const chartMinX = Math.max(0, minMileage - mileagePadding);
//     // const chartMaxX = maxMileage + mileagePadding;
//     const chartMinX = Math.max(0, minMileage - mileagePadding) > 5000 ?Math.max(0, minMileage - mileagePadding) - 5000 : Math.max(0, minMileage - mileagePadding) ;
//     const chartMaxX = (maxMileage + mileagePadding) + 5000;
//     const chartMinY = Math.max(0, minPrice - pricePadding);
//     const chartMaxY = maxPrice + pricePadding;

//     // Calculate regression line (only if we have more than 1 data point)
//     let regressionLine: number[][] = [];

//     let slope = 0;
//     let intercept = 0;

//     if (dataPoints.length > 1) {
//       const n = dataPoints.length;
//       const sumX = dataPoints.reduce((sum, point) => sum + point[0], 0);
//       const sumY = dataPoints.reduce((sum, point) => sum + point[1], 0);
//       const sumXY = dataPoints.reduce(
//         (sum, point) => sum + point[0] * point[1],
//         0
//       );
//       const sumXX = dataPoints.reduce(
//         (sum, point) => sum + point[0] * point[0],
//         0
//       );

//       const denominator = n * sumXX - sumX * sumX;
//       if (denominator !== 0) {
//         slope = (n * sumXY - sumX * sumY) / denominator;
//         intercept = (sumY - slope * sumX) / n;

//         console.log([
//           [Math.floor(chartMinX), slope * Math.floor(chartMinX) + intercept],
//           [Math.floor(chartMaxX), slope * Math.floor(chartMaxX) + intercept],
//         ])

//         // Create regression line data points
//         regressionLine = [
//           [Math.floor(chartMinX), Math.floor(slope * chartMinX + intercept)],
//           [Math.floor(chartMaxX), Math.floor(slope * chartMaxX + intercept)],
//         ];
//       }
//     }

//     // Prepare series data
//     const series: any[] = [
//       {
//         name: "Market Listings",
//         type: "scatter",
//         data: dataPoints,
//         symbolSize: 8,
//         itemStyle: {
//           color: "#4472C4",
//         },
//         symbol: "rect",
//         symbolRotate: 45,
//       },
//     ];
//     // Add regression line if we have enough data
//     if (regressionLine.length > 0) {
//       console.log({ regressionLine });
//       series.push({
//         name: "Regression Trendline",
//         type: "line",
//         data: regressionLine,
//         lineStyle: {
//           color: "#E74C3C",
//           width: 2,
//           type: "solid",
//         },
//         symbol: "none",
//         smooth: false,
//       });
//     }

//     // console.log({subjectMileage, chartMinX,})
//     // Add subject mileage line if it's within the chart range
//     if (
//       typeof subjectMileage === "number" &&
//       subjectMileage >= chartMinX &&
//       subjectMileage <= chartMaxX
//     ) {
//       series.push({
//         name: `Subject Mileage: ${subjectMileage.toLocaleString()}`,
//         type: "line",
//         data: [
//           [subjectMileage, chartMinY],
//           [subjectMileage, chartMaxY],
//         ],
//         lineStyle: {
//           color: "#27AE60",
//           width: 2,
//           type: "dashed",
//         },
//         symbol: "none",
//       });
//     }

//     const option = {
//       title: {
//         text: title,
//         left: "center",
//         top: 20,
//         textStyle: {
//           fontSize: 20,
//           fontWeight: "bold",
//           color: "#333",
//         },
//       },
//       tooltip: {
//         trigger: "item",
//         formatter: function (params: any) {
//           if (
//             params.seriesName === "Market Listings" &&
//             preAccidentListings[params.dataIndex]
//           ) {
//             const listing = preAccidentListings[params.dataIndex];
//             return `${listing.year || "N/A"} ${listing.make || ""} ${
//               listing.model || ""
//             } ${listing.trim || ""}<br/>
//                     Mileage: ${
//                       listing.miles ? listing.miles.toLocaleString() : "N/A"
//                     }<br/>
//                     Price: ${
//                       listing.price ? listing.price.toLocaleString() : "N/A"
//                     }<br/>
//                     ${
//                       listing.dealer_name
//                         ? "Dealer: " + listing.dealer_name
//                         : ""
//                     }`;
//           }
//           return "";
//         },
//       },
//       legend: {
//         data: series.map((s) => s.name),
//         right: 20,
//         top: 40,
//         orient: "vertical",
//         itemGap: 15,
//       },
//       grid: {
//         left: 80,
//         right: 80,
//         top: 100,
//         bottom: 80,
//       },
//       xAxis: {
//         type: "value",
//         name: "Mileage",
//         nameLocation: "middle",
//         nameGap: 30,
//         min: Math.floor(chartMinX),
//         max: Math.floor(chartMaxX),
//         axisLine: {
//           lineStyle: {
//             color: "#666",
//           },
//         },
//         splitLine: {
//           show: true,
//           lineStyle: {
//             color: "#e6e6e6",
//             type: "solid",
//           },
//         },
//         axisLabel: {
//           formatter: "{value}",
//         },
//       },
//       yAxis: {
//         type: "value",
//         name: "Price ($)",
//         nameLocation: "middle",
//         nameGap: 50,
//         min: Math.floor(chartMinY),
//         max: Math.floor(chartMaxY),
//         axisLine: {
//           lineStyle: {
//             color: "#666",
//           },
//         },
//         splitLine: {
//           show: true,
//           lineStyle: {
//             color: "#e6e6e6",
//             type: "solid",
//           },
//         },
//         axisLabel: {
//           formatter: "{value}",
//         },
//       },
//       series: series,
//     };

//     myChart.setOption(option);

//     // Handle resize
//     const handleResize = () => {
//       myChart.resize();
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       myChart.dispose();
//     };
//   }, [dataProp, subjectMileage, title]);

//   // Capture canvas as image after render
//   // useEffect(() => {
//   //   const timeout = setTimeout(() => {
//   //     if (chartRef.current?.canvas && onImageReady) {
//   //       const imageData = chartRef.current.canvas.toDataURL("image/png");
//   //       onImageReady(imageData);
//   //     }
//   //   }, 1500);

//   //   return () => clearTimeout(timeout);
//   // }, [onImageReady]);
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (chartRef.current) {
//         const chartInstance = echarts.getInstanceByDom(chartRef.current);
//         if (chartInstance && onImageReady) {
//           const imageData = chartInstance.getDataURL({
//             type: "png",
//             pixelRatio: 2, // Higher quality
//             backgroundColor: "#fff",
//           });
//           onImageReady(imageData);
//         }
//       }
//     }, 1000);

//     return () => clearTimeout(timeout);
//     // }, [data, subjectMileage, title]);
//   }, []);

//   return (
//     <div className="w-full h-[600px] bg-white border border-gray-200 rounded-lg shadow-sm">
//       <div ref={chartRef} className="w-full h-full" />
//     </div>
//   );
// };

// export default PreAccidentMarketChart;


"use client";

import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const PreAccidentMarketChart = ({
  data: dataProp = [],
  subjectMileage,
  title = "Pre-Accident Market Listings",
  onImageReady,
}: {
  data?: any[];
  subjectMileage?: number;
  title?: string;
  onImageReady?: (img: string) => void;
}) => {
  const chartRef = useRef(null);

  // Use provided data or fall back to default example data
  const preAccidentListings = dataProp && dataProp.length > 0 ? dataProp : [];

  // const preAccidentListings = [{"vin": "WP0AF2A92RS273793", "make": "Porsche", "trim": "S/T", "year": 2024, "miles": 489, "model": "911", "price": 749996, "dealer_zip": "28217", "dealer_name": "McLaren Charlotte"}, {"vin": "ZHWUM6ZD4MLA10608", "make": "Lamborghini", "trim": "Coupe", "year": 2021, "miles": 15680, "model": "Aventador SVJ", "price": 749995, "dealer_zip": "60435", "dealer_name": "Motor Cars of Chicago"}, {"vin": "WP0AF2A95RS273321", "make": "Porsche", "trim": "GT3 RS", "year": 2024, "miles": 767, "model": "911", "price": 749881, "dealer_zip": "94941", "dealer_name": "Porsche Marin"}, {"vin": "ZHWUC1ZM6RLA00997", "make": "Lamborghini", "trim": "Base", "year": 2024, "miles": 152, "model": "Revuelto", "price": 699950, "dealer_zip": "33181", "dealer_name": "Prestige Imports"}, {"vin": "ZFFKW66AX90166793", "make": "Ferrari", "trim": "Spider F1", "year": 2009, "miles": 25785, "model": "F430", "price": 649900, "dealer_zip": "33426", "dealer_name": "Ilusso Palm Beach"}]

  useEffect(() => {
    if (preAccidentListings.length === 0) return;

    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    console.log({ preAccidentListings });
    // Prepare data points
    const dataPoints = preAccidentListings.map((item) => [
      item.miles,
      item.price,
    ]);

    // Calculate dynamic axis ranges with padding
    const mileages = dataPoints.map((point) => point[0]);
    const prices = dataPoints.map((point) => point[1]);

    // const minMileage = Math.min(...mileages) > 10000 ? Math.min(...mileages) - 10000 : Math.min(...mileages);
    // const maxMileage = Math.max(...mileages) + 10000;
    const minMileage = Math.min(...mileages);
    const maxMileage = Math.max(...mileages);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Add padding to ranges
    const mileagePadding = (maxMileage - minMileage) * 0.1 || 5000;
    const pricePadding = (maxPrice - minPrice) * 0.1 || 1000;
    // const mileagePadding = (maxMileage - minMileage) * 1 || 5000;
    // const pricePadding = (maxPrice - minPrice) * 1 || 1000;
    // const mileagePadding = (maxMileage + minMileage) / 2;
    // const pricePadding = (maxPrice + minPrice) / 2;

    // const chartMinX = Math.max(0, minMileage - mileagePadding);
    // const chartMaxX = maxMileage + mileagePadding;
    const chartMinX = Math.max(0, minMileage - mileagePadding) > 5000 ?Math.max(0, minMileage - mileagePadding) - 5000 : Math.max(0, minMileage - mileagePadding) ;
    const chartMaxX = (maxMileage + mileagePadding) + 5000;
    const chartMinY = Math.max(0, minPrice - pricePadding);
    const chartMaxY = maxPrice + pricePadding;

    // Calculate regression line (only if we have more than 1 data point)
    let regressionLine: number[][] = [];

    let slope = 0;
    let intercept = 0;

    if (dataPoints.length > 1) {
      const n = dataPoints.length;
      const sumX = dataPoints.reduce((sum, point) => sum + point[0], 0);
      const sumY = dataPoints.reduce((sum, point) => sum + point[1], 0);
      const sumXY = dataPoints.reduce(
        (sum, point) => sum + point[0] * point[1],
        0
      );
      const sumXX = dataPoints.reduce(
        (sum, point) => sum + point[0] * point[0],
        0
      );

      const denominator = n * sumXX - sumX * sumX;
      if (denominator !== 0) {
        slope = (n * sumXY - sumX * sumY) / denominator;
        intercept = (sumY - slope * sumX) / n;

        console.log([
          [Math.floor(chartMinX), slope * Math.floor(chartMinX) + intercept],
          [Math.floor(chartMaxX), slope * Math.floor(chartMaxX) + intercept],
        ])

        // Create regression line data points
        regressionLine = [
          [Math.floor(chartMinX), Math.floor(slope * chartMinX + intercept)],
          [Math.floor(chartMaxX), Math.floor(slope * chartMaxX + intercept)],
        ];
      }
    }

    // Prepare series data
    const series: any[] = [
      {
        name: "Market Listings",
        type: "scatter",
        data: dataPoints,
        symbolSize: 8,
        itemStyle: {
          color: "#4472C4",
        },
        symbol: "rect",
        symbolRotate: 45,
      },
    ];
    
    // Add regression line if we have enough data
    // if (regressionLine.length > 0) {
    //   console.log({ regressionLine });
    //   series.push({
    //     name: "Regression Trendline",
    //     type: "line",
    //     data: regressionLine,
    //     lineStyle: {
    //       color: "#E74C3C",
    //       width: 2,
    //       type: "solid",
    //     },
    //     symbol: "none",
    //     smooth: false,
    //   });
    // }

    // ADDED: Middle horizontal line
    const middlePrice = (chartMinY + chartMaxY) / 2;
    const middleLineData = [
      [Math.floor(chartMinX), Math.floor(middlePrice)],
      [Math.floor(chartMaxX), Math.floor(middlePrice)],
    ];
    
    series.push({
    //   name: "Middle Price Line",
    name: `Regression Trendline`,
      type: "line",
      data: middleLineData,
      lineStyle: {
        color: "#FF0000", // Red color
        width: 2,
        type: "solid",
      },
      symbol: "none",
      smooth: false,
    });

    // console.log({subjectMileage, chartMinX,})
    // Add subject mileage line if it's within the chart range
    if (
      typeof subjectMileage === "number" &&
      subjectMileage >= chartMinX &&
      subjectMileage <= chartMaxX
    ) {
      series.push({
        name: `Subject Mileage: ${subjectMileage.toLocaleString()}`,
        type: "line",
        data: [
          [subjectMileage, chartMinY],
          [subjectMileage, chartMaxY],
        ],
        lineStyle: {
          color: "#27AE60",
          width: 2,
          type: "dashed",
        },
        symbol: "none",
      });
    }

    const option = {
      title: {
        text: title,
        left: "center",
        top: 20,
        textStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#333",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: function (params: any) {
          if (
            params.seriesName === "Market Listings" &&
            preAccidentListings[params.dataIndex]
          ) {
            const listing = preAccidentListings[params.dataIndex];
            return `${listing.year || "N/A"} ${listing.make || ""} ${
              listing.model || ""
            } ${listing.trim || ""}<br/>
                    Mileage: ${
                      listing.miles ? listing.miles.toLocaleString() : "N/A"
                    }<br/>
                    Price: ${
                      listing.price ? listing.price.toLocaleString() : "N/A"
                    }<br/>
                    ${
                      listing.dealer_name
                        ? "Dealer: " + listing.dealer_name
                        : ""
                    }`;
          }
          return "";
        },
      },
      legend: {
        data: series.map((s) => s.name),
        right: 20,
        top: 40,
        orient: "vertical",
        itemGap: 15,
      },
      grid: {
        left: 80,
        right: 80,
        top: 100,
        bottom: 80,
      },
      xAxis: {
        type: "value",
        name: "Mileage",
        nameLocation: "middle",
        nameGap: 30,
        min: Math.floor(chartMinX),
        max: Math.floor(chartMaxX),
        axisLine: {
          lineStyle: {
            color: "#666",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#e6e6e6",
            type: "solid",
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      yAxis: {
        type: "value",
        name: "Price ($)",
        nameLocation: "middle",
        nameGap: 50,
        min: Math.floor(chartMinY),
        max: Math.floor(chartMaxY),
        axisLine: {
          lineStyle: {
            color: "#666",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#e6e6e6",
            type: "solid",
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      series: series,
    };

    myChart.setOption(option);

    // Handle resize
    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, [dataProp, subjectMileage, title]);

  // Capture canvas as image after render
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (chartRef.current?.canvas && onImageReady) {
  //       const imageData = chartRef.current.canvas.toDataURL("image/png");
  //       onImageReady(imageData);
  //     }
  //   }, 1500);

  //   return () => clearTimeout(timeout);
  // }, [onImageReady]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (chartRef.current) {
        const chartInstance = echarts.getInstanceByDom(chartRef.current);
        if (chartInstance && onImageReady) {
          const imageData = chartInstance.getDataURL({
            type: "png",
            pixelRatio: 2, // Higher quality
            backgroundColor: "#fff",
          });
          onImageReady(imageData);
        }
      }
    }, 1000);

    return () => clearTimeout(timeout);
    // }, [data, subjectMileage, title]);
  }, []);

  return (
    <div className="w-full h-[600px] bg-white border border-gray-200 rounded-lg shadow-sm">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default PreAccidentMarketChart;