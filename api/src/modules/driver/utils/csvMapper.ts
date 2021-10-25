import { noopString, strToNumber } from 'lib/utils';

export const formatMapper = {
  id: strToNumber,
  name: noopString,
  lastName: noopString,
  vehicleBrand: noopString,
  vehicleRegistrationNumber: noopString,
  vehicleYear: strToNumber,
  taxPayerNumber: noopString,
  status: noopString,
};
