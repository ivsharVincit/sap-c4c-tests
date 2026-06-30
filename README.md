# SAP C4C UI Testing Framework

A reusable, scalable testing framework for SAP Cloud for Customer (C4C) using Playwright.

## Features

- ✅ Reusable Page Objects for different C4C modules
- ✅ Organized test structure by feature/module
- ✅ Test data fixtures for easy maintenance
- ✅ Multi-browser testing (Chrome, Firefox, Safari)
- ✅ Parallel test execution
- ✅ Screenshot and video capture on failures
- ✅ HTML reporting

## Quick Start

### Prerequisites
- Node.js 16+ (https://nodejs.org/)
- Git (https://git-scm.com/)

### Installation

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/specs/auth.spec.js

# Run in headed mode (see the browser)
npx playwright test --headed

# Run in debug mode (step through)
npx playwright test --debug

# Run tests matching a pattern
npx playwright test --grep "login"
```

### View Test Report

```bash
npx playwright show-report
```

## Project Structure

```
sap-c4c-tests/
├── tests/
│   ├── pages/                      # Page Object Models (reusable)
│   │   ├── loginPage.js
│   │   ├── dashboardPage.js
│   │   └── customerPage.js
│   ├── fixtures/                   # Test data
│   │   ├── testData.json
│   │   └── credentials.json
│   ├── specs/                      # Test scenarios
│   │   ├── auth.spec.js
│   │   ├── customer.spec.js
│   │   └── sales.spec.js
│   └── utils/                      # Helper functions
│       └── helpers.js
├── playwright.config.js            # Playwright configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

## Page Object Pattern

We use the **Page Object Model** pattern for maintainability:

```javascript
// Create a page class
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = '#username';
  }

  async login(username, password) {
    await this.page.fill(this.usernameField, username);
    // ...
  }
}

// Use in tests
const loginPage = new LoginPage(page);
await loginPage.login('user@example.com', 'password');
```

**Benefits:**
- Locators defined in one place
- Easy to maintain when UI changes
- Reusable across multiple tests
- Clear separation of concerns

## Configuration

Edit `playwright.config.js` to customize:
- Browsers to test
- Parallel workers
- Timeouts
- Screenshots/videos
- Reporters

## Next Steps

1. Update `tests/fixtures/credentials.json` with your SAP C4C login details
2. Update the base URL in `playwright.config.js` 
3. Modify page objects to match your C4C UI
4. Create additional test files in `tests/specs/`
5. Run tests locally: `npx playwright test --headed`

## CI/CD Integration

This framework is ready for GitHub Actions, Jenkins, or any CI/CD platform. Add the workflow file to automate testing on every push.

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [SAP C4C Documentation](https://help.sap.com/docs/SAP_C4C)

## License

MIT
