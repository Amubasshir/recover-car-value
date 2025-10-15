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
  Image
} from '@react-pdf/renderer';

import logo1 from '../public/images/logo-full-wp.jpg'
import logo2 from '../public/images/logo-wp.jpg'

// Register fonts (you'll need to provide font files or use default)
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZg.ttf',
      fontWeight: 'bold',
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Inter',
    position: 'relative',
  },
  backgroundLogo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0.05,
    width: 300,
    height: 300,
  },
//   header: {
//     marginBottom: 30,
//   },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'flex-start',
  },
    headerRight: {
    textAlign: 'right',
    fontSize: 10,
  },
  address: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
    lineHeight: 1.4,
  },
  licenseInfo: {
    fontSize: 9,
    color: '#000000', // red-600
    marginBottom: 20,
    fontWeight: 'bold',
  },
  insuranceCompany: {
    fontSize: 11,
    color: '#1f2937',
    marginBottom: 5,
  },
  subject: {
    fontSize: 12,
    // color: '#000000', // red-600
    fontWeight: 'bold',
    marginBottom: 25,
    // textTransform: 'uppercase',
  },
  body: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#374151',
  },
  dynamicRed: {
    color: '#000000', // red-600
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
    footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F59E0B',
    padding: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 9,
    color: '#FFFFFF',
  },
  footerText: {
    marginLeft: 5,
  },
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
    flexDirection: 'row',
    marginBottom: 4,
  },
  claimLabel: {
    // width: 120,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
  },
  claimValue: {
    fontSize: 10,
    color: '#000000',
    fontWeight: 'bold',
    flex: 1,
  },
});

// Background Logo Component (you can replace with your actual logo)
const BackgroundLogo = () => (
  <View style={styles.backgroundLogo}>
    <Image style={{ fontSize: 80, textAlign: 'center', color: '#000000', opacity: 0.1 }} src={logo2.src} />
    {/* <Image
              src={bottomListChartImage}
              style={{ width: '100%', height: 'auto' }}
            /> */}
  </View>
);

const CreateDemandLetterPdf = ({ 
  clientData = {},
  insuranceData = {},
  claimData = {} 
}) => {
  // Default data structure
  const data = {
    address: "1100 15th St NW\nWashington, D.C. 20005",
    licenseInfo: "Licensed in FL, MA, CA, CO & D.C.",
    insuranceCompanyName: insuranceData.name || "(Insurance Company Name)",
    insuranceCompanyAddress: insuranceData.address || "(Insurance Company Address)",
    clientName: clientData.fullName || "(Client's Full Name)",
    insuredName: claimData.insuredName || "(At-Fault Driver's Full Name)",
    claimNumber: claimData.claimNumber || "(Insurance Claim Number)",
    dateOfLoss: claimData.dateOfLoss || "(Date of Accident)",
    vehicle: claimData.vehicleYMM || "(Vehicle Year, Make, Model)",
    dateOfAccident: claimData.dateOfAccident || "(Date of Accident)",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Background Logo */}
        <BackgroundLogo />
        
        {/* Header */}
        <View style={styles.header}>
                    <View>
                        <Image
                        src={logo1.src}
                        style={{ width: 'auto', height: '60px' }}
                        />
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

          <Text style={styles.insuranceCompany}>{data.insuranceCompanyName}</Text>
          <Text style={styles.insuranceCompany}>{data.insuranceCompanyAddress}</Text>
          
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
            <Text style={styles.claimValue}>{data.dateOfLoss}</Text>
          </View>
          <View style={styles.claimField}>
            <Text style={styles.claimLabel}>Vehicle:</Text>
            <Text style={styles.claimValue}>{data.vehicle}</Text>
          </View>
        </View>

        {/* Body Content */}
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Dear Claims Department,</Text>
          
          <View style={styles.section}>
            <Text>
              I represent <Text style={styles.dynamicRed}>{data.clientName}</Text> in connection with a property damage claim arising from a motor vehicle accident on <Text style={styles.dynamicRed}>{data.dateOfAccident}</Text>, caused by your insured. This letter serves as a formal demand for compensation for the diminished value of my client's vehicle, pursuant to Florida Statute § 626.9743, which holds the at-fault driver's insurance company accountable for restoring a vehicle to its pre-accident function, appearance, and value, including compensation for any loss in market value due to the accident.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Background of the Claim</Text>
            <Text>
              On <Text style={styles.dynamicRed}>{data.dateOfAccident}</Text>, my client's vehicle, a <Text style={styles.dynamicRed}>{data.vehicleYMM}</Text>, was involved in a collision caused by the negligence of your insured. The accident resulted in significant damage to my client's vehicle, requiring repairs, restoring the vehicle's functionality and appearance. However, despite these repairs, the vehicle's market value has been substantially reduced due to its accident history, as prospective buyers are unwilling to pay the same price for a vehicle with a documented collision record.
            </Text>
          </View>
        </View>

        {/* Footer */}
        {/* <View style={styles.footer}>
          <Text style={styles.footerText}>
            DIMINISHED VALUE CLAIM • FORMAL DEMAND • LEGAL NOTICE
          </Text>
        </View> */}
        
      <View style={styles.footer}>
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
      </View>
      </Page>
    </Document>
  );
};

export default CreateDemandLetterPdf;