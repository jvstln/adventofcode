import { readFile } from "fs/promises";
const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

const leftList = [];
const rightList = [];

input.split("\n").forEach((line) => {
  const [left, right] = line.split(/\s+/);
  leftList.push(Number(left));
  rightList.push(Number(right));
});

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

// Part 1
console.log(
  leftList.reduce((sum, a, i) => (sum += Math.abs(a - rightList[i])), 0)
);

const similarityCache = {};
const similarityScore = leftList.reduce((sum, a) => {
  if (similarityCache[a] == undefined) {
    similarityCache[a] = rightList.filter((num) => num == a).length;
  }
  return sum + a * similarityCache[a];
}, 0);

// Part 2
console.log(similarityScore);
