import { test, expect } from '@playwright/test';
import path from 'path';

test('File Upload Test', async ({ page }) => {
    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#9-file-upload";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    //Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    //Define filename variable for flexibility
    const fileName = 'SampleTextFile.txt'; // Ensure this file exists in the project root or provide correct path
    const filePath = path.resolve('files', fileName); 

    // Locate file input and message div
    const fileInput = page.locator('#fileUploadField');
    const messageDiv = page.locator('#fileUploadMsg');

    // Upload file using setInputFiles()
    await fileInput.setInputFiles(filePath);
    console.log(`Uploaded file: ${fileName}`);

    await page.waitForTimeout(2000); // demo purpose

    // Validate message after upload
    const messageText = await messageDiv.textContent();
    console.log('Message displayed:', messageText.trim());
    expect(messageText.trim()).toContain(`File Selected: ${fileName}`);

    await page.close();
});

//to run this in headed mode use below command
// npx playwright test tests/05_elements/06_file_upload.spec.js --headed