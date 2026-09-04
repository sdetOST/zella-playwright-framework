import * as path from 'path';
import * as dotenv from 'dotenv';

// Determine environment file (default to .env.qa or .env)
const envFileName = process.env.ENV_FILE || '.env.qa';
const envPath = path.resolve(__dirname, '../../', envFileName);
dotenv.config({ path: envPath });

// Also load fallback .env if present
dotenv.config();

export type SupportedBrowser = 'chromium' | 'firefox' | 'webkit' | 'all';

export interface EnvironmentConfig {
  baseUrl: string;
  password: string;
  browserName: SupportedBrowser;
  headless: boolean;
  timeout: number;
  navigationTimeout: number;
  retries: number;
  workers: number | undefined;
}

export const config: EnvironmentConfig = {
  baseUrl: process.env.ZELLA_QA_URL || 'https://zellablinds.com/',
  password: process.env.ZELLA_PASSWORD || '',
  browserName: (process.env.BROWSER as SupportedBrowser) || 'chromium',
  headless: process.env.HEADLESS !== 'false',
  timeout: Number(process.env.DEFAULT_TIMEOUT) || 30000,
  navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 30000,
  retries: process.env.CI ? 2 : Number(process.env.RETRIES) || 0,
  workers: process.env.CI ? 2 : process.env.WORKERS ? Number(process.env.WORKERS) : undefined,
};

export default config;
