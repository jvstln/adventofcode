import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

let floor = 0;
let hasReachedBasement = false;
let firstBasementPosition = 0;
for (const char of input) {
  floor += char == "(" ? 1 : -1;
  if (hasReachedBasement) {
    continue;
  } else {
    firstBasementPosition++;
  }

  if (floor == -1) hasReachedBasement = true;
}

console.log(floor);
console.log(firstBasementPosition);
