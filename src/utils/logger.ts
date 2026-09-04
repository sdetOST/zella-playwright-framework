/**
 * Structured logger for Page Objects and Test Fixtures
 */
export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private format(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}`;
  }

  info(message: string): void {
    console.log(this.format('INFO', message));
  }

  warn(message: string): void {
    console.warn(this.format('WARN', message));
  }

  error(message: string, error?: unknown): void {
    console.error(this.format('ERROR', message), error || '');
  }

  step(stepName: string): void {
    console.log(`\n  👉 STEP: [${this.context}] ${stepName}`);
  }
}

export const createLogger = (context: string) => new Logger(context);
