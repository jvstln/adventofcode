import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

let niceCount = 0;

for (const string of input.split("\n")) {
  const containTwoDupes = /(.{2}).*\1/.test(string);
  const containMiddleDupes = /(.).\1/.test(string);

  if (containTwoDupes && containMiddleDupes) {
    niceCount++;
  }
}

console.log(niceCount);
