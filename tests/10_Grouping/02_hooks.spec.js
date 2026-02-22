import { test, expect } from '@playwright/test';

// All tests in this file run serially
test.describe.configure({ mode: 'serial' });
test.describe("Purchase prod check order @e2e", () => {

//     // executes before each test
//   test.beforeEach(async () => {
//     console.log("login");
//   });

//   executes once per worder process before all tests
  test.beforeAll(async () => {
    console.log("login");
  });

  test('TC01 - Purchase Product', async () => {
    console.log("Purchase product after successful login")
  });

  test('TC02 - Check Order', async () => {
    console.log("Check Order after successful login")
  });

  
});


// # run the tests in this file
// npx playwright test 09_Grouping/02_hooks.spec.js
// # run the tests in this file with serial execution
// npx playwright test -g '@e2e' 09_Grouping/02_hooks.spec.js
// npx playwright test -g '@e2e' 09_Grouping/02 --------------Same as above.
