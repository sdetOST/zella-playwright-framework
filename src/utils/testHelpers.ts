/**
 * Common test helper functions
 */
export class TestHelpers {
  /**
   * Generates a unique timestamped test email to prevent deduplication collisions
   */
  static generateRandomEmail(prefix = 'testuser'): string {
    const timestamp = Date.now();
    return `${prefix}+${timestamp}@example.com`;
  }

  /**
   * Generates a valid US dummy phone number
   */
  static generateRandomPhone(): string {
    const area = Math.floor(200 + Math.random() * 800);
    const prefix = Math.floor(200 + Math.random() * 800);
    const line = Math.floor(1000 + Math.random() * 9000);
    return `${area}-${prefix}-${line}`;
  }

  /**
   * Generates random text with a specific prefix
   */
  static generateRandomText(prefix = 'AutoTest'): string {
    return `${prefix}_${Math.random().toString(36).substring(2, 8)}`;
  }
}
