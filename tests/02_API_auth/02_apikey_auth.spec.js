import { test, expect } from '@playwright/test';
import { apiKeyHeader, withApiKeyQuery } from '../../utils/apikey';
import dotenv from 'dotenv';

dotenv.config();

test.describe('API Key Authorization Examples', () => {

  test('[API Key - Header] Postman Echo reflects header key', async ({ request }) => {
    const BASE_URL = process.env.ECHO_BASE_URL ?? 'https://postman-echo.com';
    const HEADER_NAME = process.env.API_KEY_HEADER ?? 'x-api-key';

    // 1) Build headers containing the API key (env or explicit)
    const headers = apiKeyHeader({ extra: { Accept: 'application/json' } });

    // 2) Send request
    const res = await request.get(`${BASE_URL}/get`, { headers });

    // 3) Validate success
    expect(res.ok()).toBeTruthy();
    const body = await res.json();

    // Postman Echo echoes incoming headers
    const echoedKey = body.headers?.[HEADER_NAME];
    expect(echoedKey, `Expected header ${HEADER_NAME} to be echoed`).toBe(process.env.API_KEY);
    expect(body.url).toContain('/get');
  });

  test('[API Key - Query] Postman Echo reflects query key', async ({ request }) => {
    const BASE_URL = process.env.ECHO_BASE_URL ?? 'https://postman-echo.com';
    const urlWithKey = withApiKeyQuery(`${BASE_URL}/get`);

    const res = await request.get(urlWithKey);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    // The full URL with query is echoed back
    expect(body.url, 'URL should contain the api key query param').toContain(process.env.API_KEY);
  });

  test('[API Key - Header] httpbin responds successfully and echoes header', async ({ request }) => {
    //   const BASE_URL = process.env.HTTPBIN_BASE_URL ?? 'https://httpbin.org'; // httpbin api not working properly
     const BASE_URL = process.env.ECHO_BASE_URL ?? 'https://postman-echo.com';
      const HEADER_NAME = process.env.API_KEY_HEADER ?? 'x-api-key';

    const headers = apiKeyHeader({ extra: { Accept: 'application/json' } });
    const res = await request.get(`${BASE_URL}/get`, { headers });
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    // httpbin reflects headers under body.headers
    const echoedKey = body.headers?.[HEADER_NAME];
    expect(echoedKey).toBe(process.env.API_KEY);
  });

//   working fine
  test('[API Key - Negative] Missing key in header should not be echoed', async ({ request }) => {
    const BASE_URL = process.env.ECHO_BASE_URL ?? 'https://postman-echo.com';
    const HEADER_NAME = process.env.API_KEY_HEADER ?? 'x-api-key';

    // Send without API key header
    const res = await request.get(`${BASE_URL}/get`, { headers: { Accept: 'application/json' } });
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    // Ensure our header name is not present
    expect(body.headers?.[HEADER_NAME]).toBeUndefined();
  });

});
