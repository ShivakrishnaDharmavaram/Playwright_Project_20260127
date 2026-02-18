const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');
const path = require('path');
//read excel file using exceljs package, install using npm install exceljs

/**
 * Utility function to read Excel data
 */
async function readExcelData() {
  const workbook = new ExcelJS.Workbook();
  const filePath = 'files/postsData.xlsx';
//   const filePath = path.join(__dirname, '..', '..', 'files', 'postsData.xlsx');

  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1);
  const postsData = [];

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    postsData.push({
      userId: row.getCell(1).value,
      title: row.getCell(2).value,
      body: row.getCell(3).value,
    });
  });

  return postsData;
}

test('Create posts using data from Excel', async ({ request }) => {
  const postsData = await readExcelData();

  for (const post of postsData) {
    const response = await request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        data: post,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log('Response:', responseBody);

    // Basic validation
    expect(responseBody.title).toBe(post.title);
    expect(responseBody.body).toBe(post.body);
    expect(responseBody.userId).toBe(post.userId);
  }
});
