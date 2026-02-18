const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

//Load test data from Excel file
const workbook = new ExcelJS.Workbook();
const filePath = path.join(__dirname, 'files', 'postsData.xlsx');
workbook.xlsx.readFile(filePath).then(() => { const worksheet = workbook.getWorksheet(1);
    const postsData = [];
    worksheet.eachRow(
        { includeEmpty: false }, (row, rowNumber) => { if (rowNumber > 1) 
            { 
                // Skip header row 
                const postData = { userId: row.getCell(1).value, title: row.getCell(2).value, body: row.getCell(3).value }; 
                postsData.push(postData); 
            } 
        }
    ); 
    console.log('Posts Data:', postsData); 
}) .catch(err => { console.error('Error reading Excel file:', err); });
    
// Get the first sheet const postsData = []; // Iterate through each row in the worksheet and push data to postsData array worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => { if (rowNumber > 1) { // Skip header row const postData = { userId: row.getCell(1).value, title: row.getCell(2).value, body: row.getCell(3).value }; postsData.push(postData); } }); console.log('Posts Data:', postsData); }) .catch(err => { console.error('Error reading Excel file:', err); });
// const workbook = XLSX.readFile('files/postsData.xlsx');


// //Select a workbook sheet
// const sheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetName];

// //Convert the sheet data to JSON format
// const postsData = XLSX.utils.sheet_to_json(worksheet);

// console.log('Posts Data:', postsData);