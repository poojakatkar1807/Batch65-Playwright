Here are the top 10 codes asked in automation testing interviews in **Playwright JavaScript**:

---

# Top 10 Codes Asked in Automation Testing Interview
## Playwright — JavaScript

---

## 1. Login Page Automation

The most commonly asked code in every automation interview. You must know how to automate a login page.

```javascript
// tests/login.spec.js

const { test, expect } = require('@playwright/test');

test('Login with valid credentials', async ({ page }) => {

  // Step 1 — Open the application
  await page.goto('https://www.example.com/login');

  // Step 2 — Enter username
  await page.fill('#username', 'testuser@example.com');

  // Step 3 — Enter password
  await page.fill('#password', 'Password@123');

  // Step 4 — Click login button
  await page.click('#loginButton');

  // Step 5 — Verify login was successful
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('#welcomeMessage')).toBeVisible();
  await expect(page.locator('#welcomeMessage')).toContainText('Welcome');

  console.log('Login Test PASSED ✅');
});

test('Login with invalid credentials', async ({ page }) => {

  await page.goto('https://www.example.com/login');
  await page.fill('#username', 'wrong@example.com');
  await page.fill('#password', 'wrongpassword');
  await page.click('#loginButton');

  // Verify error message is shown
  await expect(page.locator('#errorMessage')).toBeVisible();
  await expect(page.locator('#errorMessage')).toContainText('Invalid credentials');
});

test('Login with empty fields', async ({ page }) => {

  await page.goto('https://www.example.com/login');

  // Click login without entering anything
  await page.click('#loginButton');

  // Verify validation messages
  await expect(page.locator('#usernameError')).toContainText('Username is required');
  await expect(page.locator('#passwordError')).toContainText('Password is required');
});
```

**What interviewer checks:**
- Do you know page.fill, page.click, page.goto
- Do you know how to use expect assertions
- Do you know how to verify URLs and elements

---

## 2. Page Object Model (POM)

Page Object Model is asked in almost every senior automation interview. It shows you understand maintainable test design.

```javascript
// pages/LoginPage.js — Page Object Class

class LoginPage {

  constructor(page) {
    this.page = page;

    // Step 1 — Define all locators in one place
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.loginButton   = page.locator('#loginButton');
    this.errorMessage  = page.locator('#errorMessage');
    this.welcomeText   = page.locator('#welcomeMessage');
  }

  // Step 2 — Define actions as methods
  async goto() {
    await this.page.goto('https://www.example.com/login');
  }

  async enterUsername(username) {
    await this.usernameField.clear();
    await this.usernameField.fill(username);
  }

  async enterPassword(password) {
    await this.passwordField.clear();
    await this.passwordField.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async getWelcomeText() {
    return await this.welcomeText.textContent();
  }

  // Step 3 — Combine into reusable login method
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}

module.exports = { LoginPage };


// tests/login.spec.js — Test Class using POM

const { test, expect } = require('@playwright/test');
const { LoginPage }    = require('../pages/LoginPage');

test.describe('Login Tests', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Valid login redirects to dashboard', async ({ page }) => {
    await loginPage.login('user@test.com', 'Valid@123');
    await expect(page).toHaveURL(/dashboard/);
    const welcome = await loginPage.getWelcomeText();
    expect(welcome).toContain('Welcome');
  });

  test('Invalid password shows error', async () => {
    await loginPage.login('user@test.com', 'wrongpass');
    const error = await loginPage.getErrorMessage();
    expect(error).toBe('Invalid username or password');
  });

  test('Empty username shows validation', async () => {
    await loginPage.login('', 'Valid@123');
    const error = await loginPage.getErrorMessage();
    expect(error).toBe('Username is required');
  });
});
```

**What interviewer checks:**
- Do you separate page logic from test logic
- Do you know constructor and class structure in JS
- Can you explain why POM improves maintainability

---

## 3. Waits and Dynamic Elements

Waits are asked in every interview. Playwright has built-in auto-waiting but you must know explicit waits too.

```javascript
const { test, expect } = require('@playwright/test');

test('Handling dynamic elements with waits', async ({ page }) => {

  await page.goto('https://www.example.com');

  // ── 1. waitForSelector — wait for element to appear
  await page.waitForSelector('#dynamicButton', { state: 'visible' });
  await page.click('#dynamicButton');

  // ── 2. waitForURL — wait for page navigation
  await page.waitForURL('**/dashboard');
  console.log('Navigated to dashboard');

  // ── 3. waitForResponse — wait for specific API call
  const responsePromise = page.waitForResponse(
    response => response.url().includes('/api/user') &&
                response.status() === 200
  );
  await page.click('#loadUserBtn');
  const response = await responsePromise;
  console.log('API responded:', response.status());

  // ── 4. waitForLoadState — wait for page to fully load
  await page.waitForLoadState('networkidle');
  console.log('Page fully loaded');

  // ── 5. waitForTimeout — fixed wait (use sparingly)
  await page.waitForTimeout(2000); // waits 2 seconds

  // ── 6. expect with timeout — wait for condition
  await expect(page.locator('#result')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('#result')).toContainText('Success', { timeout: 5000 });

  // ── 7. waitForFunction — wait for custom condition
  await page.waitForFunction(() => {
    return document.querySelector('#counter').textContent === '10';
  });
  console.log('Counter reached 10');

  // ── 8. Polling — check condition repeatedly
  await expect(async () => {
    const count = await page.locator('.item').count();
    expect(count).toBeGreaterThan(5);
  }).toPass({ timeout: 10000 });
});
```

**What interviewer checks:**
- Do you know Playwright auto-waits by default
- Do you know different wait strategies
- Do you know when to use each type of wait

---

## 4. Data-Driven Testing

Data-driven testing runs the same test with multiple sets of data. Very commonly asked.

```javascript
const { test, expect } = require('@playwright/test');

// ── Method 1 — Inline test data array
const loginTestData = [
  {
    scenario:  'Valid credentials',
    username:  'user@test.com',
    password:  'Valid@123',
    expected:  'dashboard',
    shouldPass: true
  },
  {
    scenario:  'Wrong password',
    username:  'user@test.com',
    password:  'wrongpass',
    expected:  'Invalid username or password',
    shouldPass: false
  },
  {
    scenario:  'Empty username',
    username:  '',
    password:  'Valid@123',
    expected:  'Username is required',
    shouldPass: false
  },
  {
    scenario:  'Empty password',
    username:  'user@test.com',
    password:  '',
    expected:  'Password is required',
    shouldPass: false
  },
  {
    scenario:  'Invalid email format',
    username:  'notanemail',
    password:  'Valid@123',
    expected:  'Invalid email format',
    shouldPass: false
  },
];

// ── Run the same test for every data set
for (const data of loginTestData) {
  test(`Login — ${data.scenario}`, async ({ page }) => {

    await page.goto('https://www.example.com/login');
    await page.fill('#username', data.username);
    await page.fill('#password', data.password);
    await page.click('#loginButton');

    if (data.shouldPass) {
      await expect(page).toHaveURL(new RegExp(data.expected));
    } else {
      await expect(page.locator('#errorMessage')).toContainText(data.expected);
    }
  });
}


// ── Method 2 — Reading test data from JSON file
const fs   = require('fs');
const path = require('path');

const rawData  = fs.readFileSync(path.join(__dirname, '../data/users.json'));
const userData = JSON.parse(rawData);

for (const user of userData) {
  test(`Create user — ${user.name}`, async ({ page }) => {
    await page.goto('https://www.example.com/register');
    await page.fill('#name',     user.name);
    await page.fill('#email',    user.email);
    await page.fill('#password', user.password);
    await page.click('#registerBtn');
    await expect(page).toHaveURL(/success/);
  });
}

// users.json
// [
//   { "name": "Alice",   "email": "alice@test.com",   "password": "Alice@123" },
//   { "name": "Bob",     "email": "bob@test.com",     "password": "Bob@123"   },
//   { "name": "Charlie", "email": "charlie@test.com", "password": "Charlie@123" }
// ]
```

**What interviewer checks:**
- Do you know how to loop test data
- Do you know how to read external JSON files
- Can you explain benefits of data-driven testing

---

## 5. API Testing with Playwright

API testing using Playwright's built-in request context is very commonly asked.

```javascript
const { test, expect, request } = require('@playwright/test');

test.describe('API Testing with Playwright', () => {

  let apiContext;
  let authToken;
  let createdUserId;

  test.beforeAll(async () => {
    // Create API request context
    apiContext = await request.newContext({
      baseURL: 'https://api.example.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept':       'application/json',
      }
    });
  });

  // ── 1. POST request — Login and get token
  test('POST — Login and get auth token', async () => {
    const response = await apiContext.post('/auth/login', {
      data: {
        email:    'user@test.com',
        password: 'Valid@123'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.token).toBeTruthy();
    authToken = body.token;

    console.log('Token received:', authToken);
  });

  // ── 2. POST request — Create a new user
  test('POST — Create new user', async () => {
    const response = await apiContext.post('/users', {
      headers: { 'Authorization': `Bearer ${authToken}` },
      data: {
        name:  'Test User',
        email: 'testuser@example.com',
        role:  'admin'
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.id).toBeTruthy();
    expect(body.name).toBe('Test User');
    expect(body.email).toBe('testuser@example.com');

    createdUserId = body.id;
    console.log('Created user ID:', createdUserId);
  });

  // ── 3. GET request — Get user by ID
  test('GET — Get user by ID', async () => {
    const response = await apiContext.get(`/users/${createdUserId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(createdUserId);
    expect(body.name).toBe('Test User');
    expect(body.email).toBe('testuser@example.com');
  });

  // ── 4. PUT request — Update user
  test('PUT — Update user details', async () => {
    const response = await apiContext.put(`/users/${createdUserId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
      data: {
        name:  'Updated User',
        email: 'updated@example.com',
        role:  'viewer'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe('Updated User');
    expect(body.email).toBe('updated@example.com');
  });

  // ── 5. DELETE request — Delete user
  test('DELETE — Delete user', async () => {
    const response = await apiContext.delete(`/users/${createdUserId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    expect(response.status()).toBe(204);

    // Verify user is actually deleted
    const getResponse = await apiContext.get(`/users/${createdUserId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    expect(getResponse.status()).toBe(404);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
```

**What interviewer checks:**
- Do you know Playwright API request context
- Do you know all HTTP methods GET POST PUT DELETE
- Do you know how to validate status codes and response body

---

## 6. Screenshot and Video on Failure

Taking screenshots and recording videos is commonly asked to show you understand test reporting.

```javascript
// playwright.config.js — Global configuration

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    headless:    true,
    screenshot:  'only-on-failure', // take screenshot on failure
    video:       'retain-on-failure', // record video on failure
    trace:       'on-first-retry',    // record trace on retry
    baseURL:     'https://www.example.com',
    viewport:    { width: 1280, height: 720 },
  },

  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['list'],
  ],

  retries: 2, // retry failed tests 2 times
});


// ── Taking screenshots manually in tests

const { test, expect } = require('@playwright/test');

test('Screenshot examples', async ({ page }) => {

  await page.goto('https://www.example.com');

  // ── 1. Full page screenshot
  await page.screenshot({
    path:     'screenshots/full-page.png',
    fullPage: true
  });

  // ── 2. Screenshot of specific element only
  const header = page.locator('header');
  await header.screenshot({ path: 'screenshots/header.png' });

  // ── 3. Screenshot at a specific test step
  await page.fill('#username', 'user@test.com');
  await page.screenshot({ path: 'screenshots/after-username.png' });

  await page.fill('#password', 'password');
  await page.screenshot({ path: 'screenshots/after-password.png' });

  await page.click('#loginButton');
  await page.screenshot({ path: 'screenshots/after-login.png' });

  // ── 4. Attach screenshot to test report
  const screenshotBytes = await page.screenshot();
  await test.info().attach('login-screenshot', {
    body:      screenshotBytes,
    contentType: 'image/png'
  });
});


// ── Trace Viewer — record and view test execution

test('Trace example', async ({ page }) => {

  // Start tracing
  await page.context().tracing.start({
    screenshots: true,
    snapshots:   true,
    sources:     true
  });

  await page.goto('https://www.example.com');
  await page.fill('#username', 'user@test.com');
  await page.fill('#password', 'password');
  await page.click('#loginButton');

  // Stop tracing and save
  await page.context().tracing.stop({
    path: 'traces/login-trace.zip'
  });

  // View trace: npx playwright show-trace traces/login-trace.zip
});
```

**What interviewer checks:**
- Do you know how to configure screenshots globally
- Do you know how to take manual screenshots
- Do you know Playwright trace viewer

---

## 7. Handling Alerts, Frames, and Multiple Tabs

Handling special browser scenarios is always asked in interviews.

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Special Browser Scenarios', () => {

  // ── 1. Handling Alert Dialogs
  test('Handle alert dialog', async ({ page }) => {
    await page.goto('https://www.example.com');

    // Listen for dialog BEFORE triggering it
    page.on('dialog', async dialog => {
      console.log('Dialog type:',    dialog.type());
      console.log('Dialog message:', dialog.message());

      if (dialog.type() === 'confirm') {
        await dialog.accept();   // click OK
        // await dialog.dismiss(); // click Cancel
      } else {
        await dialog.accept();
      }
    });

    // Trigger the alert
    await page.click('#deleteButton');
    await expect(page.locator('#successMsg')).toContainText('Deleted');
  });


  // ── 2. Handling iFrames
  test('Handle iframe content', async ({ page }) => {
    await page.goto('https://www.example.com/iframe-page');

    // Get the iframe element
    const frameLocator = page.frameLocator('#myIframe');

    // Interact with elements INSIDE the iframe
    await frameLocator.locator('#iframeInput').fill('Hello from inside iframe');
    await frameLocator.locator('#iframeButton').click();

    const result = await frameLocator.locator('#iframeResult').textContent();
    expect(result).toBe('Submitted!');
  });


  // ── 3. Handling Multiple Tabs
  test('Handle new tab opening', async ({ page, context }) => {
    await page.goto('https://www.example.com');

    // Wait for new page to open when link is clicked
    const newPagePromise = context.waitForEvent('page');
    await page.click('#openNewTabLink');
    const newPage = await newPagePromise;

    // Wait for new tab to load
    await newPage.waitForLoadState('domcontentloaded');

    // Interact with the new tab
    console.log('New tab URL:', newPage.url());
    await expect(newPage).toHaveTitle(/New Page/);
    await newPage.fill('#searchBox', 'Playwright');
    await newPage.click('#searchBtn');

    // Switch back to original tab
    await page.bringToFront();
    console.log('Back to original tab:', page.url());
  });


  // ── 4. Handling File Upload
  test('Handle file upload', async ({ page }) => {
    await page.goto('https://www.example.com/upload');

    // Upload a single file
    await page.setInputFiles('#fileInput', 'path/to/file.pdf');

    // Upload multiple files
    await page.setInputFiles('#fileInput', [
      'path/to/file1.pdf',
      'path/to/file2.jpg',
    ]);

    await page.click('#uploadButton');
    await expect(page.locator('#uploadSuccess')).toBeVisible();
  });


  // ── 5. Handling File Download
  test('Handle file download', async ({ page }) => {
    await page.goto('https://www.example.com/reports');

    // Wait for download to start
    const downloadPromise = page.waitForEvent('download');
    await page.click('#downloadReportBtn');
    const download = await downloadPromise;

    // Save the downloaded file
    await download.saveAs('downloads/' + download.suggestedFilename());
    console.log('Downloaded:', download.suggestedFilename());
  });
});
```

**What interviewer checks:**
- Do you know how to handle alerts with dialog events
- Do you know frameLocator for iframes
- Do you know how to handle new tabs with context events

---

## 8. Cross Browser Testing

Cross browser testing shows you can run tests across different browsers.

```javascript
// playwright.config.js — Cross browser configuration

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  projects: [
    // ── Desktop Browsers
    {
      name:    'Chrome',
      use:     { ...devices['Desktop Chrome'] },
    },
    {
      name:    'Firefox',
      use:     { ...devices['Desktop Firefox'] },
    },
    {
      name:    'Safari',
      use:     { ...devices['Desktop Safari'] },
    },
    {
      name:    'Microsoft Edge',
      use:     { ...devices['Desktop Edge'] },
    },

    // ── Mobile Browsers
    {
      name:    'Mobile Chrome',
      use:     { ...devices['Pixel 5'] },
    },
    {
      name:    'Mobile Safari',
      use:     { ...devices['iPhone 13'] },
    },
    {
      name:    'iPad',
      use:     { ...devices['iPad Pro 11'] },
    },
  ],

  use: {
    screenshot: 'only-on-failure',
    video:      'retain-on-failure',
  },
});


// ── Running on specific browser in test
const { test, expect, chromium, firefox, webkit } = require('@playwright/test');

test('Run on specific browser', async () => {

  // Launch Chrome specifically
  const browser = await chromium.launch({ headless: false });
  const page    = await browser.newPage();
  await page.goto('https://www.example.com');
  await expect(page).toHaveTitle(/Example/);
  await browser.close();
});


// ── Test with different viewport sizes
test('Responsive design testing', async ({ page }) => {

  await page.goto('https://www.example.com');

  // Desktop
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page.locator('.desktop-menu')).toBeVisible();
  await page.screenshot({ path: 'screenshots/desktop.png' });

  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.screenshot({ path: 'screenshots/tablet.png' });

  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('.hamburger-menu')).toBeVisible();
  await page.screenshot({ path: 'screenshots/mobile.png' });
});
```

**What interviewer checks:**
- Do you know how to configure projects in playwright.config.js
- Do you know device emulation
- Do you know how to run tests on specific browsers

---

## 9. Hooks — beforeAll, beforeEach, afterAll, afterEach

Hooks are fundamental to every automation framework. Always asked in interviews.

```javascript
const { test, expect } = require('@playwright/test');
const { LoginPage }    = require('../pages/LoginPage');
const { DashboardPage }= require('../pages/DashboardPage');

test.describe('Order Management Tests', () => {

  let loginPage;
  let dashboardPage;

  // ── Runs ONCE before ALL tests in this describe block
  test.beforeAll(async ({ browser }) => {
    console.log('Setting up test suite...');

    // Create a persistent logged-in state
    // so every test starts already logged in
    const context = await browser.newContext();
    const page    = await context.newPage();

    const login = new LoginPage(page);
    await login.goto();
    await login.login('admin@test.com', 'Admin@123');

    // Save the logged-in state to reuse
    await context.storageState({ path: 'auth/adminState.json' });
    await context.close();

    console.log('Auth state saved ✅');
  });

  // ── Runs before EACH individual test
  test.beforeEach(async ({ page }) => {
    console.log('Starting test:', test.info().title);

    loginPage     = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    // Navigate to starting page before every test
    await page.goto('https://www.example.com/dashboard');

    // Clear any existing data or state
    await page.evaluate(() => localStorage.clear());
  });

  // ── Actual test cases
  test('View all orders', async ({ page }) => {
    await page.click('#ordersMenu');
    await expect(page.locator('.orders-table')).toBeVisible();
    const rowCount = await page.locator('.order-row').count();
    expect(rowCount).toBeGreaterThan(0);
    console.log(`Found ${rowCount} orders`);
  });

  test('Create new order', async ({ page }) => {
    await page.click('#newOrderBtn');
    await page.fill('#productName',  'Laptop');
    await page.fill('#quantity',     '2');
    await page.fill('#price',        '999.99');
    await page.click('#submitOrder');
    await expect(page.locator('#successMessage')).toContainText('Order created');
  });

  test('Search for order', async ({ page }) => {
    await page.fill('#searchBox', 'ORD-001');
    await page.click('#searchBtn');
    await expect(page.locator('.order-result')).toBeVisible();
    await expect(page.locator('.order-id')).toContainText('ORD-001');
  });

  // ── Runs after EACH individual test
  test.afterEach(async ({ page }, testInfo) => {
    console.log(`Test "${testInfo.title}" — ${testInfo.status}`);

    // Take screenshot if test failed
    if (testInfo.status !== 'passed') {
      const screenshot = await page.screenshot();
      await testInfo.attach('failure-screenshot', {
        body:        screenshot,
        contentType: 'image/png'
      });
    }
  });

  // ── Runs ONCE after ALL tests in this describe block
  test.afterAll(async () => {
    console.log('Cleaning up test suite...');
    // Clean up test data from database
    // Close database connections
    // Delete test files created during tests
    console.log('Cleanup complete ✅');
  });
});
```

**What interviewer checks:**
- Do you know the difference between beforeAll and beforeEach
- Do you know when to use each hook
- Do you know how to save auth state with storageState

---

## 10. Full End-to-End Test — Complete Real World Scenario

The most impressive code you can show in an interview — a complete E2E test covering an entire user journey.

```javascript
// tests/e2e/ecommerce.spec.js

const { test, expect } = require('@playwright/test');

test.describe('E-Commerce — Complete User Journey', () => {

  test('Full shopping flow — Register, Search, Add to Cart, Checkout', async ({ page }) => {

    // ────────────────────────────────
    // STEP 1 — Register a new account
    // ────────────────────────────────
    console.log('Step 1: Registering new user...');

    await page.goto('https://www.example-shop.com/register');

    await page.fill('#firstName',    'Test');
    await page.fill('#lastName',     'User');
    await page.fill('#email',        `testuser_${Date.now()}@test.com`);
    await page.fill('#password',     'TestPass@123');
    await page.fill('#confirmPass',  'TestPass@123');
    await page.check('#termsCheckbox');
    await page.click('#registerBtn');

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('#welcomeMsg')).toBeVisible();
    console.log('Registration PASSED ✅');


    // ────────────────────────────────
    // STEP 2 — Search for a product
    // ────────────────────────────────
    console.log('Step 2: Searching for product...');

    await page.fill('#searchBar', 'Wireless Headphones');
    await page.press('#searchBar', 'Enter');

    await expect(page).toHaveURL(/search/);
    await expect(page.locator('.search-results')).toBeVisible();

    const resultCount = await page.locator('.product-card').count();
    expect(resultCount).toBeGreaterThan(0);
    console.log(`Found ${resultCount} products ✅`);


    // ────────────────────────────────
    // STEP 3 — Filter and sort results
    // ────────────────────────────────
    console.log('Step 3: Filtering results...');

    await page.selectOption('#sortBy', 'price-low-to-high');
    await page.click('#filter-brand-sony');
    await page.fill('#maxPrice', '200');
    await page.click('#applyFilters');

    await page.waitForLoadState('networkidle');
    const filteredCount = await page.locator('.product-card').count();
    console.log(`Filtered to ${filteredCount} products ✅`);


    // ────────────────────────────────
    // STEP 4 — View product details
    // ────────────────────────────────
    console.log('Step 4: Viewing product details...');

    await page.locator('.product-card').first().click();
    await expect(page).toHaveURL(/product/);

    const productName  = await page.locator('#productName').textContent();
    const productPrice = await page.locator('#productPrice').textContent();
    console.log(`Product: ${productName} — Price: ${productPrice}`);

    await expect(page.locator('#productName')).toBeVisible();
    await expect(page.locator('#productPrice')).toBeVisible();
    await expect(page.locator('#addToCartBtn')).toBeEnabled();
    console.log('Product details PASSED ✅');


    // ────────────────────────────────
    // STEP 5 — Add product to cart
    // ────────────────────────────────
    console.log('Step 5: Adding to cart...');

    // Select product options
    await page.selectOption('#colorOption',    'Black');
    await page.selectOption('#quantitySelect', '2');

    // Add to cart
    await page.click('#addToCartBtn');

    // Verify cart notification
    await expect(page.locator('#cartNotification')).toBeVisible();
    await expect(page.locator('#cartNotification')).toContainText('Added to cart');
    await expect(page.locator('#cartCount')).toContainText('2');
    console.log('Add to cart PASSED ✅');


    // ────────────────────────────────
    // STEP 6 — View cart and apply coupon
    // ────────────────────────────────
    console.log('Step 6: Viewing cart...');

    await page.click('#cartIcon');
    await expect(page).toHaveURL(/cart/);

    // Verify item is in cart
    await expect(page.locator('.cart-item')).toHaveCount(1);
    await expect(page.locator('.cart-item-name')).toContainText(productName);

    // Apply coupon code
    await page.fill('#couponInput', 'SAVE10');
    await page.click('#applyCouponBtn');
    await expect(page.locator('#couponSuccess')).toContainText('Coupon applied');
    await expect(page.locator('#discountAmount')).toBeVisible();
    console.log('Cart and coupon PASSED ✅');


    // ────────────────────────────────
    // STEP 7 — Proceed to checkout
    // ────────────────────────────────
    console.log('Step 7: Checkout...');

    await page.click('#checkoutBtn');
    await expect(page).toHaveURL(/checkout/);

    // Fill shipping address
    await page.fill('#address',  '123 Test Street');
    await page.fill('#city',     'Test City');
    await page.fill('#zipCode',  '12345');
    await page.selectOption('#country', 'India');
    await page.click('#continueToPayment');


    // ────────────────────────────────
    // STEP 8 — Complete payment
    // ────────────────────────────────
    console.log('Step 8: Payment...');

    // Fill card details in iframe
    const cardFrame = page.frameLocator('#paymentFrame');
    await cardFrame.locator('#cardNumber').fill('4111 1111 1111 1111');
    await cardFrame.locator('#expiryDate').fill('12/26');
    await cardFrame.locator('#cvv').fill('123');
    await cardFrame.locator('#cardName').fill('Test User');

    // Place the order
    await page.click('#placeOrderBtn');


    // ────────────────────────────────
    // STEP 9 — Verify order confirmation
    // ────────────────────────────────
    console.log('Step 9: Verifying order confirmation...');

    await expect(page).toHaveURL(/order-confirmation/, { timeout: 15000 });
    await expect(page.locator('#confirmationTitle')).toContainText('Order Placed Successfully');

    const orderId = await page.locator('#orderId').textContent();
    expect(orderId).toBeTruthy();
    console.log(`Order ID: ${orderId}`);

    await expect(page.locator('#orderSummary')).toBeVisible();
    await expect(page.locator('#estimatedDelivery')).toBeVisible();
    console.log('Order confirmation PASSED ✅');


    // ────────────────────────────────
    // STEP 10 — Verify order in history
    // ────────────────────────────────
    console.log('Step 10: Verifying order in history...');

    await page.click('#myAccountMenu');
    await page.click('#orderHistoryLink');
    await expect(page).toHaveURL(/orders/);

    await expect(page.locator('.order-history-item').first())
      .toContainText(orderId);

    console.log('Order history PASSED ✅');
    console.log('');
    console.log('====================================');
    console.log('FULL E2E TEST PASSED ✅');
    console.log('====================================');
  });
});
```

**What interviewer checks:**
- Can you write a complete real-world test scenario
- Do you know how to chain multiple steps
- Do you know how to handle iframes in checkout
- Do you know how to use dynamic data like Date.now()
- Do you understand the full application flow

---

## Quick Reference — All 10 Codes

| # | Code | Key Concepts |
|---|------|-------------|
| 1 | Login Automation | page.fill, page.click, expect, toHaveURL |
| 2 | Page Object Model | Class, constructor, locators, reusable methods |
| 3 | Waits | waitForSelector, waitForURL, waitForResponse, waitForLoadState |
| 4 | Data-Driven Testing | Loop test data, JSON file, multiple scenarios |
| 5 | API Testing | request.newContext, GET POST PUT DELETE, status codes |
| 6 | Screenshots and Video | screenshot, video, trace, playwright.config.js |
| 7 | Alerts Frames Tabs | dialog event, frameLocator, context.waitForEvent |
| 8 | Cross Browser | projects config, devices, viewport |
| 9 | Hooks | beforeAll, beforeEach, afterEach, afterAll, storageState |
| 10 | Full E2E Test | Complete user journey, all concepts combined |

---

All 10 codes are complete and ready to use for your automation testing interview preparation!