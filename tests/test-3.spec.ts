import { test, expect } from '@playwright/test';

test.describe('Facebook Registration Form', () => {
  test('should successfully fill out the registration form with valid user data', async ({ page }) => {
    // Navigate to Facebook registration page
    await page.goto('https://www.facebook.com/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Click on "Create new account" button to open registration form
    await page.click('text=Create new account');
    
    // Wait for registration form to appear
    await page.waitForSelector('input[name="firstname"]', { timeout: 10000 });
    
    // Fill in first name
    await page.getByRole('textbox', { name: 'First name' }).fill('Rushi');
    
    // Fill in surname
    await page.getByRole('textbox', { name: 'Surname' }).fill('Lakkam');
    
    // Select date of birth
    await page.getByLabel('Day').selectOption('20');
    await page.getByLabel('Month').selectOption('1');
    await page.getByLabel('Year').selectOption('1988');
    
    // Select gender
    await page.getByRole('radio', { name: 'Male', exact: true }).check();
    
    // Fill in mobile number
    await page.getByRole('textbox', { name: 'Mobile number or email address' }).fill('9985291256');
    
    // Fill in password
    await page.getByRole('textbox', { name: 'New password' }).fill('Rushi@293');
    
    // Submit the form
    await page.getByRole('button', { name: 'Sign Up' }).click();
    
    // Wait for form submission or error handling
    await page.waitForTimeout(2000);
  });
});
