import { readFile } from "fs/promises";
const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

let validSum = 0;
let pauseOperation = false;

input.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g).forEach((operation) => {
  if (operation == "don't()") return (pauseOperation = true);
  if (operation == "do()") return (pauseOperation = false);

  let num1 = operation.slice(4, operation.indexOf(","));
  let num2 = operation.slice(operation.indexOf(",") + 1, -1);

  if (!pauseOperation) validSum += num1 * num2;
});

console.log(validSum);
