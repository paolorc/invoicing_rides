import { registerAs } from '@nestjs/config';

const FALLBACK_HOST = process.env.DB_HOST || '127.0.0.1';
const FALLBACK_PORT = process.env.DB_PORT || 3309;
const FALLBACK_USERNAME = process.env.DB_USER || 'root';
const FALLBACK_PASSWORD = process.env.DB_PASSWORD || 'toor';
const FALLBACK_DATABASE = process.env.DB_NAME || 'invo_passenger';
const FALLBACK_RUN_MIGRATIONS = Boolean(process.env.DB_RUN_MIGRATIONS) || true;

export default registerAs('mariadb', () => ({
  host: FALLBACK_HOST,
  port: FALLBACK_PORT,
  username: FALLBACK_USERNAME,
  password: FALLBACK_PASSWORD,
  database: FALLBACK_DATABASE,
  migrationsRun: FALLBACK_RUN_MIGRATIONS,
}));
