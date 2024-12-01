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

console.log(
  leftList.reduce((sum, a, i) => (sum += Math.abs(a - rightList[i])), 0)
);
