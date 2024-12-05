import { readFile } from "fs/promises";
const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

// const input = `
// 47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47
// `;

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
  }
});

console.log(validSum);
