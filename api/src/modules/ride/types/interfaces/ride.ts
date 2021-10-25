interface IRide {
  id: string;
  driverId: number;
  passengerId: number;
  serviceType: string;
  date: string | Date;
  fare: number;
  serviceFee: number;
  amount: number;
  currencyCode: string;
  currencySymbol: string;
  dropoffTime: string | Date;
  dropoffAddress: string;
  pickupTime: string | Date;
  pickupAddress: string;
  tenancy: string;
  status: string;
}
