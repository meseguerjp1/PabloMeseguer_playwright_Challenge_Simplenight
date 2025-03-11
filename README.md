# simplenight-POC-PabloMeseguer

## Overview

The purpose of this project is to demonstrate the development of a test automation framework using **Playwright**, following best practices and the **Page Object Model (POM)** design pattern. The framework is designed to execute **UI and API tests**, ensuring high-quality validation with detailed reporting.

This project is integrated with **Allure** for rich test reports and **GitHub Actions** for CI/CD execution, allowing automated validation on each push or pull request.

## Repository

GitHub Repository: [simplenight-POC-PabloMeseguer](https://github.com/meseguerjp1/PabloMeseguer_playwright_Challenge_Simplenight)

## Installation

To set up the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/meseguerjp1/PabloMeseguer_playwright_Challenge_Simplenight.git
   cd PabloMeseguer_playwright_Challenge_Simplenight
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install Playwright browsers:
   ```sh
   npx playwright install --with-deps
   ```

# Running Tests

You can execute different types of tests using the following commands:

## Run all tests:
```bash
npm run test
```

## Run all tests with Allure reporting:
```bash
npm run test:report
```

## Run tests in headless mode:
```bash
npm run test:headless
```

## Run tests in headed mode (with UI visible):
```bash
npm run test:headed
```

## Environment Specific Tests

### Run tests in Development Environment (headless mode):
```bash
npm run runTestDevEnvironment:headless
```

### Run tests in Development Environment (headed mode - with UI visible):
```bash
npm run runTestDevEnvironment:headed
```

### Run tests in Production Environment (headless mode):
```bash
npm run runTestProduction:headless
```

### Run tests in Production Environment (headed mode - with UI visible):
```bash
npm run runTestProduction:headed
```

## Viewing Allure Reports

To generate and view the Allure report after running tests:

```bash
npm run test:report
```

This command will:
1. Execute all tests.
2. Generate an Allure report.
3. Automatically open the report in your browser.

## Notes:
- Headless mode runs tests without opening the browser (faster for CI pipelines).
- Headed mode runs tests with browser visible (useful for debugging).
- Allure reports are automatically saved under `allure-report/` folder.
- Make sure you have Allure Commandline installed to generate and view reports properly:
```bash
npm install -D allure-commandline
```

---

## 🔹 **Scope: Test Scenarios Covered**
The automated tests in this project cover the following user journey:

1️ **Go to the homepage**:  
   - Open the website [https://app.simplenight.com/](https://app.simplenight.com/).  

2️ **Select a category**:  
   - Choose the **Hotels** category from the available navbar options.  

3️ **Perform a search with input parameters**:  
   - **Location**: Miami  
   - **Dates**: May 20 - May 22  
   - **Guests**: 1 Adult + 1 Child  

4️ **Modify the search results in Map View**:  
   - Select **Map View** for the search results.  
   - Apply filters using the left panel:  
     - **Price Range**: $100 - $1000  
     - **Guest Score**: Very Good  

5️ **Interact with the Map and Select a Hotel**:  
   - Zoom in on the **Map View**.  
   - Select **one hotel** option.  

6️ **Validate Hotel Card Information**:  
   - Ensure the **Price** and **Guest Score** displayed on the selected hotel match the filtered parameters.  

---

### **Downloading Reports from GitHub Actions**
When tests are executed in a CI/CD pipeline, reports are automatically uploaded as **artifacts**. You can download them by:

1. Navigating to the **GitHub Actions** tab.
2. Selecting the executed workflow.
3. Go to: https://github.com/meseguerjp1/PabloMeseguer_playwright_Challenge_Simplenight/actions/runs/13779994593



