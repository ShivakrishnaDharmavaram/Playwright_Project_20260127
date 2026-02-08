//Challenge 5: Create a new post and validate response
import {test, expect} from '@playwright/test';

test(' Create a new post and validate response', async ({request}) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const postData = {
        title: 'New Post with name Shiva',
        body: 'Software Engineer',
        userId: 1
    };
    const response = await request.post(url, {data: postData}); // Send a POST request to the specified URL with the postData as the request body and returns a promise of responseAPI.

    // Validate the response status code
    expect(response.status()).toBe(201);
    console.log('Response Status Code:', response.status());
    const responseBody = await response.json();
    // Validate JSON body
    console.log('Response JSON:', responseBody);
    
})