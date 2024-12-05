import { readFile } from "fs/promises";
const input = JSON.parse(
  await readFile(`${import.meta.dirname}/input.txt`, "utf8")
);

let sum = 0;

function transverseAndSum(data) {
  if (Array.isArray(data)) {
    return data.forEach((item) => transverseAndSum(item));
  }

  if (typeof data == "object") {
    const values = Object.values(data);
    if (values.includes("red")) return;
    return values.forEach((item) => transverseAndSum(item));
  }

  if (isFinite(data)) sum += data;
}

transverseAndSum(input);
console.log(sum); // Part 2
// Checkout the previous commit for part 1
