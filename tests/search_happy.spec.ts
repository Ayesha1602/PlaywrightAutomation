// spec: specs/dummy_booking_test_plan.md
// seed: tests/seed.spec.ts

import { test, expect, Page, Locator } from '@playwright/test';

class HomePage {
  readonly page: Page;
  readonly fromCity: Locator;
  readonly destCity: Locator;
  readonly departDate: Locator;
  readonly returnDate: Locator;
  readonly passengerSelect: Locator;
  readonly billingName: Locator;
  readonly billingEmail: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromCity = page.locator('#fromcity');
    this.destCity = page.locator('#destcity');
    this.departDate = page.locator('#departdate');
    this.returnDate = page.locator('#returndate');
    this.passengerSelect = page.locator('#admorepass');
    this.billingName = page.locator('#billing_name');
    this.billingEmail = page.locator('#billing_email');
  }

  async goto() {
    await this.page.goto('https://sqatools.in/dummy-booking-website/');
    await expect(this.page.getByText('Dummy ticket websites provide different web elements to do the automation')).toBeVisible();
  }

  async fillRoute(from: string, to: string) {
    await expect(this.fromCity).toBeVisible();
    await this.fromCity.fill(from);
    await expect(this.destCity).toBeVisible();
    await this.destCity.fill(to);
  }

  async selectDates(checkIn: string, checkOut: string) {
    await expect(this.departDate).toBeVisible();
    await this.departDate.fill(checkIn);
    await expect(this.returnDate).toBeVisible();
    await this.returnDate.fill(checkOut);
  }

  async setPassengers(optionValue = '1') {
    await expect(this.passengerSelect).toBeVisible();
    await this.passengerSelect.selectOption({ value: optionValue });
  }

  async fillBilling(name: string, email: string) {
    await expect(this.billingName).toBeVisible();
    await this.billingName.fill(name);
    await expect(this.billingEmail).toBeVisible();
    await this.billingEmail.fill(email);
  }
}

test.describe('Dummy Booking Tests', () => {
  test('Search — Happy Path (Find available stays)', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // Fill route
    await home.fillRoute('Mumbai', 'Delhi');

    // Pick dates (ISO format YYYY-MM-DD)
    const today = new Date();
    const addDays = (d: Date, days: number) => {
      const c = new Date(d);
      c.setDate(d.getDate() + days);
      return c.toISOString().split('T')[0];
    };
    const depart = addDays(today, 7);
    const ret = addDays(today, 10);

    await home.selectDates(depart, ret);
    await home.setPassengers('1');

    // Fill billing/contact info
    await home.fillBilling('Test User', 'test.user@example.com');

    // Assert that the fields contain the expected values (sanity check for POM interactions)
    await expect(home.fromCity).toHaveValue('Mumbai');
    await expect(home.destCity).toHaveValue('Delhi');
    await expect(home.departDate).toHaveValue(depart);
    await expect(home.returnDate).toHaveValue(ret);
    await expect(home.billingName).toHaveValue('Test User');
    await expect(home.billingEmail).toHaveValue('test.user@example.com');
  });
});
