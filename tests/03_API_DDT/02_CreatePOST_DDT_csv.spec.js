import {test, expect} from '@playwright/test';
import * as fs from 'fs';
//install csv-parse package using npm install csv-parse
import {parse} from 'csv-parse/sync';

// // Utility function to read and parse CSV file
// function readCSVFile(filePath) {
//     const fileContent = fs.readFileSync(filePath, 'utf-8');
//     return parse(fileContent, {
//         columns: true, // Use first row as column names
//         skip_empty_lines: true
//     });
// }

test.describe('Data Driven Testing - Create Post API using CSV data', () => {

    //Read CSV file and parse into objects
    const filePath = 'files/postsData.csv';
    const csvContent = fs.readFileSync(filePath, 'utf-8');

    const records = parse(csvContent, {
        columns: true, // Use first row as column names
        skip_empty_lines: true
    });



    //Define header separately
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8'
    };

    // Iterate over each data set
    for(const record of records) {
        test(`Create Post for userId ${record.userId}`, async ({request}) => {
            
            const url = 'https://jsonplaceholder.typicode.com/posts';
            
            //1) Send POST request to create a post
            const response = await request.post(url, {
                data: record,
                headers: headers
            });

            //2) Validate status code
            expect(response.status()).toBe(201);

            //Parse JSON response
            const jsonData = await response.json();
            console.log(`Response for userId ${record.userId}:`, jsonData);
            
            //3) Validate response fields
            expect(jsonData.userId).toBe(record.userId);
            expect(jsonData.title).toBe(record.title);
            expect(jsonData.body).toBe(record.body);
            expect(typeof jsonData.id).toBe('number'); // Validate id type is number
        });
    }

});

