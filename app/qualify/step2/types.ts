interface VehicleData {
  licensePlate: string;
  state: string;
  make: string;
  model: string;
  year: string;
  trim: string;
}

interface LoadingState {
  years: boolean;
  makes: boolean;
  models: boolean;
  trims: boolean;
}
