import dotenv from 'dotenv';

dotenv.config();


// Purpose: Fetch access token from OAuth2 token endpoint

/**
 * Fetch OAuth2 access token using Client Credentials grant
 * @returns access token promise
 */
export async function getAccessToken(request) {

  // 1. OAuth2 token endpoint details (from environment variables, normally provided by client)
  const TOKEN_URL = process.env.TOKEN_URL; 
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const SCOPE = process.env.SCOPE; // optional

  // 2. Prepare form data (as required by OAuth2 spec)
  const formData = new URLSearchParams();
  formData.set('grant_type', 'client_credentials');
  formData.set('client_id', CLIENT_ID);
  formData.set('client_secret', CLIENT_SECRET);
  if (SCOPE) {
    formData.set('scope', SCOPE);
  }

  // 3. send request to token endpoint to get access token
  const response = await request.post(TOKEN_URL, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData.toString()
  });

  // 4. Basic validation
  if (!response.ok()) {
    throw new Error(`Token API failed with status ${response.status()}`);
  }

  // 5. Read token from response and return it
  const responseBody = await response.json();
  
  const echoedClientId = responseBody?.form?.client_id; // using optional chaining to access client id
//   const echoedClientId = responseBody.form.client_id; // without optional chaining
  
  if (!echoedClientId) {
    throw new Error(
      `Postman Echo did not echo client_id under 'form'. Got: ${JSON.stringify(responseBody)}`
    );
  }

  const accessToken = `echo-token-${echoedClientId}`;
  return accessToken;

}
