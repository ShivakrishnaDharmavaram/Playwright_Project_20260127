//Challenge 4: Fetch all posts and validate status code
import {test, expect} from '@playwright/test';

test('test', async ({request}) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const response = await request.get(url); 
    const jsonData = await response.json();
    console.log(jsonData);

    expect(response.status()).toBe(200);

    
});