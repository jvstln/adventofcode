import { writeFile } from "fs";
import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

const grid = Array.from({ length: 1000 }, () => Array(1000).fill(0));
let litCount = 0;

const actions = {
  on: (row, index) => {
    if (row[index] == 0) litCount++;
    row[index] = 1;
  },
  off: (row, index) => {
    if (row[index] == 1) litCount--;
    row[index] = 0;
  },
  toggle: (row, index) => {
    litCount += row[index] == 0 ? 1 : -1;
    row[index] = row[index] == 0 ? 1 : 0;
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
