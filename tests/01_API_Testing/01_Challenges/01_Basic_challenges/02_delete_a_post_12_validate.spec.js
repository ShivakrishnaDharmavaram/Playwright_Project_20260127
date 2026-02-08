//Challenge 2: Delete a post with id 12 and validate response
import {test, expect} from '@playwright/test';

test('Delete a post with id 12 and validate response', async ({request}) => {
    const url = 'https://jsonplaceholder.typicode.com/posts/12';
    const response = await request.delete(url); // Send a DELETE request to the specified URL and returns a promise of responseAPI.

    // Validate the response status code
    expect(response.status()).toBe(200);
    console.log('Response Status Code:', response.status());

    // Validate JSON body
    const jsonData = await response.json();
    console.log('Response JSON:', jsonData);
    expect(jsonData).toEqual({}); // Expecting an empty object as the response body after deletion
})