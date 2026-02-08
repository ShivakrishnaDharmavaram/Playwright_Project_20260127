//Challenge 3: Delete post 101 and validate response
import {test, expect} from '@playwright/test';

test(' Delete post 101 and validate response', async ({request}) => {
    const url = 'https://jsonplaceholder.typicode.com/posts/101';
    const response = await request.get(url);
    
    //validate the response status code
    expect(response.status()).toBe(404);
    console.log('Response Status Code:', response.status());

});
