import { test, expect } from '@playwright/test';
// import { listFrameNames } from '../../utils/frameUtils';

test('Frames example', async ({ page }) => {

    const url = "https://demoqa.com/";
    await page.goto(url);

    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle(/demosite/i);

    //identify Alerts, Frame & Windows card and click on it
    await page.locator('.card-body').filter({ hasText: 'Alerts, Frame & Windows' }).click();
    await page.waitForTimeout(3000);

    //Identify Frames card and click on it
    await page.locator('.element-list').filter({ hasText: 'Frames' }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle(/demosite/i);
    // ---------------------------------------
    const frame = page.frame('frame1'); // frame name from HTML (note: name property added at runtime)
    if (frame) {
        const headingText = await frame.locator('#sampleHeading').textContent();
        console.log('Text inside frame:', headingText);
    } else {
        console.log('Frame not found in first test');
    }

    
    //   // Access frame by name or selector
    // //    page.frame({ name: 'frameName' })  for frame in page	// page.frame() → Works with name
    
    
// // Use the utility function (for understanding: freame names)
//     const names = await listFrameNames(page, 'demoqa.com'); // Only frames from demoqa.com
//     console.log('Frames found:', names);

// // Access frame by name or url (one method: page.frame)  or selector (two methods: locator vs frameLocator)

    // // way 1: Access frame by name (working)
    // const frame = page.frame({ name: 'frame1' }); // frame name from HTML (note: name property added at runtime)
    // // const frame = page.frame('frame1'); // frame name from HTML (note: name property added at runtime)
    // // const frame = page.frame('#frame1'); // frame name from HTML (can't use CSS selector here)
    // if (frame) {
    //     const headingText = await frame.locator('#sampleHeading').textContent();
    //     console.log('Text inside frame:', headingText);
    // }
        // Note:
      //   // Cannot use CSS selectors like #frame1.
      //  // Not chainable for nested frames.

    //   // Access frame by URL (working)
    // const frame = page.frame({ url: "https://demoqa.com/sample" }); 
    // if (frame) {
    //     const headingText = await frame.locator('#sampleHeading').textContent();
    //     console.log('Text inside frame:', headingText);
    // }

    // // way 2: access frame by locator (working)
    // const frame1 = page.locator("#frame1").contentFrame();    // can I use page.frameLocator("#frame1")
    // const headingText = await frame1.locator('#sampleHeading').textContent();
    // console.log("frame contents: ", headingText);

    // way 3: access frame by frameLocator (working)
    // const frame1 = page.frameLocator("#frame1");  
    // const headingText = await frame1.locator('#sampleHeading').textContent();
    // console.log("frame contents: ", headingText);
    // // Returns a FrameLocator object, which is chainable.
    // // Works with CSS selectors (id, class, etc.).

    // Switch back to parent page (no separate action is needed unlike selenium)

    const parentTitle = await page.title();
    console.log('Parent Page Title:', parentTitle);

// ---------------------------------------
    await page.waitForTimeout(3000);    
    await page.close();
});


test('Nested Frames example', async ({ page }) => {
    const url = "https://demoqa.com/";
    await page.goto(url);

    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle(/demosite/i);

    //identify Alerts, Frame & Windows card and click on it
    await page.locator('.card-body').filter({ hasText: 'Alerts, Frame & Windows' }).click();
    await page.waitForTimeout(3000);

    //Identify Frames card and click on it
    await page.locator('.element-list').filter({ hasText: 'Frames' }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle(/demosite/i);
    // ---------------------------------------
    
    // Wait longer for frames to load
    await page.waitForTimeout(5000);
    
    // Access parent frame
    const parentFrame = page.frameLocator('#frame1');
    try {
        const parentText = await parentFrame.locator('body').textContent({ timeout: 5000 });
        console.log('Parent Frame Text:', parentText);
    } catch (e) {
        console.log('Could not access parent frame:', e.message);
    }

    // Access child frame inside parent
    try {
        const childFrame = parentFrame.frameLocator('iframe');
        const childText = await childFrame.locator('body').textContent({ timeout: 5000 });
        console.log('Child Frame Text:', childText);
    } catch (e) {
        console.log('Could not access child frame:', e.message);
    }

   // ---------------------------------------
    await page.waitForTimeout(3000);    
    await page.close();
});

// How to run this test in headed mode?
// Command: npx playwright test tests/07_alert_frame_window/02_frames.spec.js --headed
//How to decide between page.frame() vs frameLocator()?
// Explanation - additional information

// ✅ page.frame()

// Returns a Frame object immediately.
// Works only if you know:
  // The frame name (name attribute in <iframe>).
  // Or match by URL.

// This is useful when you need to:
  // Access frame properties (frame.url(), frame.name()).
  // Perform multiple actions inside the same frame object.


// Limitation:
  // Cannot use CSS selectors like #frame1.
  // Not chainable for nested frames.

// -----------------------

// ✅ frameLocator()

// Returns a FrameLocator object, which is chainable.
// Works with CSS selectors (id, class, etc.).
// Ideal for nested frames.

// Advantage:
  // No need for name attribute.
  // Handles dynamic frames better.

// Limitation:
  // You cannot get frame metadata (like URL or name) from frameLocator().
  // It’s designed for locating elements inside frames, not for frame-level operations.

// -----------------------------------------------

// ✅ Quick Rule
// If your goal is just to interact with elements inside the frame → frameLocator() is enough.
// If you need frame details or dynamic logic → use page.frame() or contentFrame().
