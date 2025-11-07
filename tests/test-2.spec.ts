import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
   await page.goto('https://www.facebook.com/r.php'); 
   await page.getByRole('textbox', { name: 'First name' }).click();
   await page.getByRole('textbox', { name: 'First name' }).fill('Rushi');
   await page.getByRole('textbox', { name: 'First name' }).press('Tab');
   await page.getByRole('textbox', { name: 'Surname' }).fill('Lakkam');
   await page.getByRole('textbox', { name: 'Surname' }).press('Tab');
   await page.locator('#birthday-help').press('Tab');
   await page.getByLabel('Day').selectOption('10');
   await page.getByLabel('Month').selectOption('7');
   await page.getByLabel('Year').selectOption('2017');
   await page.getByRole('radio', { name: 'Male', exact: true }).check();
   await page.getByRole('textbox', { name: 'Mobile number or email address' }).click();
   await page.getByRole('textbox', { name: 'Mobile number or email address' }).fill('95291256');
   await page.getByRole('textbox', { name: 'New password' }).click();
   await page.getByRole('textbox', { name: 'New password' }).fill('Rushi@293');
   await page.getByText('First nameWhat\'s your name?SurnameWhat\'s your name?Date of').click(); 
});