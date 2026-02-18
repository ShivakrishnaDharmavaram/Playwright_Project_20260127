// Consider Array of numbers and find factorial of each number in the array by using simple for loop and print the result in console
function factorial(number) {
	let result = 1;
	for (let i = 1; i <= number; i += 1) {
		result *= i;
	}
	return result;
}

const numbersArray = [0, 1, 5, 10];
for (let num of numbersArray) {
	console.log(`Factorial of ${num} is ${factorial(num)}`);
}