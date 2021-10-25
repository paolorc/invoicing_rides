import { registerAs } from '@nestjs/config';

const FALLBACK_DRIVERS =
  process.env.CSV_DRIVERS_PATH || 'test-data/drivers.csv';
const FALLBACK_PASSENGERS =
  process.env.CSV_PASSENGERS_PATH || 'test-data/passengers.csv';
const FALLBACK_RIDES = process.env.CSV_RIDES_PATH || 'test-data/rides.csv';

export default registerAs('csv', () => ({
  drivers_path: FALLBACK_DRIVERS,
  passengers_path: FALLBACK_PASSENGERS,
  rides_path: FALLBACK_RIDES,
}));
