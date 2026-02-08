//Day 4 -02-02-2026 -API Testing - Challenges
//Challenge 1: Fetch post 101 and validate status code
import {test, expect} from '@playwright/test';

test(' Fetch post 101 and validate status code', async ({request}) => {
    const url = 'https://jsonplaceholder.typicode.com/posts/101';
    const response = await request.get(url); // Send a GET request to the specified URL and returns a promise of responseAPI.

    // Validate the response status code
    expect(response.status()).toBe(404);

    console.log('Response Status Code:', response.status());
});