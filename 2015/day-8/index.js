import { readFile } from "fs/promises";
const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

let stringCodeSize = 0;
let inMemorySize = 0;
let reEncodedStringCodeCount = 0;

for (const string of input.split("\n")) {
  let decodedString = string
    .replace(/^"|"$/g, "")
    .replace(/\\("|\\|x[\da-f]{2})/g, (_, char) => char[0]);

  let reEncodedString = `"${string.replace(/(\\|")/g, "\\$1")}"`;

  stringCodeSize += string.length;
  inMemorySize += decodedString.length;
  reEncodedStringCodeCount += reEncodedString.length;
}

console.log(stringCodeSize - inMemorySize); // part 1
console.log(reEncodedStringCodeCount - stringCodeSize); // part 2
