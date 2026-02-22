// tests/tagged.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Cart tests @e2e', () => {

  test('adds an item to cart',  { tag: '@smoke' }, async ({ page}) => {
    console.log("smoke test1")
  });

  test('test modify quantity of an item in cart',  { tag: ['@smoke', '@win'] },  () => {
    console.log("smoke test2")
  });

  test('@win adds an item to cart', () => {
    console.log("windows test")
  });

 test('@linux adds an item to cart', () => {
    console.log("linux test")
  });

 test('linux test',  { tag: ['@smoke', '@linux'] }, () => {
    console.log("linux, smoke")
  });

 test.skip('@smoke adds an item to cart', () => {
    console.log("windows test2")
  });


  test('@regression removes an item from cart', () => {
    console.log("Regression test")
  });
});

// # run only smoke tests
// npx playwright test --grep '@smoke'
// or
// npx playwright test -g '@smoke'

// # run everything except linux
// npx playwright test --grep-invert '@linux'

// # run everything except linux tests of current file
// npx playwright test 09_Grouping/01_group_run_tag.spec.js --grep-invert '@linux'

//# run either smoke or windows tests of current file
// npx playwright test 09_Grouping/01_group_run_tag.spec.js --grep '@smoke|@win'

// SPECIFIED TAGS run tests which are tagged with both smoke and windows tags of current file
// npx playwright test --grep '@smoke @win'  09_Grouping/01_group_run_tag.spec.js 

// EITHER to execute a test which is matching both the conditions (smoke and windows) tests of current file
// npx playwright test 09_Grouping/01_group_run_tag.spec.js --grep '@smoke' --grep '@win'


// OR to execute a test which is matching either of the conditions (smoke or windows) tests of current file
// npx playwright test --grep '@smoke|@win'  09_Grouping/01_group_run_tag.spec.js 

// OR to execute a test which is matching either of the conditions (smoke or e2e) tests of current file
// Run in terminal: npx playwright test --grep '@smoke|@e2e'  09_Grouping/01_group_run_tag.spec.js

