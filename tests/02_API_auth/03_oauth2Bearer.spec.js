import { test, expect } from '@playwright/test';
import { getAccessToken } from '../../utils/oauth2Simple';
import dotenv from 'dotenv';

dotenv.config();

test('[OAuth2] Call protected API using Bearer token', async ({ request }) => {

  // 1. Get access token
  const accessToken = await getAccessToken(request);

  // 2. Call protected API with Authorization header
  const response = await request.get('https://httpbin.org/bearer', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  // 3. Validate response
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.authenticated).toBe(true);
  expect(responseBody.token).toBe(accessToken);
  console.log('Access token successfully used to call protected API', { authenticated: responseBody.authenticated }); // Note: httpbin.org/bearer is a test endpoint that validates Bearer tokens and echoes back the token and authentication status
  
});