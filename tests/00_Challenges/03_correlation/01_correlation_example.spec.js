//Fetch the post data with id 12 and capture userId 2 and the fetch posts with captured userId 2.

import { test, expect } from '@playwright/test';

test('Correlation Example: Fetch Post and then User Posts', async ({ request }) => {

    const url = 'https://jsonplaceholder.typicode.com/posts/12';
    // Fetch post with id 12

    const response = await request.get(url);

    // Validate status code
    expect(response.status()).toBe(200);
    console.log(`Status Code: ${response.status()}`);

    // Parse JSON response
    const jsonData = await response.json();
    console.log('Post with ID 12:', jsonData);

    // Capture userId from the response
    const userId = jsonData.userId;
    console.log(`Captured userId: ${userId}`);

    // Fetch posts with captured userId
    const userPostsResponse = await request.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    // Validate status code
    expect(userPostsResponse.status()).toBe(200);
    console.log(`Status Code for User Posts: ${userPostsResponse.status()}`);

    // Parse JSON response
    const userPostsData = await userPostsResponse.json();
    console.log(`Posts for userId ${userId}:`, userPostsData);
});
