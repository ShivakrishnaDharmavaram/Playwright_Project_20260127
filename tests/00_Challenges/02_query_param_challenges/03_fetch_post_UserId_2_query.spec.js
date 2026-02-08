//Fetch a post with UserId 2 and validate status code using query parameter
import {test, expect} from '@playwright/test';

test('Fetch a post with UserId 2 and validate status code using query parameter', async ({request}) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    // const queryParams = { userId: 2 }; // Define query parameters
    const response = await request.get(url, { params: { userId: 2 }}); // Send a GET request to the specified URL with query parameter userId=2 and returns a promise of responseAPI.
    // Validate the response status code
    expect(response.status()).toBe(200);

    console.log('Response :', await response.json());

    console.log('Response Status Code:', response.status());
    console.log('Type of Response:', typeof response);
});