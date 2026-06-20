// spec: specs/dummy_booking_test_plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { DummyBookingPage } from './pageObjects/dummyBooking.page';

function isoDate(daysFromToday: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString().split('T')[0];
}

test.describe('Dummy Booking Website POM', () => {
  test('Complete booking ticket form fields', async ({ page }) => {
    const booking = new DummyBookingPage(page);
    await booking.goto();

    await booking.selectTicketOption(2);
    await booking.fillPassengerName('Ayesha', 'Khan');
    await booking.selectGender('female');
    await booking.setAdditionalPassengers('1');

    const depart = isoDate(7);
    const returnDate = isoDate(10);
    await booking.fillTravelDetails('Mumbai', 'Delhi', depart, returnDate);
    await booking.setVisaDate(isoDate(30));
    await booking.selectDeliveryOption('whatsapp');
    await booking.fillBillingDetails({
      name: 'Ayesha Test',
      phone: '9998887777',
      email: 'ayesha.test@example.com',
      address: '123 Test Street',
      country: 'India',
      postcode: '400001',
      prefecture: 'Maharashtra',
      street1: 'Test Building',
      street2: 'Floor 2'
    });

    await expect(booking.firstName).toHaveValue('Ayesha');
    await expect(booking.lastName).toHaveValue('Khan');
    await expect(booking.fromCity).toHaveValue('Mumbai');
    await expect(booking.destCity).toHaveValue('Delhi');
    await expect(booking.departDate).toHaveValue(depart);
    await expect(booking.returnDate).toHaveValue(returnDate);
    await expect(booking.billingName).toHaveValue('Ayesha Test');
    await expect(booking.billingEmail).toHaveValue('ayesha.test@example.com');
  });
});
