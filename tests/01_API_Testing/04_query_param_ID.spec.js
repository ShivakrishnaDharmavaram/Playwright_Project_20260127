import { test, expect } from '@playwright/test';

test('Fetch single post and validate response', async ({ request }) => {
  
    // const url = "https://jsonplaceholder.typicode.com/posts?id=12";
    const url = "https://jsonplaceholder.typicode.com/posts";
    const queryParams = { ID: 12 };

    const response = await request.get(url, { params: queryParams });

    // Validate status code
    expect(response.status()).toBe(200);
    console.log(`Status Code: ${response.status()}`);

    // Validate header
    const contentType = response.headers()['content-type'];
    console.log('Content-Type:', contentType);
    expect(contentType).toContain('application/json');

       // Validate JSON body
    const jsonData = await response.json();
    console.log('Response JSON:', jsonData);

    // expect(jsonData.id).toBe(12);
    // expect(jsonData.userId).toBe(2);
    // expect(jsonData.title).toBeTruthy(); // Ensure title exists
     
    // console.log('Response Text:', await response.text());
});

