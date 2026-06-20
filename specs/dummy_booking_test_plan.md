# Dummy Booking Website Test Plan

## Application Overview

Test plan for Dummy Booking Website (https://sqatools.in/dummy-booking-website/). Covers search, booking, form validation, modification, cancellation, accessibility, responsiveness, and error handling. Assumes fresh browser session for each scenario.

## Test Scenarios

### 1. Dummy Booking Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Search — Happy Path (Find available stays)

**File:** `tests/search_happy.spec.ts`

**Steps:**
  1. Assumptions: fresh browser session (clear cookies/localStorage). Navigate to homepage: https://sqatools.in/dummy-booking-website/
    - expect: Homepage loads successfully and main search widget is visible
  2. Enter destination or select from suggestions (e.g., 'New York' or available sample). Select valid check-in and check-out dates (future dates, check-out > check-in). Set guests (1 adult). Click 'Search' or equivalent.
    - expect: Search results page or results grid appears
    - expect: At least one property card is displayed with title, price, and 'Book' or 'View' action
  3. Open first result's details (click 'View' or card). Inspect availability and room options.
    - expect: Room types and prices are visible
    - expect: Selected dates are available for at least one room type

#### 1.2. Complete Booking — Guest Checkout (End-to-end)

**File:** `tests/booking_e2e.spec.ts`

**Steps:**
  1. Start from homepage. Search for a stay as in 'Search — Happy Path'.
    - expect: Search results present
  2. Select a property and choose a room. Click 'Book' or 'Proceed to booking'.
    - expect: Booking form or checkout view is displayed with price summary
  3. Fill guest contact details with valid data (name, email, phone). Fill required fields for payment if present (use test/dummy card info). Accept terms if required. Submit booking.
    - expect: If payment is simulated: confirmation page shown with booking reference number
    - expect: Booking confirmation shows property name, dates, guest name, total price

#### 1.3. Form Validation — Required Fields and Invalid Inputs

**File:** `tests/form_validation.spec.ts`

**Steps:**
  1. Navigate to booking form for any property. Attempt to submit with empty required fields (name, email).
    - expect: Inline validation messages appear for each required field and submission is blocked
  2. Enter an invalid email and non-numeric phone. Attempt to submit.
    - expect: Email field shows invalid format error
    - expect: Phone field shows invalid format error or prevents non-numeric input

#### 1.4. Date Picker Edge Cases

**File:** `tests/date_picker_edgecases.spec.ts`

**Steps:**
  1. Open search widget/date picker on homepage. Try selecting a past date for check-in.
    - expect: Past dates are disabled or selecting them is prevented with an error message
  2. Select check-out date earlier than check-in (manually if possible).
    - expect: UI prevents invalid range or shows a validation error
  3. Select very long stay exceeding any documented max (e.g., >90 nights) if allowed.
    - expect: Either selection is prevented or system shows a validation message or enforces max nights

#### 1.5. Guest Count and Occupancy Limits

**File:** `tests/guest_count.spec.ts`

**Steps:**
  1. Open guest selector and increase adults/children to high numbers (e.g., 20 adults).
    - expect: UI enforces a reasonable max or displays an informative error
    - expect: Search results or booking prevents selection if occupancy exceeds room capacity
  2. Set children with ages if required and verify total price recalculation.
    - expect: Price summary updates to reflect child rates or extra fees

#### 1.6. Price Calculation and Extras

**File:** `tests/price_calculation.spec.ts`

**Steps:**
  1. Select a room and toggle optional extras (breakfast, airport pickup, insurance).
    - expect: Price summary updates to include selected extras
    - expect: Taxes and fees are shown clearly and total matches sum of components
  2. Change number of nights or guests and verify dynamic price recalculation.
    - expect: Total price updates accordingly and line-item prices are consistent

#### 1.7. Modify Booking — Change Dates / Guests

**File:** `tests/modify_booking.spec.ts`

**Steps:**
  1. Complete a booking (or use an existing booking reference if available). Navigate to 'Manage booking' or 'My bookings'.
    - expect: Manage booking interface loads and shows the created booking
  2. Attempt to change dates and/or guest count and save changes.
    - expect: System shows updated availability and new price
    - expect: Change confirmation is displayed and booking details reflect updates

#### 1.8. Cancel Booking and Refund Flow

**File:** `tests/cancel_booking.spec.ts`

**Steps:**
  1. From a confirmed booking, click 'Cancel booking' and follow cancellation flow.
    - expect: Cancellation confirmation is shown with cancellation policy
    - expect: If site simulates refunds: refund status or message is displayed

#### 1.9. Authentication and Account Flows (if present)

**File:** `tests/auth_flow.spec.ts`

**Steps:**
  1. Try registering a new account using the site's signup form (use fresh email).
    - expect: Registration succeeds or shows required verification steps
  2. Log in with the new account and access 'My bookings'.
    - expect: User can view past and upcoming bookings associated with the account
  3. Attempt guest checkout (without creating account) and confirm booking.
    - expect: Guest booking completes and confirmation is emailed or displayed

#### 1.10. Network/Error Handling — Server Errors & Timeouts

**File:** `tests/error_handling.spec.ts`

**Steps:**
  1. Simulate a slow network or block booking API endpoint (if test harness supports). Attempt to submit booking.
    - expect: UI shows loading state and a clear error message on failure
    - expect: Retry action is available and does not duplicate payments/bookings

#### 1.11. Accessibility and Keyboard Navigation

**File:** `tests/accessibility.spec.ts`

**Steps:**
  1. Navigate the site using only keyboard (Tab/Shift+Tab, Enter) and attempt to complete a search and begin booking.
    - expect: All interactive elements are reachable by keyboard and focus order is logical
  2. Run basic accessibility checks: ensure images have alt text, forms have labels, ARIA roles present for major widgets.
    - expect: No missing form labels for required inputs; major widgets have ARIA roles or descriptive labels

#### 1.12. Responsive Layouts — Mobile / Tablet

**File:** `tests/responsive.spec.ts`

**Steps:**
  1. Set viewport to common mobile sizes (e.g., 375x812, 768x1024). Load homepage and perform a search.
    - expect: Search widget adapts for mobile, results are readable and actions accessible
  2. Attempt booking flow on mobile viewport (fill minimal guest details and submit).
    - expect: Booking flow completes on mobile or the site shows mobile-specific steps without loss of functionality
