import { readFile } from "fs/promises";
const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

// Parse input
let [rules, updates] = input.split("\n\n").map((x) => x.trim().split("\n"));

// Create before lookup table/object
let lookup = {};
rules.forEach((rule) => {
  let [before, after] = rule.split("|");
  if (!lookup[before]) lookup[before] = [];
  lookup[before].push(after);
});

// Solve the readme.md problem
let validSum = 0;
let invalidSum = 0;
updates.forEach((update) => {
  update = update.split(",");

  const isUpdateValid = update.every((page, index, arr) => {
    const beforePages = arr.slice(0, index);
    return beforePages.every(
      (beforePage) => !lookup[page]?.includes(beforePage)
    );
  });

  if (isUpdateValid) {
    validSum += Number(update[(update.length - 1) / 2]);
  } else {
    let orderedUpdate = orderUpdate(update);
    invalidSum += Number(orderedUpdate[(orderedUpdate.length - 1) / 2]);
  }
});

function orderUpdate(update) {
  return update.toSorted((a, b) =>
    (lookup[a] ?? []).includes(b.toString()) ? -1 : 1
  );
}

console.log(validSum); // Part 1
console.log(invalidSum); // Part 2
