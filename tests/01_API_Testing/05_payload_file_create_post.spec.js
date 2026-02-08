import { test, expect } from '@playwright/test';
import * as fs from 'fs';


test('Create a New Post using Data from JSON File', async ({ request }) => {

    const url = 'https://jsonplaceholder.typicode.com/posts';

    // Read JSON data from file
    const filePath = 'files/newPostData.json';
    const newPostPayload = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Define headers separately
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    };

    // Send POST request
    const response = await request.post(url, {
        data: newPostPayload,
        headers: headers
    });

    // Validate status code
    expect(response.status()).toBe(201);
    console.log(`Status Code: ${response.status()}`);

    // Parse JSON response
    const jsonData = await response.json();
    console.log('Created Post Response:', jsonData);

    // Validate response fields
    expect(jsonData.title).toBe(newPostPayload.title);
    expect(jsonData.body).toBe(newPostPayload.body);
    expect(jsonData.userId).toBe(newPostPayload.userId);
    expect(jsonData.id).toBeTruthy();
    
});