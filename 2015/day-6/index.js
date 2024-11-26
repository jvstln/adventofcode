import { writeFile } from "fs";
import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

const grid = Array.from({ length: 1000 }, () => Array(1000).fill(0));
let litCount = 0;

const actions = {
  on: (row, index) => {
    litCount++;
    row[index]++;
  },
  off: (row, index) => {
    if (row[index] == 0) return;
    litCount--;
    row[index]--;
  },
  toggle: (row, index) => {
    litCount += 2;
    row[index] += 2;
  },
};

const switchRange = (startCord, endCord, action) => {
  const [startX, startY] = startCord.split(",");
  const [endX, endY] = endCord.split(",");

  for (let y = Number(startY); y <= endY; y++) {
    const row = grid[y];

    for (let x = Number(startX); x <= endX; x++) {
      actions[action](row, x);
    }
  }
};

for (const command of input.split("\n")) {
  const [startCord, _, endCord] = command.split(" ").slice(-3);
  const action = command.includes("toggle")
    ? "toggle"
    : command.includes("off")
    ? "off"
    : "on";

  switchRange(startCord, endCord, action);
}

console.log(litCount);
