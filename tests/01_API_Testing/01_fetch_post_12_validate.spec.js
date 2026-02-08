import {test, expect} from '@playwright/test';

test(' Fetch post 12 and validate response', async ({request}) => {
    const url = 'https://jsonplaceholder.typicode.com/posts/12';
    const response = await request.get(url); // Send a GET request to the specified URL and returns a promise of responseAPI.

    // Validate the response status code
    expect(response.status()).toBe(200);

    console.log('Response Status Code:', response.status());

    //Validate header
    const contentType = response.headers()['content-type'];
    console.log('Content-Type:', contentType);
    expect(contentType).toContain('application/json');

    // Validate JSON body
    const jsonData = await response.json();
    console.log('Response JSON:', jsonData);
 
    expect(jsonData.id).toBe(12);
    expect(jsonData.userId).toBe(2);
    expect(jsonData.title).toBeTruthy(); // Ensure title exists

    // Validate response text
    console.log('Response Text: ', await response.text());

});

test(' Fetch post 101 and validate status code', async ({request}) => {
    const url = 'https://jsonplaceholder.typicode.com/posts/101';
    const response = await request.get(url); // Send a GET request to the specified URL and returns a promise of responseAPI.

    // Validate the response status code
    expect(response.status()).toBe(404);

    console.log('Response Status Code:', response.status());
});