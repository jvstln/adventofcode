import { readFile } from "fs/promises";
const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

let stringCodeSize = 0;
let inMemorySize = 0;

for (const string of input.split("\n")) {
  let transformedString = string
    .replace(/^"|"$/g, "")
    .replace(/\\("|\\|x[\da-f]{2})/g, (_, char) => char[0]);

  stringCodeSize += string.length;
  inMemorySize += transformedString.length;
}

console.log(stringCodeSize - inMemorySize);
