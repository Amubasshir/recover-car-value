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
                      dateOfAccident: formData.dateOfAccident
                    }}
                  />
                }
                fileName="diminished-value-claim.pdf"
              >
                {({ loading }) => (
                  <Button disabled={loading} style={{backgroundColor:"blue"}}>
                    {loading ? 'Generating PDF...' : 'Demand Letter'}
                  </Button>
                )}
              </PDFDownloadLink>
    </>
  );
};

export default DiminishedValueClaimForm;

