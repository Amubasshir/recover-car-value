import { Report } from '../types/report';

export const sampleReport: Report = {
  preAccidentListings: [
    { dateListed: "April 27, 2025", vin: "1HGCV1F54MA001111", year: 2021, makeModelTrim: "Honda Accord EX-L", mileage: 28000, zipcode: "75201", price: 27800, status: "Clean" },
    { dateListed: "April 27, 2025", vin: "1HGCV1F54MA002222", year: 2021, makeModelTrim: "Honda Accord EX-L", mileage: 30500, zipcode: "78701", price: 28200, status: "Clean" },
    { dateListed: "April 27, 2025", vin: "1HGCV1F54MA003333", year: 2021, makeModelTrim: "Honda Accord EX-L", mileage: 27800, zipcode: "77002", price: 28400, status: "Clean" },
    { dateListed: "April 27, 2025", vin: "1HGCV1F54MA004444", year: 2021, makeModelTrim: "Honda Accord EX-L", mileage: 29200, zipcode: "78205", price: 27900, status: "Clean" },
    { dateListed: "April 27, 2025", vin: "1HGCV1F54MA005555", year: 2021, makeModelTrim: "Honda Accord EX-L", mileage: 28100, zipcode: "76102", price: 28100, status: "Clean" }
  ],
  postAccidentListings: [
    { dateListed: "April 27, 2025", vin: "1HGCV1F54MA001111", year: 2021, makeModelTrim: "Honda Accord EX-L", mileage: 28000, zipcode: "75201", price: 24300, status: "Damaged" },
    { dateListed: "April 27, 2025", vin: "1HGCV1F54MA002222", year: 2021, makeModelTrim: "Honda Accord EX-L", mileage: 30500, zipcode: "78701", price: 24800, status: "Damaged" },
    { dateListed: "April 27, 2025", vin: "1HGCV1F54MA003333", year: 2021, makeModelTrim: "Honda Accord EX-L", mileage: 27800, zipcode: "77002", price: 24300, status: "Damaged" },
    { dateListed: "April 27, 2025", vin: "1HGCV1F54MA004444", year: 2021, makeModelTrim: "Honda Accord EX-L", mileage: 29200, zipcode: "78205", price: 24700, status: "Damaged" },
    { dateListed: "April 27, 2025", vin: "1HGCV1F54MA005555", year: 2021, makeModelTrim: "Honda Accord EX-L", mileage: 28100, zipcode: "76102", price: 24600, status: "Damaged" }
  ],
  fairMarketValueNoAccident: 28000.00,
  fairMarketValueWithAccident: 24500.00,
  calculatedDiminishedValue: 3500.00,
  clientName: "John Doe",
  clientPhone: "(123) 456-7890",
  clientEmail: "johndoe@email.com",
  vehicleInfo: "2021 Honda Accord EX-L",
  accidentDate: "March 13, 2025",
  reportDate: "April 27, 2025",
  backgroundImage: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
}