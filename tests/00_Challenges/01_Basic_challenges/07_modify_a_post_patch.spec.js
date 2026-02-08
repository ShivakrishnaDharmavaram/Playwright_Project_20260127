import {test, expect} from '@playwright/test';

test(' Modify a post by sending only id and title using PUT method', async ({request}) => {
    const url = 'https://jsonplaceholder.typicode.com/posts/13';
    const requestBody = {
        title: 'foo'
    };
    const response = await request.patch(url, { data: requestBody }); // Send a PATCH request to the specified URL with query parameters and request body and returns a promise of responseAPI.
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

    // Validate response text
    console.log('Response Text: ', await response.text());
});