// const readline = require('readline');

// function factorial(number) {
// 	if (!Number.isInteger(number) || number < 0) {
// 		throw new Error('Please enter a non-negative integer.');
// 	}

// 	let result = 1;
// 	for (let index = 2; index <= number; index += 1) {
// 		result *= index;
// 	}

// 	return result;
// }

// function askUserForNumber() {
// 	return new Promise((resolve) => {
// 		const rl = readline.createInterface({
// 			input: process.stdin,
// 			output: process.stdout,
// 		});

// 		rl.question('Enter a non-negative integer: ', (input) => {
// 			rl.close();
// 			resolve(input);
// 		});
// 	});
// }

// async function run() {
// 	try {
// 		const userInput = await askUserForNumber();
// 		const number = Number(userInput.trim());

// 		if (!Number.isInteger(number)) {
// 			console.log('Invalid input. Please enter a whole number only.');
// 			return;
// 		}

// 		const output = factorial(number);
// 		console.log(`Factorial of ${number} is ${output}`);
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// }

// run();

// module.exports = { factorial };


function factorial(number) {
	let result = 1;

	for (let i = 1; i <= number; i += 1) {
		result *= i;
	}

	return result;
}

// const number = 5;
// console.log(`Factorial of ${number} is ${factorial(number)}`);
// console.log(`Factorial of 0 is ${factorial(0)}`); // Factorial of 0 is defined as 1
// console.log(`Factorial of 1 is ${factorial(1)}`); // Factorial of 1 is also defined as 1
// console.log(`Factorial of 10 is ${factorial(10)}`); // Factorial of 10 is 3628800

// Consider Array of numbers and find factorial of each number in the array by using simple for loop and print the result in console
const numbersArray = [0, 1, 2, 3, 4, 5, 10];
for (let i = 0; i < numbersArray.length; i += 1) {
    const num = numbersArray[i];
    console.log(`Factorial of ${num} is ${factorial(num)}`);
}
