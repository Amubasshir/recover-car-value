// 'user client';


// import React, { useState } from 'react';
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
//   Image,
// } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Helvetica',
//     fontSize: 11,
//     lineHeight: 1.6,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 40,
//     alignItems: 'flex-start',
//   },
//   logo: {
//     width: 180,
//     height: 60,
//   },
//   headerRight: {
//     textAlign: 'right',
//     fontSize: 10,
//   },
//   addressLine: {
//     marginBottom: 2,
//   },
//   recipient: {
//     marginTop: 60,
//     marginBottom: 20,
//     color: '#DC2626',
//   },
//   subject: {
//     marginTop: 15,
//     marginBottom: 20,
//     fontFamily: 'Helvetica-Bold',
//   },
//   claimInfo: {
//     marginBottom: 15,
//     lineHeight: 1.8,
//   },
//   claimInfoLine: {
//     marginBottom: 0.5,
//   },
//   redText: {
//     color: '#DC2626',
//   },
//   greeting: {
//     marginTop: 20,
//     marginBottom: 15,
//   },
//   paragraph: {
//     marginBottom: 12,
//     textAlign: 'justify',
//   },
//   sectionTitle: {
//     fontFamily: 'Helvetica-Bold',
//     marginTop: 20,
//     marginBottom: 12,
//     fontSize: 12,
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 20,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#F59E0B',
//     padding: 12,
//   },
//   footerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     fontSize: 9,
//     color: '#FFFFFF',
//   },
//   footerText: {
//     marginLeft: 5,
//   },
// });

// const DiminishedValuePDF = ({ formData }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.header}>
//         <View>
//           <Text style={{ fontSize: 28, fontFamily: 'Helvetica-Bold', color: '#F59E0B', marginBottom: 2 }}>
//             PRIME
//           </Text>
//           <Text style={{ fontSize: 10, color: '#F59E0B', letterSpacing: 1 }}>
//             COUNSEL LAW GROUP LLC
//           </Text>
//         </View>
//         <View style={styles.headerRight}>
//           <Text style={styles.addressLine}>1100 15th St NW</Text>
//           <Text style={styles.addressLine}>Washington, D.C. 20005</Text>
//           <Text style={styles.addressLine}>Licensed in FL, MA, CA, CO & D.C.</Text>
//         </View>
//       </View>

//       <View style={styles.recipient}>
//         <Text>{formData.insuranceCompanyName || '(Insurance Company Name)'}</Text>
//         <Text>{formData.insuranceCompanyAddress || '(Insurance Company Address)'}</Text>
//       </View>

//       <View style={styles.subject}>
//         <Text>Re: Diminished Value Claim Claimant:</Text>
//       </View>

//       <View style={styles.claimInfo}>
//         <View style={styles.claimInfoLine}>
//           <Text>
//             <Text style={styles.redText}>{formData.clientName || "(Client's Full Name)"}</Text>
//           </Text>
//         </View>
//         <View style={styles.claimInfoLine}>
//           <Text>
//             Insured: <Text style={styles.redText}>{formData.atFaultDriverName || "(At-Fault Driver's Full Name)"}</Text>
//           </Text>
//         </View>
//         <View style={styles.claimInfoLine}>
//           <Text>
//             Claim Number: <Text style={styles.redText}>{formData.claimNumber || '(Insurance Claim Number)'}</Text>
//           </Text>
//         </View>
//         <View style={styles.claimInfoLine}>
//           <Text>
//             Date of Loss: <Text style={styles.redText}>{formData.dateOfAccident || '(Date of Accident)'}</Text>
//           </Text>
//         </View>
//         <View style={styles.claimInfoLine}>
//           <Text>
//             Vehicle: <Text style={styles.redText}>{formData.vehicleInfo || '(Vehicle Year, Make, Model)'}</Text>
//           </Text>
//         </View>
//       </View>

//       <Text style={styles.greeting}>Dear Claims Department,</Text>

//       <Text style={styles.paragraph}>
//         I represent <Text style={styles.redText}>{formData.clientName || "(Client's Full Name)"}</Text> in connection with a property damage claim arising from a motor vehicle accident on <Text style={styles.redText}>{formData.dateOfAccident || '(Date of Accident)'}</Text>, caused by your insured. This letter serves as a formal demand for compensation for the diminished value of my client's vehicle, pursuant to Florida Statute § 626.9743, which holds the at-fault driver's insurance company accountable for restoring a vehicle to its pre-accident function, appearance, and value, including compensation for any loss in market value due to the accident.
//       </Text>

//       <Text style={styles.sectionTitle}>Background of the Claim</Text>

//       <Text style={styles.paragraph}>
//         On <Text style={styles.redText}>{formData.dateOfAccident || '(Date of Accident)'}</Text>, my client's vehicle, a <Text style={styles.redText}>{formData.vehicleInfo || '(Vehicle Year, Make, Model)'}</Text>, was involved in a collision caused by the negligence of your insured. The accident resulted in significant damage to my client's vehicle, requiring repairs, restoring the vehicle's functionality and appearance. However, despite these repairs, the vehicle's market value has been substantially reduced due to its accident history, as prospective buyers are unwilling to pay the same price for a vehicle with a documented collision record.
//       </Text>

//       <View style={styles.footer}>
//         <View style={styles.footerItem}>
//           <Text>📞</Text>
//           <Text style={styles.footerText}>(202)-455-8110</Text>
//         </View>
//         <View style={styles.footerItem}>
//           <Text>✉</Text>
//           <Text style={styles.footerText}>office@prime-lawgroup.com</Text>
//         </View>
//         <View style={styles.footerItem}>
//           <Text>🌐</Text>
//           <Text style={styles.footerText}>www.prime-lawgroup.com</Text>
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// export default function DemandLetterPdf() {
//   const [formData, setFormData] = useState({
//     insuranceCompanyName: '',
//     insuranceCompanyAddress: '',
//     clientName: '',
//     atFaultDriverName: '',
//     claimNumber: '',
//     dateOfAccident: '',
//     vehicleInfo: '',
//   });

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <div className="w-96 bg-white shadow-lg p-6 overflow-y-auto">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Diminished Value Claim</h1>
//           <p className="text-sm text-gray-600">Fill in the dynamic fields</p>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Insurance Company Name
//             </label>
//             <input
//               type="text"
//               value={formData.insuranceCompanyName}
//               onChange={(e) => handleInputChange('insuranceCompanyName', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Enter company name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Insurance Company Address
//             </label>
//             <textarea
//               value={formData.insuranceCompanyAddress}
//               onChange={(e) => handleInputChange('insuranceCompanyAddress', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Enter address"
//               rows="2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Client's Full Name
//             </label>
//             <input
//               type="text"
//               value={formData.clientName}
//               onChange={(e) => handleInputChange('clientName', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Enter client name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               At-Fault Driver's Full Name
//             </label>
//             <input
//               type="text"
//               value={formData.atFaultDriverName}
//               onChange={(e) => handleInputChange('atFaultDriverName', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Enter driver name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Insurance Claim Number
//             </label>
//             <input
//               type="text"
//               value={formData.claimNumber}
//               onChange={(e) => handleInputChange('claimNumber', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Enter claim number"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Date of Accident
//             </label>
//             <input
//               type="date"
//               value={formData.dateOfAccident}
//               onChange={(e) => handleInputChange('dateOfAccident', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Vehicle (Year, Make, Model)
//             </label>
//             <input
//               type="text"
//               value={formData.vehicleInfo}
//               onChange={(e) => handleInputChange('vehicleInfo', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="e.g., 2020 Honda Accord"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex-1">
//         <PDFViewer style={{ width: '100%', height: '100%' }}>
//           <DiminishedValuePDF formData={formData} />
//         </PDFViewer>
//       </div>
//     </div>
//   );
// }


// DiminishedValueClaimForm.jsx
import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, Image } from '@react-pdf/renderer';
import DiminishedValueClaimTemplate from './DiminishedValueClaimTemplate';
import * as Slot from '@radix-ui/react-slot';
import logo1 from '../public/images/logo-full-wp.jpg'
import logo2 from '../public/images/logo-wp.jpg'

// Custom Button Component using Radix UI Slot
const Button = React.forwardRef(({ asChild, children, ...props }, ref) => {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      ref={ref}
      className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
      {...props}
    >
      {children}
    </Comp>
  );
});

const DiminishedValueClaimForm = ({currentFormData, vehicleData, qualifiedAnswers, selectedMethod}) => {
  const [formData, setFormData] = useState({
    clientFullName: '',
    insuredName: '',
    claimNumber: '',
    dateOfLoss: '',
    vehicle: '',
    dateOfAccident: '',
    insuranceCompanyName: '',
    insuranceCompanyAddress: '',
  });


    console.log({currentFormData, vehicleData, qualifiedAnswers, selectedMethod})
  useEffect(() => {
    if(currentFormData && vehicleData && qualifiedAnswers && selectedMethod) {
        setFormData({
            clientFullName: currentFormData?.firstName + " " + currentFormData?.lastName,
    insuredName: currentFormData?.atFaultName,
    claimNumber: currentFormData?.repairClaimNumber,
    dateOfLoss: currentFormData?.accidentDate,
    vehicle: vehicleData?.trim,
    dateOfAccident: currentFormData?.accidentDate,
    insuranceCompanyName: currentFormData?.atFaultInsurance,
    insuranceCompanyAddress: currentFormData?.faultInsuranceAddress,
        })
    }
    // if(Object.keys(data).length > 0) {
    //     setFormData({...data})
    // }
  }, [currentFormData, vehicleData, qualifiedAnswers, selectedMethod]);

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const fields = [
    { label: "Client's Full Name", key: 'clientFullName' },
    { label: "At-Fault Driver's Full Name", key: 'insuredName' },
    { label: "Insurance Claim Number", key: 'claimNumber' },
    { label: "Date of Loss", key: 'dateOfLoss', type: 'date' },
    { label: "Vehicle (Year, Make, Model)", key: 'vehicle' },
    { label: "Date of Accident", key: 'dateOfAccident', type: 'date' },
    { label: "Insurance Company Name", key: 'insuranceCompanyName' },
    { label: "Insurance Company Address", key: 'insuranceCompanyAddress' },
  ];

  return (
    <div className="">
    {/* Action Buttons */}
          <div className="">
            <div className="flex justify-end space-x-4">
            
              
              <PDFDownloadLink
                document={
                  <DiminishedValueClaimTemplate
                    clientData={{ fullName: formData.clientFullName }}
                    insuranceData={{
                      name: formData.insuranceCompanyName,
                      address: formData.insuranceCompanyAddress
                    }}
                    claimData={{
                      insuredName: formData.insuredName,
                      claimNumber: formData.claimNumber,
                      dateOfLoss: formData.dateOfLoss,
                      vehicle: formData.vehicle,
                      dateOfAccident: formData.dateOfAccident
                    }}
                  />
                }
                fileName="diminished-value-claim.pdf"
              >
                {({ loading }) => (
                  <Button disabled={loading}>
                    {loading ? 'Generating PDF...' : 'Demand Letter'}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
    </div>
  );
};

export default DiminishedValueClaimForm;


// DiminishedValueClaimTemplate.jsx
// import React from 'react';
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

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
    color: '#dc2626', // red-600
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
    // color: '#dc2626', // red-600
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
    color: '#dc2626', // red-600
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
    // borderLeftColor: '#dc2626',
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
    color: '#dc2626',
    fontWeight: 'bold',
    flex: 1,
  },
});

// Background Logo Component (you can replace with your actual logo)
const BackgroundLogo = () => (
  <View style={styles.backgroundLogo}>
    <Image style={{ fontSize: 80, textAlign: 'center', color: '#dc2626', opacity: 0.1 }} src={logo2.src} />
    {/* <Image
              src={bottomListChartImage}
              style={{ width: '100%', height: 'auto' }}
            /> */}
  </View>
);

const DiminishedValueClaimTemplate = ({ 
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
    vehicle: claimData.vehicle || "(Vehicle Year, Make, Model)",
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
              On <Text style={styles.dynamicRed}>{data.dateOfAccident}</Text>, my client's vehicle, a <Text style={styles.dynamicRed}>{data.vehicle}</Text>, was involved in a collision caused by the negligence of your insured. The accident resulted in significant damage to my client's vehicle, requiring repairs, restoring the vehicle's functionality and appearance. However, despite these repairs, the vehicle's market value has been substantially reduced due to its accident history, as prospective buyers are unwilling to pay the same price for a vehicle with a documented collision record.
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

// export default DiminishedValueClaimTemplate;