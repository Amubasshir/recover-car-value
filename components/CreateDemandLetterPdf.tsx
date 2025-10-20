export const revalidate = 0;

// DiminishedValueClaimTemplate.jsx
// import React from 'react';
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";


import logo1 from "../public/images/logo-full-wp.jpg";
import logo2 from "../public/images/logo-wp.jpg";
import dayjs from "dayjs";
import { Globe } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";

// Register fonts (you'll need to provide font files or use default)
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZg.ttf",
      fontWeight: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Inter",
    position: "relative",
  },
  backgroundLogo: {
    position: "absolute",
    top: "35%",
    left: "35%",
    transform: "translate(-50%, -50%)",
    opacity: 0.05,
    width: 300,
    height: 300,
  },
  //   header: {
  //     marginBottom: 30,
  //   },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    alignItems: "flex-start",
  },
  headerRight: {
    textAlign: "right",
    fontSize: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  address: {
    textAlign: "right",
    fontSize: 10,
    color: "#666666",
    marginBottom: 5,
    lineHeight: 1.4,
  },
  licenseInfo: {
    textAlign: "right",
    fontSize: 9,
    color: "#000000", // red-600
    marginBottom: 20,
    fontWeight: "bold",
  },
  insuranceCompany: {
    fontSize: 11,
    color: "#1f2937",
    marginBottom: 5,
  },
  subject: {
    fontSize: 12,
    // color: '#000000', // red-600
    fontWeight: "bold",
    marginBottom: 25,
    // textTransform: 'uppercase',
  },
  body: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#374151",
  },
  dynamicRed: {
    color: "#000000", // red-600
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
    textTransform: "uppercase",
  },
   footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerLayer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F59E0B",
    padding: 6,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#FFFFFF",
  },
  footerText: {
    marginLeft: 5,
    color: "#FFFFFF",
  },
  footerRightOverlayWhiteLeft: {
    position: "absolute",
    top: 0,
    right: "33.3%",
    height: "100%",
    width: "10px",
    backgroundColor: "#ffffff",
    transform: 'skewX(-25deg)',
  },
  footerRightOverlay: {
    position: "absolute",
    top: 0,
    right: -10,
    height: "100%",
    width: "35%",
    backgroundColor: "#000000",
    transform: 'skewX(-25deg)',
    borderLeft: '2px solid',
    borderColor: "#ffffff"
    // opacity: 0.25, // optional shading
  },
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   footerLayer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     backgroundColor: "#F59E0B",
//     padding: 6,
//     position: 'relative',
//   },
//   footerItem: {
//       flexDirection: "row",
//       alignItems: "center",
//       fontSize: 9,
//       color: "#FFFFFF",
//       position: 'relative',
//       zIndex: 10,
//     },
//     footerText: {
//         marginLeft: 5,
//         position: 'relative',
//         color: '#ffffff',
//         zIndex: 11,
//     },
//     footerRightOverlay: {
//       backgroundColor: '#000000',
//       position: 'absolute',
//       top: 0,
//       right: '-5%',
//       height: '100%',
//       width: "40%",
//     //   border: '7px solid #ffffff',
//       transform: 'skewX(-45deg)',
//       zIndex: -1,
//     },
    //   footer: {
        //     position: 'absolute',
  //     bottom: 30,
  //     left: 0,
  //     right: 0,
  //     backgroundColor: '#fef2f2', // red-50
  //     padding: 15,
  //     borderTopWidth: 2,
  //     borderTopColor: '#fecaca', // red-200
  //   },
  //   footerText: {
  //     fontSize: 9,
  //     color: '#991b1b', // red-800
  //     textAlign: 'center',
  //     fontWeight: 'bold',
  //   },
  claimInfo: {
    // backgroundColor: '#f8fafc',
    // padding: 15,
    // borderLeftWidth: 3,
    // borderLeftColor: '#000000',
    marginBottom: 20,
  },
  claimField: {
    flexDirection: "row",
    marginBottom: 4,
  },
  claimLabel: {
    // width: 120,
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  claimValue: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "bold",
    flex: 1,
  },
});

// Background Logo Component (you can replace with your actual logo)
const BackgroundLogo = () => (
  <View style={styles.backgroundLogo}>
    <Image
      style={{ height: "250px", width: "auto", opacity: 0.1 }}
      src={logo2.src}
    />
  </View>
);

const CreateDemandLetterPdf = ({
  clientData = {},
  insuranceData = {},
  claimData = {},
  item,
}) => {
  // Default data structure
  const data = {
    address: "1100 15th St NW\nWashington, D.C. 20005",
    licenseInfo: "Licensed in FL, MA, CA, CO & D.C.",
    insuranceCompanyName: insuranceData.name || "(Insurance Company Name)",
    insuranceCompanyAddress:
      insuranceData.address || "(Insurance Company Address)",
    clientName: clientData.fullName || "(Client's Full Name)",
    insuredName: claimData.insuredName || "(At-Fault Driver's Full Name)",
    claimNumber: claimData.claimNumber || "(Insurance Claim Number)",
    dateOfLoss: claimData.dateOfLoss || "(Date of Accident)",
    vehicle: claimData?.vehicleYMM || "(Vehicle Year, Make, Model)",
    vehicleYMM: claimData?.vehicleYMM || "(Vehicle Year, Make, Model)",
    dateOfAccident: claimData.dateOfAccident || "(Date of Accident)",
  };

  return (
    <Document>

        {/* Page 1 */}
      <Page size="A4" style={styles.page}>
        {/* Background Logo */}
        <BackgroundLogo />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Image src={logo1.src} style={{ width: "auto", height: "60px" }} />
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.address}>{data.address}</Text>
            <Text style={styles.licenseInfo}>{data.licenseInfo}</Text>
            {/* <Text style={styles.addressLine}>1100 15th St NW</Text>
                    <Text style={styles.addressLine}>Washington, D.C. 20005</Text>
                    <Text style={styles.addressLine}>Licensed in FL, MA, CA, CO & D.C.</Text> */}
          </View>
        </View>
        <View>
          <Text style={styles.insuranceCompany}>
            {data.insuranceCompanyName}
          </Text>
          <Text style={styles.insuranceCompany}>
            {data.insuranceCompanyAddress}
          </Text>

          <Text style={styles.subject}>
            Re: Diminished Value Claim Claimant: {data.clientName}
          </Text>
        </View>

        {/* Claim Information Box */}
        <View style={styles.claimInfo}>
          <View style={styles.claimField}>
            <Text style={styles.claimLabel}>Insured:</Text>
            <Text style={styles.claimValue}>{data.insuredName}</Text>
          </View>
          <View style={styles.claimField}>
            <Text style={styles.claimLabel}>Claim Number:</Text>
            <Text style={styles.claimValue}>{data.claimNumber}</Text>
          </View>
          <View style={styles.claimField}>
            <Text style={styles.claimLabel}>Date of Loss:</Text>
            <Text style={styles.claimValue}>{dayjs(data.dateOfLoss).format('MM/DD/YYYY')}</Text>
          </View>
          <View style={styles.claimField}>
            <Text style={styles.claimLabel}>Vehicle:</Text>
            <Text style={styles.claimValue}>{data.vehicle}</Text>
          </View>
        </View>

        {/* Body Content */}
        <View style={styles.body}>
          <Text style={styles.dynamicRed}>Dear Claims Department,</Text>

          <View style={styles.section}>
            <Text>
              I represent{" "}
              <Text style={styles.dynamicRed}>{data.clientName}</Text> in
              connection with a property damage claim arising from a motor
              vehicle accident on{" "}
              <Text style={styles.dynamicRed}>{dayjs(data.dateOfAccident).format('MM/DD/YYYY')}</Text>,
              caused by your insured. This letter serves as a formal demand for
              compensation for the diminished value of my client's vehicle,
              pursuant to Florida Statute § 626.9743, which holds the at-fault
              driver's insurance company accountable for restoring a vehicle to
              its pre-accident function, appearance, and value, including
              compensation for any loss in market value due to the accident.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.dynamicRed}>Background of the Claim</Text>
            <Text>
              On <Text style={styles.dynamicRed}>{dayjs(data.dateOfAccident).format('MM/DD/YYYY')}</Text>,
              my client's vehicle, a{" "}
              <Text style={styles.dynamicRed}>{data.vehicleYMM}</Text>, was
              involved in a collision caused by the negligence of your insured.
              The accident resulted in significant damage to my client's
              vehicle, requiring repairs, restoring the vehicle's functionality
              and appearance. However, despite these repairs, the vehicle's
              market value has been substantially reduced due to its accident
              history, as prospective buyers are unwilling to pay the same price
              for a vehicle with a documented collision record.
            </Text>
          </View>
        </View>

        {/* Footer */}
        {/* <View style={styles.footer}>
          <Text style={styles.footerText}>
            DIMINISHED VALUE CLAIM • FORMAL DEMAND • LEGAL NOTICE
          </Text>
        </View> */}

        {/* <View style={styles.footer}>
          <View style={styles.footerLayer}>
            <View style={styles.footerItem}>
              <Text>📞</Text>
              <Text style={styles.footerText}>(202)-455-8110</Text>
            </View>
            <View style={styles.footerItem}>
              <Text>✉</Text>
              <Text style={styles.footerText}>office@prime-lawgroup.com</Text>
            </View>
            <View style={styles.footerItem}>
              <Text>🌐</Text>
              <Text style={styles.footerText}>www.prime-lawgroup.com</Text>
            </View>
            <View style={styles.footerRightOverlay} />
          </View>
        </View> */}

        <View style={styles.footer}>
            <View style={styles.footerLayer}>
                <View style={styles.footerRightOverlayWhiteLeft} /> 
                <View style={styles.footerRightOverlay} /> 
                <View style={styles.footerItem}>
                <Text></Text>
                <Text style={styles.footerText}>(202)-455-8110</Text>
                </View>
                <View style={styles.footerItem}>
                <Text></Text>
                <Text style={styles.footerText}>office@prime-lawgroup.com</Text>
                </View>
                <View style={styles.footerItem}>
                <Text> </Text>
                <Text style={styles.footerText}>www.prime-lawgroup.com</Text>
                </View>
            </View>
        </View>

      </Page>

        {/* === PAGE 2 === */}
  <Page size="A4" style={styles.page}>
    <BackgroundLogo />

    {/* Header */}
    <View style={styles.header}>
      <View>
        <Image src={logo1.src} style={{ width: "auto", height: "60px" }} />
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.address}>{data.address}</Text>
        <Text style={styles.licenseInfo}>{data.licenseInfo}</Text>
      </View>
    </View>

    {/* Body */}
    <View style={styles.body}>
      <View style={styles.section}>
        <Text style={styles.dynamicRed}>Legal Basis for Diminished Value Claim</Text>
        <Text>
          Under Florida law, specifically Florida Statute § 626.9743, an insurer electing
          to repair a vehicle must restore it to substantially the same appearance,
          function, and value as before the loss. The Florida Department of Insurance’s
          Informational Bulletin 84-270 further clarifies that the insurer’s responsibility
          includes indemnifying the vehicle owner for any diminution in value, stating:
          “The owner has not been properly indemnified unless there is no diminution in
          value of the automobile as it was before the damage and as it is after repairs.”
          Additionally, Florida’s standard jury instructions for property damage (Fla. Std.
          Jury Instr. (Civ.) MI 8.2) provides that the measure of damages includes the
          difference between the vehicle’s value immediately before and after the
          incident, with due allowance for any reduction in value post-repair.
        </Text>
      </View>

      <View style={styles.section}>
        <Text>
          As your insured was at fault for the accident, my client is entitled to recover
          the diminished value of their vehicle, reflecting the loss in market value caused
          by the collision. This claim is filed within the four-year statute of limitations
          for property damage claims under Florida Statute § 95.11(3)(a).
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.dynamicRed}>Calculation of Diminished Value</Text>
        <Text>
          To determine the diminished value of my client’s vehicle, we have obtained a
          Diminished Value Analysis Report. The report was prepared using real-time
          market comps and accepted valuation methods to ensure accuracy. The
          appraisal, supported by verifiable comparables (comps) of similar vehicles with
          and without accident histories, as detailed in <Text style={styles.dynamicRed}>Attachment A,</Text> establishes the
          following:
        </Text>

        <Text>{"\n"}• <Text style={styles.dynamicRed}>Pre-Accident Market Value:</Text> <Text style={styles.dynamicRed}>${formatPrice(item?.average_clean_price_top5)}</Text>, based on the vehicle’s year, make, model, mileage, condition, and market trends.</Text>
        <Text>{"\n"}• <Text style={styles.dynamicRed}>Post-Repair Market Value:</Text> <Text style={styles.dynamicRed}>${formatPrice(item?.average_damaged_price_bottom5)}</Text>, reflecting the reduced resale value due to the accident history.</Text>
        <Text>{"\n"}• <Text style={styles.dynamicRed}>Diminished Value:</Text> <Text style={styles.dynamicRed}>${formatPrice(item?.estimated_diminished_value)}</Text>, calculated as the difference between the pre-accident and post-repair market values.</Text>

        <Text>
          {"\n"}These included in the comps demonstrate the market’s perception of reduced
          value for vehicles with collision records, consistent with industry standards and
          Florida law. The report also accounts for factors such as location, the vehicle’s
          age, mileage, and class, ensuring a comprehensive and accurate valuation.
        </Text>
      </View>
    </View>

    {/* Footer */}
    <View style={styles.footer}>
      <View style={styles.footerLayer}>
        <View style={styles.footerRightOverlayWhiteLeft} />
        <View style={styles.footerRightOverlay} />
        <View style={styles.footerItem}>
          <Text></Text>
          <Text style={styles.footerText}>(202)-455-8110</Text>
        </View>
        <View style={styles.footerItem}>
          <Text></Text>
          <Text style={styles.footerText}>office@prime-lawgroup.com</Text>
        </View>
        <View style={styles.footerItem}>
          <Text></Text>
          <Text style={styles.footerText}>www.prime-lawgroup.com</Text>
        </View>
      </View>
    </View>
  </Page>

  {/* === PAGE 3 === */}
  <Page size="A4" style={styles.page}>
    <BackgroundLogo />

    {/* Header */}
    <View style={styles.header}>
      <View>
        <Image src={logo1.src} style={{ width: "auto", height: "60px" }} />
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.address}>{data.address}</Text>
        <Text style={styles.licenseInfo}>{data.licenseInfo}</Text>
      </View>
    </View>

    {/* Body */}
    <View style={styles.body}>
      <View style={styles.section}>
        <Text style={styles.dynamicRed}>Demand for Compensation</Text>
        <Text>
          Based on the Diminished Value Analysis Report and supporting documentation, we
          hereby demand compensation in the amount of <Text style={styles.dynamicRed}>${formatPrice(item?.estimated_diminished_value)}</Text> for the
          diminished value of my client’s vehicle. This amount represents the economic
          loss sustained due to the accident caused by your insured’s negligence.
          Additionally, we reserve the right to seek compensation for any related losses,
          such as towing, storage, or loss of use, should further evidence support such
          claims.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.dynamicRed}>Supporting Documentation</Text>
        <Text>
          Enclosed with this demand letter are the following documents to substantiate the
          claim:
        </Text>
        <Text>{"\n"}• <Text style={styles.dynamicRed}>Exhibit A:</Text> Diminished Value Appraisal Report and Verifiable Comparables (Comps) of Similar Vehicles</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.dynamicRed}>Request for Prompt Response</Text>
        <Text>
          Please review this demand and the enclosed documentation promptly. We request a
          response within 14 days from the date of this letter.{"\n\n"}
          To facilitate a timely resolution, please contact me at
          office@prime-lawgroup.com to discuss this claim. All communications should be
          directed to my office to ensure compliance with Florida’s ethical standards for
          attorney-client representation (Rule 4-4.2, Florida Rules of Professional
          Conduct). We look forward to a fair and reasonable settlement to resolve this
          matter amicably.
        </Text>
      </View>

      <Text>{"\n\n"}Sincerely,{"\n"}Licensed in FL, MA, CA, CO & D.C.{"\n"}1100 15th St NW{"\n"}Washington, D.C. 20005</Text>
    </View>

    {/* Footer */}
    <View style={styles.footer}>
      <View style={styles.footerLayer}>
        <View style={styles.footerRightOverlayWhiteLeft} />
        <View style={styles.footerRightOverlay} />
        <View style={styles.footerItem}>
          <Text></Text>
          <Text style={styles.footerText}>(202)-455-8110</Text>
        </View>
        <View style={styles.footerItem}>
          <Text></Text>
          <Text style={styles.footerText}>office@prime-lawgroup.com</Text>
        </View>
        <View style={styles.footerItem}>
          <Text></Text>
          <Text style={styles.footerText}>www.prime-lawgroup.com</Text>
        </View>
      </View>
    </View>
  </Page>
    </Document>
  );
};

export default CreateDemandLetterPdf;
