export const revalidate = 0;


// DiminishedValueClaimForm.jsx
import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, Image } from '@react-pdf/renderer';
import * as Slot from '@radix-ui/react-slot';
import logo1 from '../public/images/logo-full-wp.jpg'
import logo2 from '../public/images/logo-wp.jpg'
import CreateDemandLetterPdf from './CreateDemandLetterPdf';
import { Button } from './ui/button';

// Custom Button Component using Radix UI Slot


const DemandLetterPdf = ({item}) => {
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


  useEffect(() => {
    if(item) {
        setFormData({
            clientFullName: item?.client_info?.name,
    insuredName: item?.client_info?.insuredName,
    claimNumber: item?.client_info?.claimNumber,
    dateOfLoss: item?.accident_date,
    vehicle: item?.heading,
    dateOfAccident: item?.accident_date,
    insuranceCompanyName: item?.client_info?.insuranceCompanyName,
    insuranceCompanyAddress: item?.client_info?.insuranceCompanyAddress,
        })
    }
  }, [item]);

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

  console.log("i am",item?.year + ', ' + item?.make + ', ' + item?.model)
  return (
    <>
            
              
              <PDFDownloadLink
                document={
                  <CreateDemandLetterPdf
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
                      dateOfAccident: formData.dateOfAccident,
                      vehicleYMM: item?.year + ', ' + item?.make + ', ' + item?.model,
                    }}
                    item={item}
                  />
                }
                fileName="diminished-value-claim.pdf"
              >
                {({ loading }) => (
                  <Button disabled={loading} style={{backgroundColor:"blue"}} className='rounded-md'>
                    {loading ? 'Generating PDF...' : 'Demand Letter PDF'}
                  </Button>
                )}
              </PDFDownloadLink>
    </>
  );
};

export default DemandLetterPdf;

