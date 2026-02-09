# API Authentication Examples

This directory contains examples of different API Authentication/Authorization methods used in automated API testing with Playwright.

## 1. Basic Authentication (`01_basic_auth.spec.js`)

- Encodes username:password in Base64
- Sends as `Authorization: Basic <base64>` header
- Example: Testing login with credentials
- **Common use case:** APIs that require username and password credentials

## 2. API Key Authentication (`02_apikey_auth.spec.js`)

Uses helper functions from `../../utils/apikey.js`:

- **Header Method:** Passes API key via custom header (e.g., `x-api-key: your-key`)
- **Query Parameter Method:** Passes API key via URL query parameter (e.g., `?apikey=your-key`)
- **Negative Testing:** Validates that missing keys are handled correctly
- **Common use case:** Services like Stripe, AWS, Google Cloud, SendGrid, etc.

## 3. OAuth2 Bearer Token (`03_oauth2Bearer.spec.js`)

Uses helper functions from `../../utils/oauth2Simple.js`:

- Fetches an access token from an OAuth2 token endpoint
- Uses Client Credentials grant type
- Sends token as `Authorization: Bearer <token>` header
- **Common use case:** Modern APIs and microservices requiring secure delegation

## Environment Variables Required

Each authentication method requires specific environment variables:

### Basic Auth
- `USERNAME` - Username for basic authentication
- `PASSWORD` - Password for basic authentication

### API Key Auth
- `API_KEY` - The API key value
- `API_KEY_HEADER` - Header name (default: `x-api-key`)
- `API_KEY_QUERY_NAME` - Query parameter name (default: `apikey`)
- `ECHO_BASE_URL` - Base URL for testing (default: `https://postman-echo.com`)

### OAuth2 Bearer Token
- `TOKEN_URL` - OAuth2 token endpoint
- `CLIENT_ID` - OAuth2 client ID
- `CLIENT_SECRET` - OAuth2 client secret
- `SCOPE` - Optional OAuth2 scope

## Running the Tests

```bash
# Run all API auth tests
npx playwright test tests/02_API_auth

# Run specific authentication test
npx playwright test tests/02_API_auth/01_basic_auth.spec.js

# Run with specific browser
npx playwright test tests/02_API_auth --project=chromium
```

## Notes

- Tests use **Postman Echo** as the test endpoint (https://postman-echo.com)
- These are **real-world authentication patterns** used in production APIs
- Each method demonstrates both positive and negative test cases
- Helper utilities in `utils/` folder abstract common authentication logic
