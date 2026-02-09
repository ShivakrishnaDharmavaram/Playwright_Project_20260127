import { test, expect } from '@playwright/test';

// ---------- Helper to build Basic Authorization header ----------
function basicAuthHeader(username, password) {
  const token = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${token}`;
}

// ---------- Positive Case: Correct Credentials ----------
test('[Basic Auth - Success] Postman Echo basic auth with correct credentials', async ({ request }) => {
  const BASE_URL = 'https://postman-echo.com';
  const USER = 'postman';
  const PASS = 'password';
  const token1 = basicAuthHeader(USER, PASS);

  // Authorization: Basic base64(user:pass)
  const res = await request.get(`${BASE_URL}/basic-auth`, {
    headers: {
      Authorization: token1,
      Accept: 'application/json',
    },
  });

  // Validate HTTP status
  expect(res.status(), 'Expected 200 OK for valid basic auth').toBe(200);

  // Validate body
  const body = await res.json();
  // Postman Echo typically returns: { authenticated: true }
  expect(body).toMatchObject({
    authenticated: true,
  });

  console.log('Response Body:', body);
    
});
