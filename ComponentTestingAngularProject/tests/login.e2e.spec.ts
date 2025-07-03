/* create playwright test for login component */
import { test, expect } from '@playwright/test';

test.describe('Login Component E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/login');
    });
    
    test('should display login form', async ({ page }) => {
        await expect(page.locator('form')).toBeVisible();
        await expect(page.locator('input[formControlName="email"]')).toBeVisible();
        await expect(page.locator('input[formControlName="password"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });
    
    /*     * Test for successful login
     */
    test('should login successfully with valid credentials', async ({ page }) => {
        await page.fill('input[formControlName="email"]', 'test@example.com');
        await page.fill('input[formControlName="password"]', 'password123');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('http://localhost:4200/dashboard');
        await expect(page.locator('p')).toContainText('Welcome to the Dashboard');
    });
    /*     * Test for unsuccessful login
     */
    test('should show error message on invalid credentials', async ({ page }) => {
        await page.fill('input[formControlName="email"]', 'invalid@example.com');
        await page.fill('input[formControlName="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');
        await expect(page.locator('.error')).toBeVisible();
        await expect(page.locator('.error')).toContainText('Invalid email or password');
    }
    );
});