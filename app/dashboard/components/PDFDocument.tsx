import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import image from "../../../public/recover-car-value.jpg";
import { Report } from "../types/report";
import dayjs from "dayjs"; // ES 2015

Font.register({
  family: 'Telegraph',
  src: `/fonts/PPTelegraf-Ultrabold.otf`,
//   src: `/fonts/PPTelegraf-Regular.otf`,
});

Font.register({
  family: 'Garet',
  src: `/fonts/Garet-Book.ttf`
});


// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontFamily: "Garet",
//   },

//   //! v2
//   coverPage: {
//     position: "relative",
//     height: "100%",
//     width: "100%",
//   },
//   // Main diagonal blue background
//   mainBackground: {
//     position: "absolute",
//     top: -50,
//     left: 0,
//     right: 0,
//     height: "120%",
//     background:
//       "linear-gradient(135deg, #1e3a8a 0%, #1e40af 30%, #3b82f6 60%, #60a5fa 100%)",
//     transform: "skewY(-0deg)",
//     transformOrigin: "top left",
//   },
//   // Car image overlay
//   coverBackground: {
//     position: "absolute",
//     top: -220,
//     left: -0.5,
//     right: 0,
//     height: "120%",
//     opacity: 1,
//     transform: "skewY(8deg)", // 0deg
//     transformOrigin: "top left",
//   },
//   //   coverBackgroundColor: {
//   //     position: "absolute",
//   //     top: -220,
//   //     left: -0.5,
//   //     right: 0,
//   //     height: "120%",
//   //     opacity: 1,
//   //     transform: "skewY(0deg)",
//   //     transformOrigin: "top left",
//   //     backgroundColor: "#142445bd",
//   //   },
//   // Blue diagonal stripe at top
//   blueOverlayStripe: {
//     position: "absolute",
//     top: 100,
//     left: 0,
//     right: 0,
//     width: "100%",
//     height: 525,
//     // backgroundColor: "#142445bd",
//     backgroundColor: "#21597aa3",
//     transform: "skewY(-17deg)",
//     transformOrigin: "top left",
//   },
//   // Blue diagonal stripe at top
//   blueStripe: {
//     position: "absolute",
//     top: -48,
//     left: -50,
//     width: "100%",
//     height: 180,
//     backgroundColor: "#142445",
//     transform: "skewY(-17deg)",
//     transformOrigin: "top left",
//   },
//   // Red diagonal stripe at top
//   redStripe: {
//     position: "absolute",
//     top: 100,
//     left: 50,
//     width: "100%",
//     height: 20,
//     backgroundColor: "#ef4444",
//     transform: "skewY(-17deg)",
//     transformOrigin: "top left",
//   },
//   // White bottom section
//   whiteBottomSection: {
//     position: "absolute",
//     bottom: -220,
//     left: -3,
//     right: -3,
//     width: "105%",
//     height: 400,
//     backgroundColor: "#ffffff",
//     transform: "skewY(-17deg)",
//     transformOrigin: "bottom left",
//   },
//   // Red diagonal element at bottom left
//   redBottomElement: {
//     position: "absolute",
//     bottom: -10,
//     left: -80,
//     width: 260,
//     height: 80,
//     backgroundColor: "#ef4444",
//     transform: "skewY(27deg)",
//     transformOrigin: "bottom left",
//   },
//   coverTitle: {
//     position: "absolute",
//     fontSize: 64,
//     fontWeight: "bold",
//     color: "#ffffff",
//     top: 180,
//     left: 60,
//     width: 400,
//     lineHeight: 1.1,
//   },
//   // Report Date section
//   reportDateContainer: {
//     position: "absolute",
//     top: 560,
//     textAlign: "right",
//     right: 40,
//   },
//   reportDateLabel: {
//     fontSize: 18,
//     color: "#ef4444",
//     fontWeight: "bold",
//     marginBottom: 4,
//     textAlign: "right",
//   },
//   reportDateValue: {
//     fontSize: 18,
//     color: "#374151",
//     fontWeight: "bold",
//     textAlign: "right",
//   },
//   // Prepared For section
//   preparedForContainer: {
//     position: "absolute",
//     bottom: 70,
//     left: 40,
//   },
//   preparedForLabel: {
//     fontSize: 16,
//     color: "#ef4444",
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   clientName: {
//     fontSize: 14,
//     color: "#1f2937",
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   clientContact: {
//     fontSize: 14,
//     color: "#374151",
//     marginBottom: 2,
//   },
//   // Vehicle section
//   vehicleContainer: {
//     position: "absolute",
//     bottom: 70,
//     right: 40,
//     textAlign: "right",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "flex-end",
//     alignItems: "flex-end",
//   },
//   vehicleLabel: {
//     fontSize: 16,
//     color: "#ef4444",
//     fontWeight: "bold",
//     marginBottom: 8,
//     textAlign: "right",
//   },
//   vehicleValue: {
//     fontSize: 14,
//     color: "#1f2937",
//     fontWeight: "bold",
//     marginBottom: 12,
//     textAlign: "right",
//   },
//   accidentDateLabel: {
//     fontSize: 14,
//     color: "#ef4444",
//     fontWeight: "bold",
//     marginBottom: 4,
//     textAlign: "right",
//   },
//   accidentDateValue: {
//     fontSize: 14,
//     color: "#374151",
//     fontWeight: "bold",
//     textAlign: "right",
//   },

//   //   page 1 end

//   title: {
//     fontSize: 24,
//     marginBottom: 15,
//     fontWeight: "bold",
//     color: "#1a365d",
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 15,
//     fontWeight: "bold",
//     color: "#1a365d",
//   },
//   methodologyText: {
//     fontSize: 12,
//     marginBottom: 20,
//     lineHeight: 1.5,
//   },
//   methodologySection: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#1a365d",
//     marginBottom: 8,
//   },
//   table: {
//     width: "100%",
//     marginBottom: 20,
//   },
//   tableHeader: {
//     flexDirection: "row",
//     backgroundColor: "#1a365d",
//     color: "white",
//     padding: 8,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   tableRow: {
//     flexDirection: "row",
//     padding: 8,
//     fontSize: 9,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e2e8f0",
//   },
//   alternateRow: {
//     backgroundColor: "#f8fafc",
//   },
//   cell: {
//     flex: 0.9,
//     textAlign: "center",
//   },
//   vinCell: {
//     flex: 2,
//     flexWrap: "nowrap",
//     textAlign: "center",
//   },
//   makeModelCell: {
//     flex: 1.5,
//     textAlign: "center",
//   },
//   summary: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: "#f1f5f9",
//     textAlign: "center",
//   },
//   summaryText: {
//     fontSize: 12,
//     marginBottom: 8,
//   },
//   footer: {
//     position: "absolute",
//     bottom: 30,
//     left: 30,
//     right: 30,
//     fontSize: 8,
//     color: "#64748b",
//   },
// });



const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Garet", // Garet font for body text as requested
  },

  //! v2
  coverPage: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  // Main diagonal blue background
  mainBackground: {
    position: "absolute",
    top: -50,
    left: 0,
    right: 0,
    height: "120%",
    background:
      "linear-gradient(135deg, #1e3a8a 0%, #1e40af 30%, #3b82f6 60%, #60a5fa 100%)",
    transform: "skewY(-0deg)",
    transformOrigin: "top left",
  },
  // Car image overlay
  coverBackground: {
    position: "absolute",
    top: -220,
    left: -0.5,
    right: 0,
    height: "120%",
    opacity: 1,
    transform: "skewY(8deg)", // 0deg
    transformOrigin: "top left",
  },
  //   coverBackgroundColor: {
  //     position: "absolute",
  //     top: -220,
  //     left: -0.5,
  //     right: 0,
  //     height: "120%",
  //     opacity: 1,
  //     transform: "skewY(0deg)",
  //     transformOrigin: "top left",
  //     backgroundColor: "#142445bd",
  //   },
  // Blue diagonal stripe at top
  blueOverlayStripe: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    width: "100%",
    height: 525,
    // backgroundColor: "#142445bd",
    backgroundColor: "#21597aa3",
    transform: "skewY(-17deg)",
    transformOrigin: "top left",
  },
  // Blue diagonal stripe at top
  blueStripe: {
    position: "absolute",
    top: -48,
    left: -50,
    width: "100%",
    height: 180,
    backgroundColor: "#142445",
    transform: "skewY(-17deg)",
    transformOrigin: "top left",
  },
  // Red diagonal stripe at top
  redStripe: {
    position: "absolute",
    top: 100,
    left: 50,
    width: "100%",
    height: 20,
    backgroundColor: "#ef4444",
    transform: "skewY(-17deg)",
    transformOrigin: "top left",
  },
  // White bottom section
  whiteBottomSection: {
    position: "absolute",
    bottom: -220,
    left: -3,
    right: -3,
    width: "105%",
    height: 400,
    backgroundColor: "#ffffff",
    transform: "skewY(-17deg)",
    transformOrigin: "bottom left",
  },
  // Red diagonal element at bottom left
  redBottomElement: {
    position: "absolute",
    bottom: -10,
    left: -80,
    width: 260,
    height: 80,
    backgroundColor: "#ef4444",
    transform: "skewY(27deg)",
    transformOrigin: "bottom left",
  },
  coverTitle: {
    position: "absolute",
    fontSize: 64,
    fontWeight: "bold",
    fontFamily: "Telegraph", // Telegraph font for heading as requested
    color: "#ffffff",
    top: 180,
    left: 60,
    width: 400,
    lineHeight: 1.1,
  },
  // Report Date section
  reportDateContainer: {
    position: "absolute",
    top: 560,
    textAlign: "right",
    right: 40,
  },
  reportDateLabel: {
    fontSize: 18,
    color: "#ef4444",
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "right",
  },
  reportDateValue: {
    fontSize: 18,
    color: "#374151",
    fontWeight: "bold",
    textAlign: "right",
  },
  // Prepared For section
  preparedForContainer: {
    position: "absolute",
    bottom: 70,
    left: 40,
  },
  preparedForLabel: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "bold",
    marginBottom: 8,
  },
  clientName: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "bold",
    marginBottom: 4,
  },
  clientContact: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 2,
  },
  // Vehicle section
  vehicleContainer: {
    position: "absolute",
    bottom: 70,
    right: 40,
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  vehicleLabel: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "right",
  },
  vehicleValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "right",
  },
  accidentDateLabel: {
    fontSize: 14,
    color: "#ef4444",
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "right",
  },
  accidentDateValue: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "bold",
    textAlign: "right",
  },

  //   page 1 end

  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: "bold",
    fontFamily: "Telegraph", // Telegraph font for heading as requested
    color: "#1a365d",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: "bold",
    fontFamily: "Telegraph", // Telegraph font for heading as requested
    color: "#1a365d",
  },
  methodologyText: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 1.5,
  },
  methodologySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Telegraph", // Telegraph font for heading as requested
    color: "#1a365d",
    marginBottom: 8,
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1a365d",
    color: "white",
    padding: 8,
    fontSize: 9,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    fontSize: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  alternateRow: {
    backgroundColor: "#f8fafc",
  },
  cell: {
    flex: 0.9,
    textAlign: "center",
  },
  vinCell: {
    flex: 2,
    flexWrap: "nowrap",
    textAlign: "center",
  },
  makeModelCell: {
    flex: 1.5,
    textAlign: "center",
  },
  summary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f1f5f9",
    textAlign: "center",
  },
  summaryText: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    color: "#64748b",
    textAlign: "center",
  },
});
interface PDFDocumentProps {
  report: Report;
}

export const PDFDocument = ({ report }: PDFDocumentProps) => {
  console.log({ report });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.coverPage}>
          {/* Main diagonal blue background */}
          <View style={styles.mainBackground} />

          {/* Car image overlay */}
          <Image src={image.src} style={styles.coverBackground} />

          {/* Red diagonal stripe at top */}
          <View style={styles.blueOverlayStripe} />
          <View style={styles.blueStripe} />
          <View style={styles.redStripe} />

          {/* White bottom section */}
          <View style={styles.whiteBottomSection} />

          {/* Red diagonal element at bottom left */}
          <View style={styles.redBottomElement} />

          {/* Main title */}
          <Text style={styles.coverTitle}>
            Diminished{"\n"}Value{"\n"}Analysis{"\n"}Report
          </Text>

          {/* Report Date */}
          <View style={styles.reportDateContainer}>
            <Text style={styles.reportDateLabel}>Report Date:</Text>
            <Text style={styles.reportDateValue}>
              {dayjs(report?.created_at).format("MMM DD, YYYY")}
            </Text>
          </View>

          {/* Prepared For section */}
          <View style={styles.preparedForContainer}>
            <Text style={styles.preparedForLabel}>Prepared For:</Text>
            <Text style={styles.clientName}>{report?.client_info?.name}</Text>
            <Text style={styles.clientContact}>
              {report?.client_info?.phone}
            </Text>
            <Text style={styles.clientContact}>
              {report?.client_info?.email}
            </Text>
          </View>

          {/* Vehicle section */}
          <View style={styles.vehicleContainer}>
            <Text style={styles.vehicleLabel}>Vehicle:</Text>
            <Text style={styles.vehicleValue}>
              {report?.heading ||
                report?.year +
                  " " +
                  report?.make +
                  " " +
                  report?.model +
                  " " +
                  report?.trim}
            </Text>
            <Text style={styles.accidentDateLabel}>Date of Accident:</Text>
            <Text style={styles.accidentDateValue}>
              {dayjs(report?.accident_date).format("MMM DD, YYYY")}
            </Text>
          </View>
        </View>
      </Page>

      {/* <Page size="A4">
      <View style={styles.coverPage}>
        {report?.backgroundImage && (
          <Image src={"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} style={styles?.coverBackground} />
        )}
        <View style={styles.diagonalStripe} />
        <View style={styles.coverContent}>
          <Text style={styles.coverTitle}>Diminished Value Analysis Report</Text>
          <View style={styles.coverInfo}>
            <View style={styles.clientInfo}>
              <Text style={styles.infoLabel}>Prepared For:</Text>
              <Text style={styles.infoValue}>{report?.client_info?.name}</Text>
              <Text style={styles.infoValue}>{report?.client_info?.phone}</Text>
              <Text style={styles.infoValue}>{report?.client_info?.email}</Text>
            </View>
            <View style={styles.vehicleInfo}>
              <Text style={styles.infoLabel}>Report Date:</Text>
              <Text style={styles.infoValue}>{dayjs(report?.created_at).format('MMM DD, YYYY')}</Text>
              <Text style={styles.infoLabel}>Vehicle:</Text>
              <Text style={styles.infoValue}>{report.vehicleInfo}</Text> //! have to add
              <Text style={styles.infoLabel}>Date of Accident:</Text>
              <Text style={styles.infoValue}>{report.accident_date}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page> */}

      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Understanding Inherent Diminished Value
        </Text>

        <View style={styles.methodologySection}>
          <Text style={styles.methodologyText}>
            Inherent diminished value is the loss in a vehicle's market value
            specifically due to its accident history, even after repairs are
            completed. The best way to calculate Fair Market Value pre- and
            post-accident is through verifiable market data and accepted
            industry appraisal methods.
          </Text>
        </View>

        <Text style={styles.subtitle}>
          Methodology for Determining Diminished Value
        </Text>

        <View style={styles.methodologySection}>
          <Text style={styles.sectionTitle}>Data Collection:</Text>
          <Text style={styles.methodologyText}>
            Data is sourced from real-time active dealership listings in the
            last 90 days to ensure current market accuracy.
          </Text>
        </View>

        <View style={styles.methodologySection}>
          <Text style={styles.sectionTitle}>Vehicle Matching:</Text>
          <Text style={styles.methodologyText}>
            Comparable vehicles are selected based on year, make and model,
            similar mileage ranges, and geographic proximity (100 mile radius)
            for the most reliable market comparisons.
          </Text>
        </View>

        <View style={styles.methodologySection}>
          <Text style={styles.sectionTitle}>
            Pre-Accident Value Determination:
          </Text>
          <Text style={styles.methodologyText}>
            The pre-accident value is established by calculating the average
            fair market value of comparable clean-title vehicles (vehicles with
            no accident history).
          </Text>
        </View>

        <View style={styles.methodologySection}>
          <Text style={styles.sectionTitle}>
            Post-Accident Value Determination:
          </Text>
          <Text style={styles.methodologyText}>
            The post-accident value is established by calculating the average
            fair market value of similar vehicles that have a reported accident
            history.
          </Text>
        </View>

        <View style={styles.methodologySection}>
          <Text style={styles.sectionTitle}>Diminished Value Calculation:</Text>
          <Text style={styles.methodologyText}>
            Diminished Value = Pre-Accident Value - Post-Accident Value
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>
            This report was prepared based on real-time market data and accepted
            valuation methods. Sources include AutoTrader, Cars.com, CarGurus,
            eBay Motors, and dealer feeds.
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.subtitle}>Pre-Accident Comparable Listings</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>Date Listed</Text>
            <Text style={styles.vinCell}>VIN</Text>
            <Text style={styles.cell}>Year</Text>
            <Text style={styles.makeModelCell}>Make/Model</Text>
            <Text style={styles.cell}>Mileage</Text>
            <Text style={styles.cell}>Zipcode</Text>
            <Text style={styles.cell}>Price</Text>
            <Text style={styles.cell}>Status</Text>
          </View>
          {report?.top_clean_listings?.map((listing, index) => (
            <View
              key={listing?.vin}
              style={[styles.tableRow, index % 2 === 1 && styles.alternateRow]}
            >
              <Text style={styles.cell}>
                {dayjs(listing?.first_seen_at_source_date).format("MMM DD, YYYY")}
              </Text>
              <Text style={styles.vinCell}>{listing?.vin}</Text>
              <Text style={styles.cell}>{listing?.year}</Text>
              <Text style={styles.makeModelCell}>
                {listing?.make + ", " + listing?.model}
              </Text>
              <Text style={styles.cell}>{listing?.miles.toLocaleString()}</Text>
              <Text style={styles.cell}>{listing?.dealer_zip}</Text>
              <Text style={styles.cell}>
                ${listing?.price.toLocaleString()}
              </Text>
              {/* <Text style={styles.cell}>{listing.status}</Text> */}
              <Text style={styles.cell}>Clean</Text>
            </View>
          ))}
        </View>

        <Text style={styles.subtitle}>Post-Accident Comparable Listings</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>Date Listed</Text>
            <Text style={styles.vinCell}>VIN</Text>
            <Text style={styles.cell}>Year</Text>
            <Text style={styles.makeModelCell}>Make/Model</Text>
            <Text style={styles.cell}>Mileage</Text>
            <Text style={styles.cell}>Zipcode</Text>
            <Text style={styles.cell}>Price</Text>
            <Text style={styles.cell}>Status</Text>
          </View>
          {report?.bottom_damaged_listings?.map((listing, index) => (
            <View
              key={listing?.vin}
              style={[styles.tableRow, index % 2 === 1 && styles.alternateRow]}
            >
              <Text style={styles.cell}>
                {dayjs(listing?.first_seen_at_source_date).format("MMM DD, YYYY")}
              </Text>
              <Text style={styles.vinCell}>{listing?.vin}</Text>
              <Text style={styles.cell}>{listing?.year}</Text>
              <Text style={styles.makeModelCell}>
                {listing?.make + ", " + listing?.model}
              </Text>
              <Text style={styles.cell}>{listing?.miles.toLocaleString()}</Text>
              <Text style={styles.cell}>{listing?.dealer_zip}</Text>
              <Text style={styles.cell}>
                ${listing?.price.toLocaleString()}
              </Text>
              {/* <Text style={styles.cell}>{listing.status}</Text> */}
              <Text style={styles.cell}>Damaged</Text>
            </View>
          ))}
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Fair Market Value with No Accident: $
            {report?.average_clean_price_top5?.toFixed(2)?.toLocaleString()}
          </Text>
          <Text style={styles.summaryText}>
            Fair Market Value with Accident: $
            {report?.average_damaged_price_bottom5
              ?.toFixed(2)
              ?.toLocaleString()}
          </Text>
          <Text
            style={[
              styles.summaryText,
              { fontWeight: "bold", fontFamily: "Telegraph", fontSize: 14, marginTop: 10 },
            ]}
          >
            Calculated Diminished Value: $
            {report?.estimated_diminished_value?.toFixed(2)?.toLocaleString()}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>
            This report was prepared based on real-time market data and accepted
            valuation methods. Sources include AutoTrader, Cars.com, CarGurus,
            eBay Motors, and dealer feeds.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
