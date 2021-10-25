import { noopString, strToNumber } from 'lib/utils';

export const formatMapper = {
  id: noopString,
  driverId: strToNumber,
  passengerId: strToNumber,
  serviceType: noopString,
  date: noopString,
  fare: strToNumber,
  serviceFee: strToNumber,
  amount: strToNumber,
  currencyCode: noopString,
  currencySymbol: noopString,
  dropoffTime: noopString,
  dropoffAddress: noopString,
  pickupTime: noopString,
  pickupAddress: noopString,
  tenancy: noopString,
  status: noopString,
};
