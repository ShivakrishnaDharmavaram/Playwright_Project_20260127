import {test, expect} from '@playwright/test';

test(' Modify post using PUT method', async ({request}) => {
    const url = 'https://jsonplaceholder.typicode.com/posts/13';

    const updatePayload = {
        id: 13,
        title: "foo",
        body: "bar",
        userId: 2
    }

    //Define headers seperately
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    };



    const response = await request.put(url, { data: updatePayload, headers: headers }); // Send a GET request to the specified URL with query parameters and returns a promise of responseAPI.
    
    // Validate the response status code
    expect(response.status()).toBe(200);

    // Validate JSON body
    const jsonData = await response.json();
    console.log('Updated response JSON:', jsonData);
 
    expect(jsonData.id).toBe(updatePayload.id);
    expect(jsonData.userId).toBe(updatePayload.userId);
    expect(jsonData.title).toBe(updatePayload.title);
    expect(jsonData.body).toBe(updatePayload.body);
    expect(jsonData.title).toBeTruthy(); // Ensure title exists

    // Validate response text
    console.log('Response Text: ', await response.text());

});