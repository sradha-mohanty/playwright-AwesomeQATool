# The awesome Q/A Tool 

This project uses [Playwright](https://playwright.dev/) for end-to-end testing of The awesome Q/A Tool application.

## Purpose 

This document serves as a guide for automating tasks on the Awesome QA Tool website using the Playwright automation framework. It aims to streamline repetitive tasks and improve efficiency in creating questions and answers. 

## Getting Started

### Prerequisites

Before running the tests, ensure you have the following installed:

- Node.js (version >= 14) from [https://nodejs.org]
- npm (Node Package Manager)

## Browser Compatibility 

- Chrome, Firefox, WebKit (Safari), Edge, and Chromium 

# Playwright Installation 

## Installation Steps 

1. **Clone Repository**

  git clone https://github.com/yourusername/playwright-project.git
  cd playwright-project

2. **Install dependencies**
  Open a terminal in Visual Studio Code.
  Run the following command: 
    
    npm install  
    npm init playwright@latest  

# Configuration 

Playwright can be configured using the `playwright.config.js` file to specify browser settings, launch options, and more.
    use: {
    baseURL: 'http://localhost:8000',
    trace: 'on-first-retry',
    headless:true,
    screenshot:"only-on-failure",
    video:"retain-on-failure"
   },
   retries:2,

# Automation Scripts 

- Input: `testdata.json` 
- Output: `test-results` 
- Script File: `qaTool.spec.js`, `qaTool.js`, `locators.json` 

# Running the Automation Tests

  Navigate to the project directory. 
  Run the automation scripts using the following command: 

    npx playwright test 

# Writing Tests
  Tests are located in the tests directory. You can create new test files with the .spec.js  extension. Here’s an example of a simple test:

# Reporting 

## Generating Reports 

Playwright provides built-in support for generating test reports using various formats such as Html, JSON, JUnit XML, etc. 

**Command to generate an HTML report:**
    npx playwright show-report 
   
**Command to generate allure report:**
    allure generate allure-results -o allure-report –clean 
    allure open allure-report  

**Check the logs post execution:**
   Go to logs folder from source directory and check the <Date>-app-log.log file


