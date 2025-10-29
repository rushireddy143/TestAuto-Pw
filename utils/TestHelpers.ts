import { Page } from '@playwright/test';

export class TestHelpers {
  /**
   * Generate random string
   */
  static generateRandomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static generateRandomEmail(): string {
    const randomString = this.generateRandomString(8);
    return `test.${randomString}@example.com`;
  }

  /**
   * Format current date
   */
  static getCurrentDate(format: 'ISO' | 'readable' = 'ISO'): string {
    const now = new Date();
    if (format === 'ISO') {
      return now.toISOString().split('T')[0];
    }
    return now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Wait for specific condition
   */
  static async waitForCondition(
    condition: () => Promise<boolean>,
    timeout: number = 30000,
    interval: number = 1000
  ): Promise<boolean> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    
    return false;
  }

  /**
   * Retry function execution
   */
  static async retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }

  /**
   * Generate test data
   */
  static generateTestUser() {
    return {
      firstName: 'Test',
      lastName: 'User',
      email: this.generateRandomEmail(),
      username: `testuser_${this.generateRandomString(6)}`,
      password: 'TestPassword123!',
      phone: '+1234567890'
    };
  }

  /**
   * Clean up test data or files
   */
  static async cleanup(cleanupFunctions: Array<() => Promise<void>>): Promise<void> {
    for (const cleanupFn of cleanupFunctions) {
      try {
        await cleanupFn();
      } catch (error) {
        console.warn('Cleanup function failed:', error);
      }
    }
  }
}