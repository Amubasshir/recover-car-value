export interface CarListing {
  dateListed: string;
  vin: string;
  year: number;
  makeModelTrim: string;
  mileage: number;
  zipcode: string;
  price: number;
  status: string;
}

export interface Report {
  preAccidentListings: CarListing[];
  postAccidentListings: CarListing[];
  fairMarketValueNoAccident: number;
  fairMarketValueWithAccident: number;
  calculatedDiminishedValue: number;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  vehicleInfo: string;
  accidentDate: string;
  reportDate: string;
  backgroundImage?: string;
}