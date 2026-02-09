import {test, expect} from '@playwright/test';
import * as fs from 'fs';

test.describe('Data Driven Testing - Create Post API', () => {

    //Read JSON array from file
    const filePath = 'files/postsData.json';
    const postsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    //Define header separately
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8'
    };

    //numbers = [1, 2, 3, 4, 5];
    //for (const num of numbers) {...}

    // const data = postsData[2]; // Example of accessing a specific entry

    // Iterate over each data set
    for(const postData of postsData) {
        test(`Create Post for userId ${postData.userId}`, async ({request}) => {
            
            const url = 'https://jsonplaceholder.typicode.com/posts';
            
            //1) Send POST request to create a post
            const response = await request.post(url, {
                data: postData,
                headers: headers
            });

            //2) Validate status code
            expect(response.status()).toBe(201);

            //Parse JSON response
            const jsonData = await response.json();
            console.log(`Response for userId ${postData.userId}:`, jsonData);
            
            //3) Validate response body contains sent data
            expect(jsonData.userId).toBe(postData.userId);
            expect(jsonData.title).toBe(postData.title);
            expect(jsonData.body).toBe(postData.body);
            expect(typeof jsonData.id).toBe('number'); // Validate that an id is returned and is a number
        });
    }

});

