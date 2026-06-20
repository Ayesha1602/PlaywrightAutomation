import { expect, Locator, Page } from '@playwright/test';

export class DummyBookingPage {
  readonly page: Page;
  readonly ticketOptions: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly birthday: Locator;
  readonly maleGender: Locator;
  readonly femaleGender: Locator;
  readonly passengerSelect: Locator;
  readonly oneWayRadio: Locator;
  readonly roundTripRadio: Locator;
  readonly fromCity: Locator;
  readonly destCity: Locator;
  readonly departDate: Locator;
  readonly returnDate: Locator;
  readonly visaDate: Locator;
  readonly deliveryEmail: Locator;
  readonly deliveryWhatsapp: Locator;
  readonly deliveryBoth: Locator;
  readonly billingName: Locator;
  readonly billingPhone: Locator;
  readonly billingEmail: Locator;
  readonly billingAddress: Locator;
  readonly billingCountry: Locator;
  readonly postcode: Locator;
  readonly prefecture: Locator;
  readonly streetAddress1: Locator;
  readonly streetAddress2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ticketOptions = page.locator('input[type=radio][value^="radio_"]');
    this.firstName = page.locator('xpath=(//input[@id="firstname"])[1]');
    this.lastName = page.locator('xpath=(//input[@id="firstname"])[2]');
    this.birthday = page.locator('#birthday');
    this.maleGender = page.locator('#male');
    this.femaleGender = page.locator('xpath=(//input[@id="female"])[1]');
    this.passengerSelect = page.locator('#admorepass');
    this.oneWayRadio = page.locator('#oneway');
    this.roundTripRadio = page.locator('#roundtrip');
    this.fromCity = page.locator('#fromcity');
    this.destCity = page.locator('#destcity');
    this.departDate = page.locator('#departdate');
    this.returnDate = page.locator('#returndate');
    this.visaDate = page.locator('#visadate');
    this.deliveryEmail = page.locator('#eamil');
    this.deliveryWhatsapp = page.locator('#whatsapp');
    this.deliveryBoth = page.locator('xpath=(//input[@id="female"])[2]');
    this.billingName = page.locator('#billing_name');
    this.billingPhone = page.locator('#billing_phone');
    this.billingEmail = page.locator('#billing_email');
    this.billingAddress = page.locator('#billing_address');
    this.billingCountry = page.locator('#billing_country');
    this.postcode = page.locator('#postcode');
    this.prefecture = page.locator('#Prefecture');
    this.streetAddress1 = page.locator('#street_address1');
    this.streetAddress2 = page.locator('#street_address2');
  }

  async goto() {
    await this.page.goto('https://sqatools.in/dummy-booking-website/');
    await expect(this.page.locator('h1', { hasText: 'Dummy Booking Website' })).toBeVisible();
  }

  async selectTicketOption(index: number) {
    await expect(this.ticketOptions).toHaveCount(5);
    await this.ticketOptions.nth(index).check();
  }

  async fillPassengerName(firstName: string, lastName: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
  }

  async selectGender(gender: 'male' | 'female') {
    if (gender === 'male') {
      await this.maleGender.check();
    } else {
      await this.femaleGender.check();
    }
  }

  async setAdditionalPassengers(value: '1' | '2' | '3' | '4') {
    await this.passengerSelect.selectOption(value);
  }

  async fillTravelDetails(from: string, destination: string, depart: string, returnDate: string) {
    await this.fromCity.fill(from);
    await this.destCity.fill(destination);
    await this.departDate.fill(depart);
    await this.returnDate.fill(returnDate);
  }

  async setVisaDate(date: string) {
    await this.visaDate.fill(date);
  }

  async selectDeliveryOption(option: 'email' | 'whatsapp' | 'both') {
    if (option === 'email') {
      await this.deliveryEmail.check();
    } else if (option === 'whatsapp') {
      await this.deliveryWhatsapp.check();
    } else {
      await this.deliveryBoth.check();
    }
  }

  async fillBillingDetails(details: {
    name: string;
    phone: string;
    email: string;
    address: string;
    country: string;
    postcode: string;
    prefecture: string;
    street1: string;
    street2: string;
  }) {
    await this.billingName.fill(details.name);
    await this.billingPhone.fill(details.phone);
    await this.billingEmail.fill(details.email);
    await this.billingAddress.fill(details.address);
    await this.billingCountry.selectOption({ value: details.country });
    await this.postcode.fill(details.postcode);
    await this.prefecture.fill(details.prefecture);
    await this.streetAddress1.fill(details.street1);
    await this.streetAddress2.fill(details.street2);
  }
}
