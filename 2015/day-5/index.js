import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

let niceCount = 0;

for (const string of input.split("\n")) {
  const containsVowels = /([aeiou].*){3,}/g.test(string);
  const containDupes = /(.)\1/.test(string);
  const containExceptions = ["ab", "cd", "pq", "xy"].some((exception) =>
    string.includes(exception)
  );

  if (containsVowels && containDupes && !containExceptions) {
    niceCount++;
  }
}

console.log(niceCount);
