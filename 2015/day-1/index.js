import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

let floor = 0;
for (const char of input) {
  floor += char == "(" ? 1 : -1;
}

console.log(floor);
