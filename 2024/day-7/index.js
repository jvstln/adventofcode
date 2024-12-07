import { readFile } from "fs/promises";
let input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

const operations = ["+", "*", "||"];
const opFunc = {
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
  "||": (a, b) => Number(String(a) + String(b)),
};

function generateCombinations(numbers) {
  if (numbers.length <= 1) {
    return numbers;
  }

  return operations
    .map((op) => {
      const newNumbers = [...numbers];
      const calculated = opFunc[op](newNumbers.shift(), newNumbers.shift());
      return generateCombinations([calculated, ...newNumbers]);
    })
    .flat();
}

let total = 0;
for (const line of input.trim().split("\n")) {
  const [result, ...numbers] = line
    .trim()
    .split(/: | /)
    .map((num) => Number(num));

  const combinations = generateCombinations(numbers);

  if (combinations.some((combination) => combination == result)) {
    total += result;
  }
}

console.log(total); // Part 2. nb: It takes some time
// Check the previous commit for part 1
