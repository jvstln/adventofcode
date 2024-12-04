import { readFile } from "fs/promises";
const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

let validSum = 0;

input.match(/mul\(\d+,\d+\)/g).forEach((mulOperation) => {
  let num1 = mulOperation.slice(4, mulOperation.indexOf(","));
  let num2 = mulOperation.slice(mulOperation.indexOf(",") + 1, -1);

  validSum += num1 * num2;
});

console.log(validSum);
