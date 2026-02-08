//Fetch a post with id 102 and validate status code using query parameter
import {test, expect} from '@playwright/test';

test('Fetch a post with id 102 and validate status code using query parameter', async ({request}) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    // const queryParams = { id: 12 }; // Define query parameters
    const response = await request.get(url, { params: { ID: 12 }}); // Send a GET request to the specified URL with query parameter id=12 and returns a promise of responseAPI.
    // Validate the response status code
    expect(response.status()).toBe(200);

    console.log('Response :', await response.json());

    console.log('Response Status Code:', response.status());
    console.log('Type of Response:', typeof response);
});

// Here the code fetch a post with id 12 using query parameter and validate the status code is 200. The response is logged in JSON format and the type of response is also logged.
// It is returing an whole post